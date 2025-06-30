import { useIntl } from "react-intl"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"

export default function TrendsTableHeader() {
  const intl = useIntl()
  const { trendsYears } = useTrends()
  const { currentModel } = useOptions()

  return (
    <thead>
      <tr>
        <th>Rank</th>
        <th>{intl.formatMessage({ id: `trends.ranking.header.domains` })}</th>
        <th>{intl.formatMessage({ id: `trends.ranking.header.count` }, { max: trendsYears.max })}</th>
        <th title={`The variation between the volume in ${trendsYears.max} and the previous years average volume`}>
          {intl.formatMessage({ id: `trends.ranking.header.variation` })}
        </th>
        <th>
          {intl.formatMessage({ id: `trends.ranking.header.trend` }, { count: trendsYears.max - trendsYears.min + 1 })}
        </th>
        {currentModel === "entity-fishing" && <th>Description</th>}
        {currentModel !== "entity-fishing" && currentModel !== "open-alex-domains" && <th>Category</th>}
      </tr>
    </thead>
  )
}
