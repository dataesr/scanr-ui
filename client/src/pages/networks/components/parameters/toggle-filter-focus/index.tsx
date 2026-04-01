import { useIntl } from "react-intl"
import { Toggle } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../../context"

export default function ToggleFilterFocus() {
  const intl = useIntl()
  const {
    options: {
      parameters: { filterFocus },
      handleParameterChange,
    },
  } = useNetworkContext()

  return (
    <Toggle
      label={intl.formatMessage({ id: "networks.parameters.toggle-filter-focus.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.toggle-filter-focus.hint" })}
      checked={filterFocus}
      onChange={(event) => handleParameterChange("filterFocus", event.target.checked)}
    />
  )
}
