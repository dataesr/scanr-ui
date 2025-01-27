import { Badge, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsRankingContext } from "../../../context/rankingContext"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"
import useScreenSize from "../../../../../hooks/useScreenSize"
import { itemGetColor, itemGetTrendState, itemGetTrendVariation } from "../_utils"
import { trendsRankingSortFromId } from "../../../config/rankingSorts"
import TrendsRankingFocus from "../focus"

export default function TrendsRankingItem({ item }) {
  const { sort, focus, setFocus } = useTrendsRankingContext()
  const { trendsYears } = useTrends()
  const { currentModel, normalized } = useOptions()
  const { screen } = useScreenSize()

  const isMobile = ["xs", "sm"].includes(screen)
  const currentSortLabel = trendsRankingSortFromId(sort).label

  const trendColor = itemGetColor(item, normalized ? "norm_slope" : "slope", normalized)
  const trendState = itemGetTrendState(item, normalized)
  const trendScore = itemGetTrendVariation(item)

  const isFocused = Boolean(focus === item.id)
  const focusKey = `focus-${currentModel}-${sort}-${item.id}`

  isFocused && console.log("item", item)

  return (
    <Container key={sort} fluid className="fr-accordion">
      <button
        className="fr-accordion__btn"
        aria-expanded="false"
        aria-controls={focusKey}
        onClick={() => setFocus(isFocused ? "" : item.id)}
      >
        <Row style={{ width: "100%" }} verticalAlign="middle">
          <Col sm="8" md="5" lg="5">
            <Row horizontalAlign="left">
              <div>{item.label}</div>
            </Row>
          </Col>
          {(!isMobile || currentSortLabel == "count") && (
            <Col md="3" lg="3">
              <Row horizontalAlign="left">
                <div className="fr-ml-5w">{item?.count?.[trendsYears.max] || 0}</div>
              </Row>
            </Col>
          )}
          {(!isMobile || currentSortLabel == "trend") && (
            <Col md="4" lg="4">
              <Row horizontalAlign="left">
                <Badge className="fr-ml-5w" noIcon color={trendColor}>
                  {trendState}
                </Badge>
                <div className="fr-ml-6w">{trendScore}</div>
              </Row>
            </Col>
          )}
        </Row>
      </button>
      <div key={sort} className="fr-collapse" id={focusKey}>
        {isFocused && <TrendsRankingFocus item={item} />}
      </div>
    </Container>
  )
}
