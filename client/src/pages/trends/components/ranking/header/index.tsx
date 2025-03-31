import { useIntl } from "react-intl"
import useTrends from "../../../hooks/useTrends"
import { useTrendsContext } from "../../../context"
import useOptions from "../../../hooks/useOptions"
import { trendsRankingSortFromId, trendsRankingSortFromLabel } from "../../../config/sorting"

export default function TrendsTableHeader() {
  const intl = useIntl()
  const { trendsYears } = useTrends()
  const { sort, setSort, setFocus } = useTrendsContext()
  const { currentModel, handlePageChange } = useOptions()
  const currentSort = trendsRankingSortFromId(sort)

  const handleSortChange = (sortLabel: string) => {
    const headerSort = trendsRankingSortFromLabel(sortLabel)
    // set next sort
    sortLabel === currentSort.label ? currentSort?.nextSort && setSort(currentSort.nextSort) : setSort(headerSort.id) // change sorting
    handlePageChange(1) // reset page
    setFocus("") // reset focus
  }

  return (
    <thead>
      <tr>
        <th>Rank</th>
        <th onClick={() => console.log("domains")}>{intl.formatMessage({ id: `trends.ranking.header.domains` })}</th>
        <th onClick={() => handleSortChange("count")}>
          {intl.formatMessage({ id: `trends.ranking.header.count` }, { max: trendsYears.max })}
        </th>
        <th
          onClick={() => handleSortChange("variation")}
          key="coucou"
          title={`The variation between the volume in ${trendsYears.max} and the previous years average volume`}
        >
          Growth
        </th>
        <th onClick={() => handleSortChange("trend")}>
          {intl.formatMessage({ id: `trends.ranking.header.trend` }, { count: trendsYears.max - trendsYears.min + 1 })}
        </th>
        {currentModel === "entity-fishing" && <th>Description</th>}
        {currentModel !== "entity-fishing" && <th>Category</th>}
      </tr>
    </thead>
  )
}
