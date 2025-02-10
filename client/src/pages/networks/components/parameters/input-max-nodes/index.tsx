import { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { TextInput } from "@dataesr/dsfr-plus"
import useOptions from "../../../hooks/useOptions"
import { NETWORK_PARAMETERS } from "../../../config/parameters"

export default function InputMaxNodes() {
  const intl = useIntl()
  const {
    parameters: { maxNodes },
    handleParameterChange,
  } = useOptions()
  const [input, setInput] = useState<number>(maxNodes)
  const defaultValues = NETWORK_PARAMETERS["maxNodes"]

  useEffect(() => {
    const timer = setTimeout(() => {
      input !== maxNodes &&
        input >= defaultValues.min &&
        input <= defaultValues.max &&
        handleParameterChange("maxNodes", input)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <TextInput
      label={intl.formatMessage({ id: "networks.parameters.input-max-nodes.label" })}
      hint={intl.formatMessage({ id: "networks.parameters.input-max-nodes.hint" })}
      type="number"
      min={defaultValues.min}
      max={defaultValues.max}
      value={input}
      onChange={(event) => setInput(Number(event.target.value))}
    />
  )
}
