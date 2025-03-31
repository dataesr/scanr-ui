import { Badge, Link, Text } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import useTrends from "../../../hooks/useTrends"
import useWikidata from "../../../hooks/useWikidata"
import LineChart from "../../line-chart"
import { TrendsRankingItem } from "../../../../../types/trends"
import { formatItemVariation } from "../_utils"
import LineChartMini from "../../line-chart/mini"
import useOptions from "../../../hooks/useOptions"

type TrendsTableItemProps = {
  index: number
  item: TrendsRankingItem
}
export default function TrendsTableItem({ index, item }: TrendsTableItemProps) {
  const { trendsYears } = useTrends()
  const { focus, setFocus } = useTrendsContext()
  const { currentModel } = useOptions()
  const { wikis } = useWikidata()
  const wiki = wikis?.find((w) => w.code === item.id)
  const url = wiki?.url
  const description = wiki?.extract || ""
  const isFocused = Boolean(focus === index)

  isFocused && console.log("item", item)

  return (
    <>
      <tr onClick={() => setFocus(focus === index ? null : index)} key={index}>
        <td>{index}</td>
        <td className="label">
          {url ? (
            <Link href={url} target="_blank">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </td>
        <td className="count">{item.count?.[trendsYears.max] || 0}</td>
        <td className="growth">
          <Badge
            icon={item.variation > 0 ? "arrow-up-line" : "arrow-down-line"}
            color={item.variation > 0 ? "green-emeraude" : "orange-terre-battue"}
          >
            {formatItemVariation(item.variation)}
          </Badge>
        </td>
        <td className="trend">
          <LineChartMini data={item} />
        </td>
        {currentModel === "entity-fishing" && (
          <td className="description" title={description}>
            <Text size="sm" as="span">
              {description}
            </Text>
          </td>
        )}
        {currentModel !== "entity-fishing" && <td></td>}
      </tr>
      {isFocused && (
        <tr>
          <td colSpan={7}>
            <LineChart data={item} source={"publications"} />
          </td>
        </tr>
      )}
    </>
  )
}
