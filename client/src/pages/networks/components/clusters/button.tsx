import { useIntl } from "react-intl"
import { Button, ButtonGroup } from "@dataesr/dsfr-plus"
import useOptions from "../../hooks/useOptions"
import { useNetworkContext } from "../../context"

export default function ClustersButton() {
  const intl = useIntl()
  const { parameters, handleParameterChange } = useOptions()
  const { search } = useNetworkContext()

  return (
    <ButtonGroup size="md">
      <Button
        title={intl.formatMessage({ id: "networks.clusters.button.description" })}
        variant={parameters.clusters ? "secondary" : "primary"}
        onClick={() => handleParameterChange("clusters", !parameters.clusters)}
        disabled={search.isFetching || Boolean(search.error)}
      >
        <span className="fr-icon-ai-generate-2 fr-btn--icon-left" style={{ cursor: "help" }} />
        <span>
          {intl.formatMessage({
            id: parameters.clusters ? "networks.clusters.button.rm" : "networks.clusters.button.add",
          })}
        </span>
      </Button>
    </ButtonGroup>
  )
}
