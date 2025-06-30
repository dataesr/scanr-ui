import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import useScreenSize from "../../../../hooks/useScreenSize"

export default function TrendsSelectSortButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const { integrationOptions } = useIntegration()

  if (integrationOptions.showSelectSort === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      as="button"
      icon={"sort-desc"}
      aria-controls="trends-options-select-sort-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {["xs", "sm"].includes(screen) ? null : intl.formatMessage({ id: `trends.select-sort.button.label` })}
    </Button>
  )
}
