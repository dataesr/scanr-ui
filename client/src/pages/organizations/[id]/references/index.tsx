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
import { ReactElement, useEffect, useMemo, useState } from "react"
import { RawIntlProvider, createIntl } from "react-intl"
import { useParams } from "react-router-dom"

import { getOrganizationById } from "../../../../api/organizations/[id]/index.ts"
import { getOrganizationReferences } from "../../../../api/organizations/[id]/references.ts"
import Gauge from "../../../../components/gauge/index.tsx"
import PageSkeleton from "../../../../components/skeleton/page-skeleton"
import getLangFieldValue from "../../../../utils/lang.ts"
import DataTable from "./datatable.tsx"
import RorModal from "./components/ror-modal"

type Column = {
  getCellValue?: (object) => ReactElement,
  getClassName?: (object) => string,
  groups?: Column[],
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
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  return locale ? { ...acc, [locale]: modules[key] } : acc
}, {})

export default function References() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams()

  const [acronym, setAcronym] = useState<string>()
  const [filters, setFilters] = useState<Filter[]>([])
  const [matchCity, setMatchCity] = useState<number>(0)
  // const [matchCreationYear, setMatchCreationYear] = useState<number>(0)
  const [matchLabel, setMatchLabel] = useState<number>(0)
  const [meanWithIdref, setMeanWithIdref] = useState<number>(0)
  const [meanWithRor, setMeanWithRor] = useState<number>(0)
  const [numberOfResults, setNumberOfResults] = useState<number>(0)
  const [pagination, setPagination] = useState({ from: 0, size: 100 })
  const [showRorModal, setShowRorModal] = useState(false);
  const [sorting, setSorting] = useState<Sort>({})

  const { data, isLoading } = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  })

  const { data: dataReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["organizations", "references", filters, id, pagination, sorting],
    queryFn: () => getOrganizationReferences(filters, id, pagination, sorting),
    throwOnError: true,
  })

  const { data: dataReferencesAll, isLoading: isLoadingReferencesAll } = useQuery({
    queryKey: ["organizations", "references-all", filters, id],
    queryFn: () => getOrganizationReferences(filters, id, { from: 0, size: 2000 }, {}),
    throwOnError: true,
  })

  useEffect(() => {
    setNumberOfResults(dataReferencesAll?.results?.length ?? 0)
    setMeanWithIdref(Math.round(dataReferencesAll?.results?.filter((item) => item?.idref && item.idref)?.length / numberOfResults * 100))
    setMeanWithRor(Math.round(dataReferencesAll?.results?.filter((item) => item?.ror && item.ror)?.length / numberOfResults * 100))
    setMatchCity(Math.round(dataReferencesAll?.results?.filter((item) => item?.rnsr_ror_city_match && item.rnsr_ror_city_match)?.length / numberOfResults * 100))
    // setMatchCreationYear(Math.round(dataReferencesAll?.results?.filter((item) => item?.rnsr_ror_creation_match && item.rnsr_ror_creation_match)?.length / numberOfResults * 100))
    setMatchLabel(Math.round(dataReferencesAll?.results?.filter((item) => item?.rnsr_ror_label_match && item.rnsr_ror_label_match)?.length / numberOfResults * 100))
  }, [dataReferencesAll?.results, numberOfResults])
  const breadcrumbLabel = getLangFieldValue(locale)(data?.label)

  const columns = useMemo<Column[]>(() => [
    // {
    //   id: 'rnsr_ror_label_match',
    //   getCellValue: (row) => row.rnsr_ror_label_match === undefined ? '' : (row.rnsr_ror_label_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
    //   label: 'Match Nom',
    // },
    // {
    //   id: 'rnsr_ror_city_match',
    //   getCellValue: (row) => row.rnsr_ror_city_match === undefined ? '' : (row.rnsr_ror_city_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
    //   label: 'Match Ville',
    // },
    // {
    //   id: 'rnsr_ror_creation_match',
    //   getCellValue: (row) => row.rnsr_ror_creation_match === undefined ? '' : (row.rnsr_ror_creation_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
    //   label: 'Match Année de création',
    // },
    {
      id: 'identifiers',
      label: 'Identifiants',
      groups: [
        {
          id: 'rnsr',
          getCellValue: (row) => row?.rnsr ? <a href={`https://rnsr.adc.education.fr/structure/${row.rnsr}`} target="_blank">{row.rnsr}</a> : <></>,
          label: 'RNSR',
        },
        {
          id: 'idref',
          getCellValue: (row) => row?.idref ? <a href={`https://www.idref.fr/${row.idref}`} target="_blank">{row.idref}</a> : <></>,
          label: 'IdRef',
        },
        {
          id: 'ror',
          getCellValue: (row) => row?.ror ? <a href={`https://ror.org/${row.ror}`} target="_blank">{row.ror}</a> : (row?.rnsr_acronym ? <i onClick={() => { setAcronym(row.rnsr_acronym); setShowRorModal(true); }}>Trouver mon ROR</i> : <></>),
          getClassName: (row) => (row?.ror || !row?.rnsr_acronym) ? '' : 'bg-error',
          label: 'ROR',
        },
      ],
    },
    {
      id: 'rnsr',
      label: 'RNSR',
      groups: [
        {
          id: 'rnsr_level',
          isFilterable: true,
          isFilterableBySelect: true,
          label: 'Niveau',
        },
        {
          id: 'rnsr_label',
          isSortable: true,
          label: 'Label',
          sortableField: 'label.fr.keyword',
        },
        {
          id: 'rnsr_city',
          // isSortable: true,
          label: 'Ville',
          // sortableField: 'address.city.keyword',
        },
        {
          id: 'rnsr_acronym',
          getCellValue: (row) => row?.rnsr_acronym ? row.rnsr_acronym : '',
          isSortable: true,
          label: 'Acronyme',
          sortableField: 'acronym.fr.keyword',
        },
      ],
    },
    {
      id: 'ror',
      label: 'ROR',
      groups: [
        {
          id: 'rnsr_ror_match',
          getCellValue: (row) => (row.rnsr_ror_label_match === undefined || row.rnsr_ror_city_match === undefined) ? <></> : (row.rnsr_ror_label_match && row.rnsr_ror_city_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
          label: 'Match RNSR',
        },
        {
          id: 'ror_label',
          getClassName: (row) => row.rnsr_ror_label_match === false ? 'bg-error' : '',
          isSortable: true,
          label: 'Label',
          sortableField: 'ror_infos.label.default.keyword',
        },
        {
          id: 'ror_city',
          getClassName: (row) => row.rnsr_ror_city_match === false ? 'bg-error' : '',
          isSortable: true,
          label: 'Ville',
          sortableField: 'ror_infos.address.city.keyword',
        },
      ],
    },
  ], [])

  const downloadCsv = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (numberOfResults > 0) {
      // Extract keys from the first object to use as headers
      const headers = Object.keys(dataReferencesAll.results[0])
      const rows = dataReferencesAll.results.map((row) => headers.map((header) => row?.[header] ? `"${row[header]}"` : ""))
      // Combine headers and rows into a single CSV string
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n')
      // Create a hidden download link
      const link = document.createElement('a')
      link.download = `scan_references_${id}.csv`
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
      <RorModal acronym={acronym} setShowRorModal={setShowRorModal} showRorModal={showRorModal} />
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
        {(isLoading || isLoadingReferences || isLoadingReferencesAll) && <PageSkeleton />}
        {dataReferencesAll?.results && (
          <>
            <Row gutters>
              <Col>
                <Gauge label="Taux de présence d'IdRef" percent={meanWithIdref} />
              </Col>
              <Col>
                <Gauge label="Taux de présence de ROR" percent={meanWithRor} />
              </Col>
            </Row>
            <Row gutters>
              <Col>
                <Gauge label="Accord RNSR-ROR Label" percent={matchLabel} />
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
                  {(dataReferencesAll?.aggregations?.rnsr_level?.buckets ?? []).map((level) => <li key={`${id}-rnsr-level-${level.key}`}>
                    {level.key} : {level.doc_count}
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
              aggregations={dataReferences?.aggregations ?? {}}
              columns={columns}
              dataTable={dataReferences?.results}
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