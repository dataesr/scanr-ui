import { Badge, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsRankingContext } from "../../../context/rankingContext"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"
import useScreenSize from "../../../../../hooks/useScreenSize"
import { itemGetColor, itemGetTrendState } from "../_utils"
import { trendsRankingSortFromId } from "../../../config/rankingSorts"
import TrendsFocus from "../focus"

export default function TrendsRankingItem({ item }) {
  const { sort, focus, setFocus } = useTrendsRankingContext()
  const { trendsYears } = useTrends()
  const { normalized } = useOptions()
  const { screen } = useScreenSize()

  const isMobile = ["xs", "sm"].includes(screen)
  const currentSortLabel = trendsRankingSortFromId(sort).label

  // const diffColor = itemGetColor(item, "diff", normalized)
  // const diffLabel =
  //   item.diff === Infinity
  //     ? Object.keys(item.count).length === 1
  //       ? "NEW"
  //       : "RESURGENT"
  //     : `${Number(item.diff * 100).toFixed(0.1)} %`

  const slopeColor = itemGetColor(item, normalized ? "norm_slope" : "slope", normalized)
  const trendState = itemGetTrendState(item, normalized)

  const isFocused = Boolean(focus === item.id)
  const focusKey = `focus-${sort}-${item.id}`

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
          <Col sm="8" md="4" lg="4">
            <Row horizontalAlign="left">
              <div>{item.label}</div>
            </Row>
          </Col>
          {(!isMobile || currentSortLabel == "count") && (
            <Col sm="4" md="4" lg="4">
              <Row horizontalAlign="left">
                <div className="fr-ml-5w">{item?.count?.[trendsYears.max] || 0}</div>
              </Row>
            </Col>
          )}
          {/* {(!isMobile || currentSortLabel == "diff") && (
            <Col sm="4" md="3" lg="3">
              <Row horizontalAlign="right">
                <Badge noIcon color={diffColor}>
                  {diffLabel}
                </Badge>
              </Row>
            </Col>
          )} */}
          {(!isMobile || currentSortLabel == "trend") && (
            <Col sm="4" md="4" lg="4">
              <Row horizontalAlign="left">
                <Badge className="fr-ml-5w" noIcon color={slopeColor}>
                  {trendState}
                </Badge>
              </Row>
            </Col>
          )}
        </Row>
      </button>
      <div key={sort} className="fr-collapse" id={focusKey}>
        {isFocused && <TrendsFocus item={item} />}
      </div>
    </Container>
  )
}
