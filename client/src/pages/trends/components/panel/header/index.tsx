import { Button, Col, MenuButton, MenuItem, Row, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../../context"
import { trendsViewFromLabel, trendsViewGetConfig } from "../../../config/views"
import useScreenSize from "../../../../../hooks/useScreenSize"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"

function TrendsViewMobileButton() {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const { view, setView, setFocus } = useTrendsContext()
  const viewConfig = trendsViewGetConfig(view)

  const onMenuAction = (key: string) => {
    key === viewConfig.label ? viewConfig?.nextView && setView(viewConfig.nextView) : setView(trendsViewFromLabel(key))
    setFocus("")
  }

  return (
    <MenuButton
      label={intl.formatMessage({ id: `trends.views.header.${viewConfig.label}` }, { max: max, count: max - min + 1 })}
      variant="tertiary"
      icon="more-fill"
      onAction={onMenuAction}
      iconPosition="right"
    >
      <MenuItem key="count">{intl.formatMessage({ id: `trends.views.header.count` }, { max: max })}</MenuItem>
      {/* <MenuItem key="diff">{intl.formatMessage({ id: `trends.views.header.diff` })}</MenuItem> */}
      <MenuItem key="trend">{intl.formatMessage({ id: `trends.views.header.trend` }, { count: max - min + 1 })}</MenuItem>
    </MenuButton>
  )
}

function TrendsViewButton({ label }) {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const { view, setView, setFocus } = useTrendsContext()
  const { handlePageChange } = useOptions()
  const viewConfig = trendsViewGetConfig(view)
  const defaultView = trendsViewFromLabel(label)

  const isSelected = Boolean(label === viewConfig.label)
  const onButtonClick = () => {
    isSelected ? viewConfig?.nextView && setView(viewConfig.nextView) : setView(defaultView) // change view
    handlePageChange(1) // reset page
    setFocus("") // reset focus
  }

  return (
    <Button
      style={{ width: "100%" }}
      icon={isSelected ? (viewConfig.order == "top" ? "arrow-up-line" : "arrow-down-line") : ""}
      iconPosition="right"
      variant={isSelected ? "tertiary" : "text"}
      onClick={onButtonClick}
    >
      {intl.formatMessage({ id: `trends.views.header.${label}` }, { max: max, count: max - min + 1 })}
    </Button>
  )
}

export default function TrendsViewHeader() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const isMobile = ["xs", "sm"].includes(screen)

  return (
    <Row verticalAlign="middle" horizontalAlign="center">
      <Col xs="6" sm="6" md="4" lg="4">
        <Text style={{ justifySelf: "center" }} className="fr-mb-0">
          {intl.formatMessage({ id: `trends.views.header.domains` })}
        </Text>
      </Col>
      {!isMobile && (
        <>
          <Col md="4" lg="4">
            <TrendsViewButton label="count" />
          </Col>
          {/* <Col md="3" lg="3">
            <TrendsViewButton label="diff" />
          </Col> */}
          <Col md="4" lg="4">
            <TrendsViewButton label="trend" />
          </Col>
        </>
      )}
      {isMobile && (
        <Col xs="6" sm="6">
          <Row horizontalAlign="right">
            <TrendsViewMobileButton />
          </Row>
        </Col>
      )}
    </Row>
  )
}
