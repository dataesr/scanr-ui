import { Container } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../context"
import useTrends from "../../hooks/useTrends"
import "./styles.scss"
import TrendsTableItem from "./item"
import TrendsTableHeader from "./header"
import TrendsTableFooter from "./footer"
import TrendsTableSkeleton from "./skeleton"
import useOptions from "../../hooks/useOptions"

export default function TrendsTable() {
  const { includes } = useTrendsContext()
  const { currentSort } = useOptions()
  const { trends, isFetching, error } = useTrends()

  if (!trends && isFetching) return <TrendsTableSkeleton />
  if (!trends?.ranking || error) return <div>no data</div>

  const items = includes
    ? trends.ranking[currentSort].filter((item) => item.label.toLowerCase().includes(includes))
    : trends.ranking[currentSort]

  return (
    <Container>
      <Container className="fr-card">
        <table>
          <TrendsTableHeader />
          <tbody>
            {items.map((item, index) => (
              <TrendsTableItem key={index} index={index + 1} item={item} />
            ))}
          </tbody>
        </table>
        <TrendsTableFooter />
      </Container>
    </Container>
  )
}
