import { Button } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"
import useIntegration from "../../hooks/useIntegration"

export default function TrendsSelectSourceButton() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()
  const { source } = useTrendsContext()

  if (integrationOptions.showSelectSource === false) return null

  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon={source === "publications" ? "article-line" : "chat-3-line"}
      iconPosition="left"
      as="button"
      aria-controls="trends-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {intl.formatMessage({ id: `trends.select-source.${source}` })}
    </Button>
  )
}
