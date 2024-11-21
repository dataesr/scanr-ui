import { Suspense } from "react"
import { createIntl, RawIntlProvider } from "react-intl"
import { messages } from "../config/messages"
import useIntegration from "../hooks/useIntegration"
import { NetworkContext } from "../context"
import NetworksLayout from "../layout"

export default function NetworksIntegration() {
  const { integrationId, integrationLang: locale } = useIntegration()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })

  if (!integrationId) return "ERROR: Integration local ID not defined!"

  return (
    <RawIntlProvider value={intl}>
      <Suspense>
        <NetworkContext>
          <NetworksLayout />
        </NetworkContext>
      </Suspense>
    </RawIntlProvider>
  )
}
