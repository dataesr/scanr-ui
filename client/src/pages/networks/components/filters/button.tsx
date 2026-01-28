import { useIntl } from "react-intl"
import { Badge, Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useNetworkContext } from "../../context"

export default function NetworkFiltersButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const {
    filters,
    integration: { integrationOptions },
  } = useNetworkContext()

  if (integrationOptions.showFilters === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="more-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-filters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm", "mg"].includes(screen) ? null : intl.formatMessage({ id: "networks.filters.button.label" })}
      <Badge className="fr-ml-1w" size="md" color="blue-ecume">
        {`${Object.keys(filters)?.length}`}
      </Badge>
    </Button>
  )
}
