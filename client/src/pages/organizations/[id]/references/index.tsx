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
  Toggle,
  useDSFRConfig,
} from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"
import { ReactElement, useEffect, useMemo, useState } from "react"
import { RawIntlProvider, createIntl } from "react-intl"
import { useParams } from "react-router-dom"

import { getOrganizationById } from "../../../../api/organizations/[id]/index.ts"
import { getOrganizationReferences, getRnsrReferences } from "../../../../api/organizations/[id]/references.ts"
import Gauge from "../../../../components/gauge/index.tsx"
import PageSkeleton from "../../../../components/skeleton/page-skeleton"
import getLangFieldValue from "../../../../utils/lang.ts"
import RorModal from "./components/ror-modal"
import DataTable from "./datatable.tsx"
import { envoiClient, initPopUp } from "./formulaire.js"

import "./subModal.css"

export type Column = {
  filterType?: 'missing' | 'select', // If "isFilterable" is True, "select" will display a dropdown, "missing" will diplay a button to filter on missing values only
  getCellValue?: (object) => ReactElement,
  getClassName?: (object) => string,
  groups?: Column[],
  id: string,
  isDisplayed?: boolean, // Is the column displayed or not, True if not set
  isFilterable?: boolean, // Is the column filterable, by default a simple tetx input is displayed. False if omitted
  isSortable?: boolean, // Is the column sortable. False if omitted
  label?: string, // Column label as header. If omitted, the column id is displayed instead
  sortableField?: string, // Is the column sortable
  width?: string, // To master the width of the column, ex: '25rem'
}

export type Filter = {
  id: string
  value: string
}

export type Pagination = {
  from: number,
  size: number,
}

export type Sort = {
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
  const [breadcrumbLabel, setBreadcrumbLabel] = useState<string>()
  const [expanded, setExpanded] = useState<number>(0)
  const [filters, setFilters] = useState<Filter[]>([])
  const [idOrganization, setIdOrganization] = useState<string>()
  const [idref, setIdref] = useState<string>()
  const [matchCity, setMatchCity] = useState<number>(0)
  const [matchLabel, setMatchLabel] = useState<number>(0)
  const [meanWithIdref, setMeanWithIdref] = useState<number>(0)
  const [meanWithRor, setMeanWithRor] = useState<number>(0)
  const [numberOfResults, setNumberOfResults] = useState<number>(0)
  const [pagination, setPagination] = useState<Pagination>({ from: 0, size: 100 })
  const [showRorModal, setShowRorModal] = useState(false)
  const [sorting, setSorting] = useState<Sort>({})

  const { data, isLoading } = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  })

  const { data: dataReferences, isLoading: isLoadingReferences } = useQuery({
    queryKey: ["organizations", "references", filters, idOrganization, pagination, sorting],
    queryFn: () => getOrganizationReferences(filters, idOrganization, pagination, sorting),
    throwOnError: true,
  })

  const { data: dataReferencesAll, isLoading: isLoadingReferencesAll } = useQuery({
    queryKey: ["organizations", "references-all", filters, idOrganization],
    queryFn: () => getOrganizationReferences(filters, idOrganization, { from: 0, size: 2000 }, {}),
    throwOnError: true,
  })

  const { data: dataRnsrReferences } = useQuery({
    queryFn: () => getRnsrReferences(),
    queryKey: ["organizations", "rnsr-references"],
    refetchInterval: 1 * 60 * 1000, // 1 minute
    throwOnError: true,
  })

  useEffect(() => initPopUp(), [])

  useEffect(() => {
    const breadcrumbLabelTmp: string = getLangFieldValue(locale)(data?.label)
    if (breadcrumbLabelTmp) setBreadcrumbLabel(breadcrumbLabelTmp)
    const idOrganizationTmp = data?.id?.toString()
    if (idOrganizationTmp) setIdOrganization(idOrganizationTmp)
    const idrefTmp: string = data?.externalIds?.find((id) => id.type === 'idref')?.id?.toString()
    if (idrefTmp) setIdref(idrefTmp)
  }, [data, locale])

  useEffect(() => {
    if (dataReferences?.results && dataRnsrReferences) {
      dataReferences?.results.forEach((item) => {
        const rnsr = item?.rnsr
        const idref = dataRnsrReferences?.[rnsr]?.find((id) => id?.type === "idref")?.id
        if (idref) item.idref = idref
        const ror = dataRnsrReferences?.[rnsr]?.find((id) => id?.type === "ror")?.id
        if (ror) item.ror = ror
      });
    }
    if (dataReferencesAll?.results && dataRnsrReferences) {
      dataReferencesAll?.results.forEach((item) => {
        const rnsr = item?.rnsr
        const idref = dataRnsrReferences?.[rnsr]?.find((id) => id?.type === "idref")?.id
        if (idref) item.idref = idref
        const ror = dataRnsrReferences?.[rnsr]?.find((id) => id?.type === "ror")?.id
        if (ror) item.ror = ror
      });
    }
  }, [dataReferences?.results, dataReferencesAll?.results, dataRnsrReferences])

  useEffect(() => {
    const numberOfResultsTmp = dataReferencesAll?.results?.length ?? 0
    setNumberOfResults(numberOfResultsTmp)
    setMeanWithIdref(Math.round(dataReferencesAll?.results?.filter((item) => item?.idref && item.idref)?.length / numberOfResultsTmp * 100))
    setMeanWithRor(Math.round(dataReferencesAll?.results?.filter((item) => item?.ror && item.ror)?.length / numberOfResultsTmp * 100))
    setMatchCity(Math.round(dataReferencesAll?.results?.filter((item) => item?.rnsr_ror_city_match && item.rnsr_ror_city_match)?.length / numberOfResultsTmp * 100))
    setMatchLabel(Math.round(dataReferencesAll?.results?.filter((item) => item?.rnsr_ror_label_match && item.rnsr_ror_label_match)?.length / numberOfResultsTmp * 100))
  }, [dataReferencesAll?.results])

  const columns = useMemo<Column[]>(() => {
    const getZones = (row: any) => {
      // z008: Type d'autorité ou type de notice
      let zones = 'z008_a:"Tb5"'
      // z035: Autres identifiants (ROR, HAL, RNSR ...)
      if (row?.rnsr) zones += `,z035_a_1:"${row.rnsr}",z035_2_1:"RNSR",z035_C_1:"RNSR"`
      // z035: Autres identifiants (ROR, HAL, RNSR ...)
      if (row?.ror) zones += `,z035_a_2:"${row.ror}",z035_2_2:"ROR",z035_C_2:"ROR"`
      // z101: Langue d'expression
      zones += ',z101_a:"fre"'
      // z102: Pays
      zones += ',z102_a:"FR"'
      // z103: Dtes d'activité
      if (row?.rnsr_creation) zones += `,z103_a:"${row.rnsr_creation}-...."`
      // z210: Nom de la collectivité / du congrès
      if (row?.rnsr_label) zones += `,z210_a:"@${row.rnsr_label}"`
      if (row?.rnsr_city) zones += `,z210_c:"${row.rnsr_city}"`
      // z410: Variante de point d'accès
      if (row?.rnsr_acronym) zones += `,z410_a:"@${row.rnsr_acronym}"`
      // z510: Nom de Collectivité ou de Congrès
      if (idref) {
        zones += `,z510_3:"${idref}",z510_5:"xxq"`
        if (row?.rnsr_creation) zones += `,z510_0:"${row.rnsr_creation}-...."`
      }
      // z810: Source consultée avec profit
      zones += ',z810_a:"RNSR"'
      return zones
    }

    return [
      {
        id: 'identifiers',
        label: 'Identifiants',
        groups: [
          {
            id: 'rnsr',
            getCellValue: (row) => row?.rnsr ? <a href={`https://rnsr.adc.education.fr/structure/${row.rnsr}`} target="_blank">{row.rnsr}</a> : <></>,
            label: 'RNSR',
            width: '9rem',
          },
          {
            id: 'idref',
            getCellValue: (row) => row?.idref ? <a href={`https://www.idref.fr/${row.idref}`} target="_blank">{row.idref}</a> : (row?.rnsr_acronym ? <span onClick={() => { setAcronym(row.rnsr_acronym); envoiClient('Nom de collectivité', row.rnsr_acronym, '', '', 'Type de notice', 'Collectivité', '', '', getZones(row)) }} title="Trouver mon IdRef"><i>Trouver mon IdRef</i></span> : <></>),
            getClassName: (row) => (row?.idref || !row?.rnsr_acronym) ? '' : 'bg-error',
            isFilterable: true,
            filterType: 'missing',
            label: 'IdRef',
            width: '8rem',
          },
          {
            id: 'ror',
            getCellValue: (row) => row?.ror ? <a href={`https://ror.org/${row.ror}`} target="_blank">{row.ror}</a> : (row?.rnsr_acronym ? <span onClick={() => { setAcronym(row.rnsr_acronym); setShowRorModal(true); }} title="Trouver mon ROR"><i>Trouver mon ROR</i></span> : <></>),
            getClassName: (row) => (row?.ror || !row?.rnsr_acronym) ? '' : 'bg-error',
            isFilterable: true,
            filterType: 'missing',
            label: 'ROR',
            width: '8rem',
          },
        ],
      },
      {
        id: 'rnsr',
        isDisplayed: expanded == 0,
        label: 'RNSR',
        groups: [
          {
            filterType: 'select',
            id: 'rnsr_level',
            isFilterable: true,
            label: 'Niveau',
            width: '8rem',
          },
          {
            id: 'rnsr_label',
            isSortable: true,
            label: 'Label',
            sortableField: 'label.fr.keyword',
            width: '8rem',
          },
          {
            id: 'rnsr_city',
            isSortable: true,
            label: 'Ville',
            sortableField: 'address.city.keyword',
            width: '8rem',
          },
          {
            id: 'rnsr_acronym',
            isSortable: true,
            label: 'Acronyme',
            sortableField: 'acronym.fr.keyword',
            width: '5rem',
          },
        ],
      },
      {
        id: 'rnsr_expanded',
        getCellValue: (row) => <><b>Niveau: </b>{row.rnsr_level}<br /><b>Label: </b>{row.rnsr_label}<br /><b>Ville: </b>{row.rnsr_city}<br /><b>Acronyme: </b>{row.rnsr_acronym}</>,
        getClassName: () => 'expanded',
        isDisplayed: expanded == 1,
        label: 'RNSR',
        width: '45rem',
      },
      {
        id: 'ror',
        label: 'ROR',
        isDisplayed: expanded == 0,
        groups: [
          {
            id: 'rnsr_ror_match',
            getCellValue: (row) => (row.rnsr_ror_label_match === undefined || row.rnsr_ror_city_match === undefined) ? <></> : (row.rnsr_ror_label_match && row.rnsr_ror_city_match ? <Badge color="green-emeraude">Vrai</Badge> : <Badge color="orange-terre-battue">Faux</Badge>),
            label: 'Match RNSR',
            width: '6rem',
          },
          {
            id: 'ror_label',
            getClassName: (row) => row.rnsr_ror_label_match === false ? 'bg-error' : '',
            isSortable: true,
            label: 'Label',
            sortableField: 'ror_infos.label.default.keyword',
            width: '8rem',
          },
          {
            id: 'ror_city',
            getClassName: (row) => row.rnsr_ror_city_match === false ? 'bg-error' : '',
            isSortable: true,
            label: 'Ville',
            sortableField: 'ror_infos.address.city.keyword',
            width: '8rem',
          },
        ],
      },
      {
        id: 'ror_expanded',
        getCellValue: (row) => row?.ror ? <><br /><b>Label: </b>{row.ror_label}<br /><b>Ville: </b>{row.ror_city}</> : <></>,
        getClassName: () => 'expanded',
        isDisplayed: expanded == 1,
        label: 'ROR',
        width: '45rem',
      },
    ]
  }, [expanded, idref])

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
      link.download = `scan_references_${idOrganization}.csv`
      link.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8' }))
      link.style.visibility = 'hidden'
      // Append link to DOM, trigger click, and clean up
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getGaugeColor = (mean: number): string => {
    if (mean < 33) return "var(--background-alt-pink-tuile-active)"
    if (mean < 66) return "var(--background-alt-yellow-tournesol-active)"
    return "var(--background-alt-green-emeraude-active)"
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
                <Gauge color={getGaugeColor(meanWithIdref)} label="Taux de présence d'IdRef" percent={meanWithIdref} />
              </Col>
              <Col>
                <Gauge color={getGaugeColor(meanWithRor)} label="Taux de présence de ROR" percent={meanWithRor} />
              </Col>
            </Row>
            <Row gutters>
              <Col>
                <Gauge color={getGaugeColor(matchLabel)} label="Accord RNSR-ROR Label" percent={matchLabel} />
              </Col>
              <Col>
                <Gauge color={getGaugeColor(matchCity)} label="Accord RNSR-ROR Ville" percent={matchCity} />
              </Col>
            </Row>
            <Row>
              <Col>
                {numberOfResults} structure(s) dont
                <ul>
                  {(dataReferencesAll?.aggregations?.rnsr_level?.buckets ?? []).map((level) => <li key={`${idOrganization}-rnsr-level-${level.key}`}>
                    {level.key} : {level.doc_count}
                  </li>)}
                </ul>
              </Col>
            </Row>
            <Row className="fr-grid-row--middle fr-mb-3w">
              <Col xs="12" md="6">
                <Title as="h2" look="h4">Données détaillées</Title>
                <Text className="fr-text--sm fr-mb-0" style={{ color: "var(--text-mention-grey)" }}>
                  Liste des structures de {breadcrumbLabel}
                </Text>
              </Col>
              <Col xs="6" md="3">
                <Toggle label="Vue agrandie" value={expanded} onChange={() => setExpanded(expanded === 0 ? 1 : 0)} />
              </Col>
              <Col xs="6" md="3" style={{ display: "flex", justifyContent: "flex-end" }}>
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
              dataTable={dataReferences?.results ?? []}
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