import { Badge, Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { formatItemVariation } from "../ranking/_utils"
import LineChartMini from "../line-chart/mini"
import { useIntl } from "react-intl"
import { useState } from "react"
import LineChart from "../line-chart"

const cardGetSortData = {
  "count-desc": {
    header: (intl, trendsYears) => (
      <th>{intl.formatMessage({ id: `trends.ranking.header.count` }, { max: trendsYears.max })}</th>
    ),
    value: (item) => item.count?.[String(Math.max(...Object.keys(item.count).map(Number)))],
  },
  "sum-desc": {
    header: (intl, trendsYears) => <th>SUM</th>,
    value: (item) => item.sum,
  },
  "variation-desc": {
    header: (intl, trendsYears) => (
      <th title={`The variation between the volume in ${trendsYears.max} and the previous years average volume`}>
        {intl.formatMessage({ id: `trends.ranking.header.variation` })}
      </th>
    ),
    value: (item) => (
      <Badge
        icon={item.variation > 0 ? "arrow-up-line" : "arrow-down-line"}
        color={item.variation > 0 ? "green-emeraude" : "orange-terre-battue"}
      >
        {formatItemVariation(item.variation)}
      </Badge>
    ),
  },
  "trend-desc": {
    header: (intl, trendsYears) => (
      <th>{intl.formatMessage({ id: `trends.ranking.header.trend` }, { count: trendsYears.max - trendsYears.min + 1 })}</th>
    ),
    value: (item) => <LineChartMini data={item} />,
  },
}

type TrendsCardProps = {
  data: any
  sort: string
}
function TrendsCard({ data, sort }: TrendsCardProps) {
  const intl = useIntl()
  const { trendsYears } = useTrends()
  const [focus, setFocus] = useState<number>(null)

  const _data = data?.[sort]?.slice(0, 10)
  console.log("_data", sort, _data)

  return (
    <Container className="fr-mb-5w">
      <Container className="fr-card">
        <Text size="lead">{sort}</Text>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{"Topics"}</th>
              {cardGetSortData[sort].header(intl, trendsYears)}
            </tr>
          </thead>
          <tbody>
            {_data.map((item, index) => (
              <>
                <tr
                  className={focus === index ? "open" : ""}
                  onClick={() => setFocus(focus === index ? null : index)}
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td className="label">{item.label}</td>
                  <td className="count">{cardGetSortData[sort].value(item)}</td>
                </tr>
                {focus === index && (
                  <tr className="no-hover">
                    <td colSpan={3}>
                      <LineChart data={item} source={"publications"} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </Container>
    </Container>
  )
}

export default function TrendsCards() {
  const { trends, isFetching, error } = useTrends()

  if (isFetching || error) return null

  const data = trends?.ranking
  console.log("data", data)

  return (
    <Container>
      <Row>
        <Col>
          <TrendsCard data={data} sort={"count-desc"} />
        </Col>
        <Col>
          <TrendsCard data={data} sort={"variation-desc"} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TrendsCard data={data} sort={"sum-desc"} />
        </Col>
        <Col>
          <TrendsCard data={data} sort={"trend-desc"} />
        </Col>
      </Row>
    </Container>
  )
}
