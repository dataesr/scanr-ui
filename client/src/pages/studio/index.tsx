import { createIntl, RawIntlProvider } from "react-intl"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { messages } from "./config/messages"
import { StudioContext } from "./context"
import StudioLayout from "./layout"

export default function Trends() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({
    locale,
    messages: messages[locale],
  })

  return (
    <RawIntlProvider value={intl}>
      <StudioContext>
        <StudioLayout />
      </StudioContext>
    </RawIntlProvider>
  )
}
