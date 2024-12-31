import { Tab, Tabs, Container } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import StudioDefine from "./define"
import StudioSubmit from "./submit"
import StudioCreate from "./create"

export default function StudioTabs() {
  const intl = useIntl()

  return (
    <Container>
      <Tabs>
        <Tab label={intl.formatMessage({ id: "studio.tabs.label.define" })}>
          <StudioDefine />
        </Tab>
        <Tab label={intl.formatMessage({ id: "studio.tabs.label.submit" })}>
          <StudioSubmit />
        </Tab>
        <Tab label={intl.formatMessage({ id: "studio.tabs.label.create" })}>
          <StudioCreate />
        </Tab>
      </Tabs>
    </Container>
  )
}
