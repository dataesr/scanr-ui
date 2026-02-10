import { Container, Text } from "@dataesr/dsfr-plus"
import useUrl from "../../../search/hooks/useUrl"
import { useIntl } from "react-intl"
import { RangeSlider } from "../../../../components/range-slider"
import { useNetworkContext } from "../../context"
import { CONFIG } from "../../../../api/networks/config/elastic"

export default function NetworksCoElementsFilters() {
  const intl = useIntl()
  const { currentFilters, handleRangeFilterChange } = useUrl()
  const {
    options: { currentModel, currentSource },
  } = useNetworkContext()
  const countField = CONFIG[currentSource][currentModel]?.count

  if (countField === undefined) return null

  const minValue = 2
  const maxValue = 20
  const currentMaxValue = currentFilters?.[countField]?.values?.[1].value
  const modelLabel = intl.formatMessage({ id: `networks.model.${currentModel}` }).toLowerCase()

  return (
    <Container fluid>
      <Text className="fr-mb-1v" bold size="md">
        {intl.formatMessage({ id: "networks.filters.range-co-elements.title" }, { model: modelLabel })}
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        {intl.formatMessage({ id: "networks.filters.range-co-elements.description" }, { model: modelLabel })}
      </Text>
      <RangeSlider
        label={intl.formatMessage(
          { id: "networks.filters.range-co-elements.label" },
          { value: currentMaxValue || maxValue, model: modelLabel },
        )}
        value={currentMaxValue || maxValue}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(value: number) => handleRangeFilterChange({ field: countField, value: [minValue, value] })}
      />
    </Container>
  )
}
