import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"
import { ReactElement, useMemo, useState } from "react"
import { RawIntlProvider, createIntl } from "react-intl"
import { useParams } from "react-router-dom"

import { getOrganizationById } from "../../../../api/organizations/[id]"
import { getOrganizationRnsrRor } from "../../../../api/organizations/[id]/rnsr-ror"
import Gauge from "../../../../components/gauge/index.tsx"
import PageSkeleton from "../../../../components/skeleton/page-skeleton"
import getLangFieldValue from "../../../../utils/lang"
import DataTable from "./datatable.tsx"

type Column = {
  getCellValue?: (object) => ReactElement,
  getClassName?: (object) => string,
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
} | Record<string, never>

const modules = import.meta.glob("../locales/*.json", {
  eager: true,
  import: "default",
})

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {})

export default function RnsrRor() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams()

  const [filters, setFilters] = useState<Filter[]>([])
  const [pagination, setPagination] = useState({ from: 0, size: 10 })
  const [sorting, setSorting] = useState<Sort>({})

  const { data, isLoading } = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  })

  const { data: dataRnsrRor, isLoading: isLoadingRnsrRor } = useQuery({
    queryKey: ["organizations", "rnsr-ror", filters, id, pagination, sorting],
    queryFn: () => getOrganizationRnsrRor(filters, id, pagination, sorting),
    throwOnError: true,
  })

  const { data: dataRnsrRorAll, isLoading: isLoadingRnsrRorAll } = useQuery({
    queryKey: ["organizations", "rnsr-ror-all", id],
    queryFn: () => getOrganizationRnsrRor([], id, { from: 0, size: 2000 }, {}),
    throwOnError: true,
  })

  const meanWithIdref: number = Math.round(dataRnsrRorAll?.filter((item) => item?.idref && item.idref)?.length / dataRnsrRorAll?.length * 100)
  const meanWithRor: number = Math.round(dataRnsrRorAll?.filter((item) => item?.ror && item.ror)?.length / dataRnsrRorAll?.length * 100)
  const matchCity: number = Math.round(dataRnsrRorAll?.filter((item) => item?.rnsr_ror_city_match && item.rnsr_ror_city_match)?.length / dataRnsrRorAll?.length * 100)
  // const matchCreationYear: number = Math.round(dataRnsrRorAll?.filter((item) => item?.rnsr_ror_creation_match && item.rnsr_ror_creation_match)?.length / dataRnsrRorAll?.length * 100)
  const matchLabel: number = Math.round(dataRnsrRorAll?.filter((item) => item?.rnsr_ror_label_match && item.rnsr_ror_label_match)?.length / dataRnsrRorAll?.length * 100)
  const rnsrLevels = {}
  dataRnsrRorAll?.forEach((item) => {
    if (!Object.keys(rnsrLevels).includes(item?.rnsr_level)) rnsrLevels[item?.rnsr_level] = 0
    rnsrLevels[item.rnsr_level] += 1
  })
  const numberOfResults = dataRnsrRorAll?.length ?? 0

  const breadcrumbLabel = getLangFieldValue(locale)(data?.label)

  const columns = useMemo<Column[]>(() => [
    {
      id: 'rnsr_ror_label_match',
      getCellValue: (row) => row.rnsr_ror_label_match === undefined ? '' : (row.rnsr_ror_label_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
      label: 'Match Nom'
    },
    {
      id: 'rnsr_ror_city_match',
      getCellValue: (row) => row.rnsr_ror_city_match === undefined ? '' : (row.rnsr_ror_city_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
      label: 'Match Ville'
    },
    // {
    //   id: 'rnsr_ror_creation_match',
    //   getCellValue: (row) => row.rnsr_ror_creation_match === undefined ? '' : (row.rnsr_ror_creation_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
    //   label: 'Match Année de création'
    // },
    {
      id: 'rnsr',
      getCellValue: (row) => row?.rnsr ? <a href={`https://rnsr.adc.education.fr/structure/${row.rnsr}`} target="_blank">{row.rnsr}</a> : '',
      label: 'RNSR'
    },
    {
      id: 'idref',
      getCellValue: (row) => row?.idref ? <a href={`https://www.idref.fr/${row.idref}`} target="_blank">{row.idref}</a> : '',
      label: 'Idref',
    },
    {
      id: 'ror',
      getCellValue: (row) => row?.ror ? <a href={`https://ror.org/${row.ror}`} target="_blank">{row.ror}</a> : '',
      label: 'ROR'
    },
    {
      id: 'rnsr_level',
      label: 'RNSR Niveau'
    },
    {
      id: 'rnsr_label',
      label: 'RNSR Nom',
    },
    {
      id: 'rnsr_city',
      label: 'RNSR Ville',
    },
    {
      id: 'rnsr_acronym',
      getCellValue: (row) => row?.ror ? row.rnsr_acronym : <a href={`https://ror.org/search?query=${row.rnsr_acronym}`} target="_blank">{row.rnsr_acronym}</a>,
      label: 'RNSR Acronyme'
    },
    {
      id: 'ror_label',
      getClassName: (row) => row.rnsr_ror_label_match === false ? 'bg-error' : '',
      label: 'ROR Nom',
    },
    {
      id: 'ror_city',
      getClassName: (row) => row.rnsr_ror_city_match === false ? 'bg-error' : '',
      label: 'ROR Ville'
    }
  ], [])

  const downloadCsv = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dataRnsrRorAll.length > 0) {
      // Extract keys from the first object to use as headers
      const headers = Object.keys(dataRnsrRorAll[0])
      const rows = dataRnsrRorAll.map((row) => headers.map((header) => row?.[header] ? `"${row[header]}"` : ""))
      // Combine headers and rows into a single CSV string
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n')
      // Create a hidden download link
      const link = document.createElement('a')
      link.download = `scan_rnsr_ror_${id}.csv`
      link.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8' }))
      link.style.visibility = 'hidden'
      // Append link to DOM, trigger click, and clean up
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

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
        {(isLoading || isLoadingRnsrRor || isLoadingRnsrRorAll) && <PageSkeleton />}
        {dataRnsrRorAll && (
          <>
            <Row gutters>
              <Col>
                <Gauge label="Taux de présence d'Idref" percent={meanWithIdref} />
              </Col>
              <Col>
                <Gauge label="Taux de présence de ROR" percent={meanWithRor} />
              </Col>
            </Row>
            <Row gutters>
              <Col>
                <Gauge label="Accord RNSR-ROR Nom" percent={matchLabel} />
              </Col>
              <Col>
                <Gauge label="Accord RNSR-ROR Ville" percent={matchCity} />
              </Col>
              {/* <Col>
              <Gauge label="Accord RNSR-ROR Année de création" percent={matchCreationYear} />
            </Col> */}
            </Row>
            <Row>
              <Col>
                {numberOfResults} structure(s) dont
                <ul>
                  {Object.keys(rnsrLevels).map((key) => <li key={`${id}-rnsr-level-${key}`}>
                    {key} : {rnsrLevels[key]}
                  </li>)}
                </ul>
              </Col>
            </Row>
            <Row className="fr-grid-row--middle fr-mb-3w">
              <Col>
                <Title as="h2" look="h4">Données détaillées</Title>
                <Text className="fr-text--sm fr-mb-0" style={{ color: "var(--text-mention-grey)" }}>
                  Liste des structures de {breadcrumbLabel}
                </Text>
              </Col>
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  icon="download-line"
                  iconPosition="left"
                  onClick={(e) => downloadCsv(e)}
                  size="sm"
                  variant="secondary"
                >
                  Télécharger en CSV
                </Button>
              </Col>
            </Row>
            <DataTable
              aggregations={{}}
              columns={columns}
              dataTable={dataRnsrRor}
              filters={filters}
              numberOfResults={numberOfResults}
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
  )
}