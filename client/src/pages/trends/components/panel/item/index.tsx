import { Badge, Col, Container, Row } from "@dataesr/dsfr-plus"
import { useTrendsContext } from "../../../context"
import useTrends from "../../../hooks/useTrends"
import useScreenSize from "../../../../../hooks/useScreenSize"
import { itemGetColor, itemGetTrendState } from "../_utils"
import { trendsViewGetConfig } from "../../../config/views"
import TrendsFocus from "../focus"

export default function TrendsViewItem({ item }) {
  const { view, focus, setFocus, normalized } = useTrendsContext()
  const { trendsYears } = useTrends()
  const { screen } = useScreenSize()
  const isMobile = ["xs", "sm"].includes(screen)
  const viewLabel = trendsViewGetConfig(view).label

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
  const focusKey = `focus-${view}-${item.id}`

  isFocused && console.log("item", item)

  return (
    <Container key={view} fluid className="fr-accordion">
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
          {(!isMobile || viewLabel == "count") && (
            <Col sm="4" md="4" lg="4">
              <Row horizontalAlign="left">
                <div className="fr-ml-5w">{item?.count?.[trendsYears.max] || 0}</div>
              </Row>
            </Col>
          )}
          {/* {(!isMobile || viewLabel == "diff") && (
            <Col sm="4" md="3" lg="3">
              <Row horizontalAlign="right">
                <Badge noIcon color={diffColor}>
                  {diffLabel}
                </Badge>
              </Row>
            </Col>
          )} */}
          {(!isMobile || viewLabel == "trend") && (
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
      <div key={view} className="fr-collapse" id={focusKey}>
        {isFocused && <TrendsFocus item={item} />}
      </div>
    </Container>
  )
}
