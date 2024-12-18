import { useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import getBsoLocals from "../../integration/config"
import { Container, Notice, Title } from "@dataesr/dsfr-plus"
import IconLink from "../../../../components/icon-link"
import useTab from "../../hooks/useTab"

export default function NetworkTitle() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { integrationId, integrationOptions } = useIntegration()
  const { showTitle, showSubtitle } = integrationOptions

  if (showTitle === false && showSubtitle === false) return null

  const locals = integrationId ? getBsoLocals() : {}
  const comment: string =
    (intl.locale === "en" ? locals?.[integrationId]?.commentsNameEN : locals?.[integrationId]?.commentsName) ||
    (integrationId ? `${intl.formatMessage({ id: "networks.header.title.perimeter" })} ${integrationId}` : "")

  return (
    <Container fluid className="fr-mb-2w">
      {showTitle && (
        <Title as="h4" className="fr-mb-1w">
          {intl.formatMessage(
            { id: "networks.header.title" },
            { tab: intl.formatMessage({ id: `networks.tab.of.${currentTab}` }) }
          )}{" "}
          {comment}
        </Title>
      )}
      {showSubtitle && (
        <Notice type="info" closeMode="disallow">
          {intl.formatMessage({ id: "networks.header.subtitle" })}{" "}
          <IconLink
            href="/about/FAQ?question=q58"
            icon="question-line"
            title={intl.formatMessage({ id: "networks.header.subtitle-hover" })}
            target="_blank"
          />
        </Notice>
      )}
    </Container>
  )
}
