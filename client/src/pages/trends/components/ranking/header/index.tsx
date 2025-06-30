import cn from "classnames"
import { useIntl } from "react-intl"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"
import { useTrendsContext } from "../../../context"
import { useState } from "react"
import { TextInput } from "@dataesr/dsfr-plus"

export default function TrendsTableHeader() {
  const intl = useIntl()
  const [openSearch, setOpenSearch] = useState(false)
  const { includes, setIncludes } = useTrendsContext()
  const { trendsYears } = useTrends()
  const { currentModel } = useOptions()

  const handleOpenSearchChange = () => {
    if (openSearch === true) setIncludes("") // reset includes if closing
    setOpenSearch(!openSearch)
  }

  return (
    <thead>
      <tr>
        <th className={cn("action", openSearch ? "open" : "")} onClick={handleOpenSearchChange}>
          {<span className="fr-icon-search-line" />}
        </th>
        <th>
          {openSearch ? (
            <TextInput value={includes} placeholder="Search topics" onChange={(event) => setIncludes(event.target.value)} />
          ) : (
            intl.formatMessage({ id: `trends.ranking.header.domains` })
          )}
        </th>
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
