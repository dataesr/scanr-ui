import { Button, Col, MenuButton, MenuItem, Row, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsRankingContext } from "../../../context/rankingContext"
import { trendsRankingSortFromId, trendsRankingSortFromLabel } from "../../../config/rankingSorts"
import useScreenSize from "../../../../../hooks/useScreenSize"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"

function TrendsRankingHeaderMobileButton() {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const { sort, setSort, setFocus } = useTrendsRankingContext()
  const currentSort = trendsRankingSortFromId(sort)

  const onMenuAction = (key: string) => {
    key === currentSort.label
      ? currentSort?.nextSort && setSort(currentSort.nextSort)
      : setSort(trendsRankingSortFromLabel(key).id)
    setFocus("")
  }

  return (
    <MenuButton
      label={intl.formatMessage({ id: `trends.ranking.header.${currentSort.label}` }, { max: max, count: max - min + 1 })}
      variant="tertiary"
      icon="more-fill"
      onAction={onMenuAction}
      iconPosition="right"
    >
      <MenuItem key="count">{intl.formatMessage({ id: `trends.ranking.header.count` }, { max: max })}</MenuItem>
      {/* <MenuItem key="diff">{intl.formatMessage({ id: `trends.ranking.header.diff` })}</MenuItem> */}
      <MenuItem key="trend">{intl.formatMessage({ id: `trends.ranking.header.trend` }, { count: max - min + 1 })}</MenuItem>
    </MenuButton>
  )
}

function TrendsRankingHeaderButton({ label }) {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const { sort, setSort, setFocus } = useTrendsRankingContext()
  const { handlePageChange } = useOptions()
  const currentSort = trendsRankingSortFromId(sort)
  const defaultSort = trendsRankingSortFromLabel(label)

  const isSelected = Boolean(label === currentSort.label)
  const onButtonClick = () => {
    isSelected ? currentSort?.nextSort && setSort(currentSort.nextSort) : setSort(defaultSort.id) // change sorting
    handlePageChange(1) // reset page
    setFocus("") // reset focus
  }

  return (
    <Button
      style={{ width: "100%" }}
      icon={isSelected ? (currentSort.order == "top" ? "arrow-up-line" : "arrow-down-line") : ""}
      iconPosition="right"
      variant={isSelected ? "tertiary" : "text"}
      onClick={onButtonClick}
    >
      {intl.formatMessage({ id: `trends.ranking.header.${label}` }, { max: max, count: max - min + 1 })}
    </Button>
  )
}

export default function TrendsRankingHeader() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const isMobile = ["xs", "sm"].includes(screen)

  return (
    <Row verticalAlign="middle" horizontalAlign="center">
      <Col xs="6" sm="6" md="4" lg="4">
        <Text style={{ justifySelf: "center" }} className="fr-mb-0">
          {intl.formatMessage({ id: `trends.ranking.header.domains` })}
        </Text>
      </Col>
      {!isMobile && (
        <>
          <Col md="4" lg="4">
            <TrendsRankingHeaderButton label="count" />
          </Col>
          {/* <Col md="3" lg="3">
            <TrendsViewButton label="diff" />
          </Col> */}
          <Col md="4" lg="4">
            <TrendsRankingHeaderButton label="trend" />
          </Col>
        </>
      )}
      {isMobile && (
        <Col xs="6" sm="6">
          <Row horizontalAlign="right">
            <TrendsRankingHeaderMobileButton />
          </Row>
        </Col>
      )}
    </Row>
  )
}
