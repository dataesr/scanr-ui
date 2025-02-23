import { useState } from "react"
import { useIntl } from "react-intl"
import { Container, Row, Select, SelectOption, TextInput, useDSFRConfig } from "@dataesr/dsfr-plus"
import StudioCreateOptions from "./options"
import { isInProduction } from "../../../../../utils/helpers"
import CopyButton from "../../../../../components/copy/copy-button"

export default function StudioCreate() {
  const intl = useIntl()
  const { locale } = useDSFRConfig()
  const [local, setLocal] = useState("130015506") // University of Lorraine
  const [tool, setTool] = useState("networks")
  const [lang, setLang] = useState(locale)
  const [options, setOptions] = useState("")

  const pageUrl = `${window.location.origin}/${tool}/integration?lang=${lang}&local=${local}${options}`
  const integrationIframeId = `iframe_${tool}_${local}`
  const integrationIframe = <iframe height="900px" width="100%" id={integrationIframeId} src={pageUrl} />

  const iframeText = (): string => {
    const src = (document.getElementById(integrationIframeId) as HTMLIFrameElement)?.contentWindow.location.href
    const text = `<iframe height="900" width="900" id="${integrationIframeId}" src="${src}"></iframe>`
    return text
  }

  const urlText = (): string => {
    const text = (document.getElementById(integrationIframeId) as HTMLIFrameElement)?.contentWindow.location.href
    return text
  }

  return (
    <section className="studio-section-create">
      <TextInput
        hint={intl.formatMessage({ id: "studio.create.identifier.hint" })}
        label={intl.formatMessage({ id: "studio.create.identifier.label" })}
        message={intl.formatMessage({ id: "studio.create.identifer.message" })}
        messageType={local === "" ? "error" : null}
        onChange={(event) => setLocal(event.target.value)}
        required
        value={local}
      />
      <Select
        label={intl.formatMessage({ id: "studio.create.select-lang.label" })}
        selectedKey={lang}
        onSelectionChange={(key) => setLang(String(key))}
      >
        <SelectOption key={"fr"}>{intl.formatMessage({ id: "studio.create.lang.fr" })}</SelectOption>
        <SelectOption key={"en"}>{intl.formatMessage({ id: "studio.create.lang.en" })}</SelectOption>
      </Select>
      <Select
        label={intl.formatMessage({ id: "studio.create.select-tool.label" })}
        selectedKey={tool}
        onSelectionChange={(key) => setTool(String(key))}
      >
        <SelectOption key="networks">{intl.formatMessage({ id: "studio.create.tool.networks" })}</SelectOption>
        {!isInProduction() && (
          <SelectOption key="trends">{intl.formatMessage({ id: "studio.create.tool.trends" })}</SelectOption>
        )}
      </Select>
      <StudioCreateOptions key={tool} tool={tool} setOptions={setOptions} />
      <Container className="fr-my-2w fr-card studio">{integrationIframe}</Container>
      <Row horizontalAlign="center">
        <CopyButton className="fr-mb-2w" icon="clipboard-fill" iconPosition="right" copyTextOnClick={() => iframeText()}>
          {intl.formatMessage({ id: "studio.create.copy-iframe.label" })}
        </CopyButton>
        <CopyButton
          className="fr-mb-2w fr-ml-2w"
          icon="clipboard-fill"
          iconPosition="right"
          copyTextOnClick={() => urlText()}
        >
          {intl.formatMessage({ id: "studio.create.copy-url.label" })}
        </CopyButton>
      </Row>
    </section>
  )
}
