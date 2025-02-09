import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function TrendsSelectModelButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()
  const { model } = useTrendsContext()

  if (integrationOptions.showSelectModel === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={"book-2-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-model-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `trends.select-model.${model}` })}
    </Button>
  )
}
