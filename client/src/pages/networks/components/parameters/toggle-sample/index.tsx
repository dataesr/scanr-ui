import { useIntl } from "react-intl"
import { Toggle } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../../context"

export default function ToggleSample() {
  const intl = useIntl()
  const {
    options: {
      parameters: { sample },
      handleParameterChange,
    },
  } = useNetworkContext()

  return (
    <Toggle
      label={intl.formatMessage({ id: "networks.parameters.toggle-sample.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.toggle-sample.hint" })}
      checked={sample}
      onChange={(event) => handleParameterChange("sample", event.target.checked)}
    />
  )
}
