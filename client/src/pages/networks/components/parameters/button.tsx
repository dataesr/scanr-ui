import { Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useIntl } from "react-intl"
import { useNetworkContext } from "../../context"

export default function NetworkParametersButton() {
  const intl = useIntl()
  const {
    integration: { integrationOptions },
  } = useNetworkContext()
  const { screen } = useScreenSize()

  if (integrationOptions.showParameters === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="equalizer-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-parameters-modal"
      data-fr-opened="false"
      variant={"tertiary"}
    >
      {["xs", "sm", "mg"].includes(screen) ? null : intl.formatMessage({ id: "networks.parameters.button.label" })}
    </Button>
  )
}
