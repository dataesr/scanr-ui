import { useIntl } from "react-intl"
import { Button } from "@dataesr/dsfr-plus"
import useScreenSize from "../../../../hooks/useScreenSize"
import { NETWORK_SOURCES } from "../../config/sources"
import { useNetworkContext } from "../../context"

export default function NetworkSelectSourceButton() {
  const intl = useIntl()
  const {
    options: { currentSource },
    integration: { integrationOptions },
  } = useNetworkContext()
  const { screen } = useScreenSize()

  if (integrationOptions.showSelectSource === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={NETWORK_SOURCES.find(({ label }) => label === currentSource).icon}
      iconPosition="left"
      as="button"
      aria-controls="networks-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
      title={intl.formatMessage({ id: "networks.select-source.modal.title" })}
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `networks.source.${currentSource}` })}
    </Button>
  )
}
