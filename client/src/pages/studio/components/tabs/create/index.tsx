import { useState, useEffect, useCallback } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { useIntl } from "react-intl"
import { Container, Row, Select, SelectOption, TextInput, useDSFRConfig } from "@dataesr/dsfr-plus"
import StudioCreateOptions from "./options"
import { isInProduction } from "../../../../../utils/helpers"
import CopyButton from "../../../../../components/copy/copy-button"
import NetworksIntegration from "../../../../networks/integration"
import TrendsIntegration from "../../../../trends/integration"

const integrationTool = {
  networks: <NetworksIntegration />,
  trends: <TrendsIntegration />,
}

export default function StudioCreate() {
  const intl = useIntl()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { locale: currentLang } = useDSFRConfig()
  const [local, setLocal] = useState<string>(searchParams.get("local") || "130015506") // University of Lorraine
  const [tool, setTool] = useState<string>("networks")
  const [lang, setLang] = useState<string>(currentLang)
  const search = location?.search || ""

  const urlText = useCallback((): string => `${window.location.origin}/${tool}/integration${search}`, [tool, search])

  const iframeText = useCallback((): string => {
    const src = urlText()
    const text = `<iframe height="900" width="900" id="iframe_${tool}_${local}" src="${src}"></iframe>`
    return text
  }, [tool, local, urlText])


  const setOption = (name: string, value: string) => {
    searchParams.set(name, value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local) {
        searchParams.set("local", local)
        setSearchParams(searchParams)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [local, searchParams, setSearchParams])

  return (
    <section className="studio-section-create">
      <TextInput
        type="text"
        hint={intl.formatMessage({ id: "studio.create.identifier.hint" })}
        label={intl.formatMessage({ id: "studio.create.identifier.label" })}
        message={intl.formatMessage({ id: "studio.create.identifier.message" })}
        messageType={local === "" ? "error" : null}
        onChange={(event) => setLocal(event.target.value)}
        required
        value={local}
      />
      <Select
        label={intl.formatMessage({ id: "studio.create.select-lang.label" })}
        selectedKey={lang}
        onSelectionChange={(key) => {
          setLang(String(key))
          setOption("lang", String(key))
        }}
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
      <StudioCreateOptions key={tool} tool={tool} setOption={setOption} />
      <Container className="fr-card fr-my-2w">{integrationTool[tool]}</Container>
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
