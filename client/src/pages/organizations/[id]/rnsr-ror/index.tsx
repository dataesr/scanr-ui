import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { RawIntlProvider, createIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { getOrganizationRnsrRor } from "../../../../api/organizations/[id]/rnsr-ror";
import PageSkeleton from "../../../../components/skeleton/page-skeleton";
import getLangFieldValue from "../../../../utils/lang";
import DataTable from "./datatable.tsx";

type Column = {
  id: string,
  isFilterable?: boolean, // Is the column filterable, by default a simple tetx input is displayed. False if omitted
  isFilterableBySelect?: boolean, // If true and if an aggregation named like the colummn id exists, display a select, feeded by the aggregations buckets
  isSortable?: boolean, // Is the column sortable. False if omitted
  label?: string, // Column label as header. If omitted, the column id is displayed instead
  sortableField?: string, // Is the column sortable
}

type Filter = {
  id: string
  value: string
}

type Sort = {
  id: string
  order: 'asc' | 'desc'
}

const modules = import.meta.glob("../locales/*.json", {
  eager: true,
  import: "default",
});

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function RnsrRor() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { id } = useParams();

  const [filters, setFilters] = useState<Filter[]>([])
  const [pagination, setPagination] = useState({ from: 0, size: 10 })
  const [sorting, setSorting] = useState<Sort>({ id: 'project_budgetFinanced', order: 'desc' })

  const { data, isLoading } = useQuery({
    queryKey: ["organizations", "rnsr-ror", id],
    queryFn: () => getOrganizationRnsrRor(id),
    throwOnError: true,
  });

  const meanWithIdref = Math.round(data?.filter((item) => item?.idref)?.length / data?.length * 100)
  const meanWithRnsr = Math.round(data?.filter((item) => item?.rnsr)?.length / data?.length * 100)
  const meanWithRor = Math.round(data?.filter((item) => item?.ror)?.length / data?.length * 100)
  const accordCity = Math.round(data?.filter((item) => item?.rnsr_ror_city_match)?.length / data?.length * 100)
  const accordCreationYear = Math.round(data?.filter((item) => item?.rnsr_ror_creation_match)?.length / data?.length * 100)
  const accordLabel = Math.round(data?.filter((item) => item?.rnsr_ror_label_match)?.length / data?.length * 100)

  const breadcrumbLabel = getLangFieldValue(locale)(id)

  const columns = useMemo<Column[]>(() => [
    {
      id: 'rnsr',
      label: 'RNSR'
    },
    {
      id: 'idref',
      label: 'Idref'
    },
    {
      id: 'ror',
      label: 'ROR'
    },
    {
      id: 'rnsr_level',
      label: 'RNSR Level'
    },
    {
      id: 'rnsr_label',
      // isFilterable: true,
      // isFilterableBySelect: true,
      // isSortable: true,
      label: 'RNSR Label',
      // sortableField: 'project_year',
    },
    {
      id: 'rnsr_city',
      // isFilterable: true,
      // isFilterableBySelect: true,
      // isSortable: true,
      label: 'RNSR City',
      // sortableField: 'project_year',
    },
    {
      id: 'ror_label',
      // isFilterable: true,
      // isFilterableBySelect: true,
      // isSortable: true,
      label: 'ROR Label',
      // sortableField: 'project_year',
    },
    {
      id: 'ror_city',
      label: 'ROR City'
    }
  ], [])

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "organizations.breadcrumb.home" })}
          </Link>
          <Link href="/search/organizations">
            {intl.formatMessage({ id: "organizations.breadcrumb.search" })}
          </Link>
          <Link>{breadcrumbLabel}</Link>
        </Breadcrumb>
        {isLoading && <PageSkeleton />}
        {data && (
          <>
          <Row>
            <Col>
              Taux de présence d'Idref: {meanWithIdref} %
            </Col>
            <Col>
              Taux de présence de RNSR: {meanWithRnsr} %
            </Col>
            <Col>
              Taux de présence de ROR: {meanWithRor} %
            </Col>
          </Row>
          <Row>
            <Col>
              Accord RNSR-ROR Label: {accordLabel} %
            </Col>
            <Col>
              Accord RNSR-ROR City: {accordCity} %
            </Col>
            <Col>
              Accord RNSR-ROR Creation year: {accordCreationYear} %
            </Col>
          </Row>
          <DataTable
            aggregations={{}}
            columns={columns}
            dataTable={data}
            filters={filters}
            numberOfResults={data?.length ?? 0}
            pagination={pagination}
            setFilters={setFilters}
            setPagination={setPagination}
            setSorting={setSorting}
            sorting={sorting}
          />
          </>
        )}
      </Container>
    </RawIntlProvider>
  );
}