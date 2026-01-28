import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import { NETWORK_PARAMETERS } from "../../../config/parameters"
import { useNetworkContext } from "../../../context"

export default function InputMaxComponents() {
  const intl = useIntl()
  const {
    options: {
      parameters: { maxComponents },
      handleParameterChange,
    },
  } = useNetworkContext()
  const [input, setInput] = useState<number>(maxComponents)
  const defaultValues = NETWORK_PARAMETERS["maxComponents"]

  useEffect(() => {
    const timer = setTimeout(() => {
      input !== maxComponents &&
        input >= defaultValues.min &&
        input <= defaultValues.max &&
        handleParameterChange("maxComponents", input)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-components.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-components.hint" })}
      type="number"
      min={defaultValues.min}
      max={defaultValues.max}
      value={input}
      onChange={(event) => setInput(Number(event.target.value))}
    />
  )
}
