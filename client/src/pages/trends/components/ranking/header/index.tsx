import { Button, Col, MenuButton, MenuItem, Row, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../../context"
import { trendsRankingSortFromId, trendsRankingSortFromLabel } from "../../../config/sorting"
import useScreenSize from "../../../../../hooks/useScreenSize"
import useTrends from "../../../hooks/useTrends"
import useOptions from "../../../hooks/useOptions"
import { useState } from "react"

function TrendsRankingHeaderMobileButton() {
  const intl = useIntl()
  const {
    trendsYears: { min, max },
  } = useTrends()
  const { sort, setSort, setFocus } = useTrendsContext()
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
  const { sort, setSort, setFocus } = useTrendsContext()
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
  const { setIncludes } = useTrendsContext()
  const [search, setSearch] = useState(false)
  const isMobile = ["xs", "sm"].includes(screen)

  return (
    <Row verticalAlign="middle" horizontalAlign="center">
      <Col xs="6" sm="6" md="5" lg="5">
        <Row verticalAlign="middle">
          <Button
            title={"Search topics"}
            className="fr-ml-1w"
            size="md"
            icon="search-line"
            iconPosition="left"
            variant={"text"}
            onClick={() => {
              if (search) setIncludes("")
              setSearch(!search)
            }}
          />
          {search ? (
            <>
              <div className="fr-input-group">
                <input
                  className="fr-input"
                  placeholder={"Search topics"}
                  onChange={(event) => setIncludes(event.target.value.toLowerCase())}
                />
              </div>
            </>
          ) : (
            <Text className="fr-btn fr-btn--tertiary-no-outline fr-mb-0" style={{ justifySelf: "center" }}>
              {intl.formatMessage({ id: `trends.ranking.header.domains` })}
            </Text>
          )}
        </Row>
      </Col>
      {!isMobile && (
        <>
          <Col md="3" lg="3">
            <TrendsRankingHeaderButton label="count" />
          </Col>
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
