import { useState } from "react"
import { Accordion, Button, Col, Row, Select, SelectOption, TextInput, Toggle } from "@dataesr/dsfr-plus"
import NetworkSearchBarButton from "../../../../networks/components/search-bar/button"
import NetworkSelectModelButton from "../../../../networks/components/select-model/button"
import NetworkFiltersButton from "../../../../networks/components/filters/button"
import NetworkParametersButton from "../../../../networks/components/parameters/button"

export default function StudioCreate() {
  const [local, setLocal] = useState("130015506") // University of Lorraine
  const [page, setPage] = useState("networks")
  const [lang, setLang] = useState("fr")
  const [code, setCode] = useState("")

  const pageUrl = `${window.location.origin}/${page}/integration?local=${local}`

  const langs = [
    { label: "Français", value: "fr" },
    { label: "Anglais", value: "en" },
  ]

  return (
    <section className="studio-section-create">
      <Row gutters>
        <Col lg={8}>
          <TextInput
            hint="Si périmètre ad-hoc, identifiant communiqué par l'équipe BSO ou RoR. Dans tous les cas, identifiant de structure HAL, ou code collection HAL"
            label="Identifiant de l'établissement"
            message="Merci de saisir un identifiant"
            messageType={local === "" ? "error" : null}
            onChange={(event) => setLocal(event.target.value)}
            required
            value={local}
          />
          <Select label="Langue" selectedKey={lang} onSelectionChange={(key) => setLang(String(key))}>
            {langs.map((lang) => (
              <SelectOption key={lang.value}>{lang.label}</SelectOption>
            ))}
          </Select>
          <Select label="Integration page" selectedKey={page} onSelectionChange={(key) => setPage(String(key))}>
            <SelectOption key="networks">Réseaux</SelectOption>
            <SelectOption key="trends">Tendances</SelectOption>
          </Select>
          <Accordion title="Paramétrage">
            <Row className="fr-mb-4w">
              <NetworkSearchBarButton />
              <NetworkSelectModelButton />
              <NetworkFiltersButton />
              <NetworkParametersButton />
            </Row>
          </Accordion>
          <Accordion title="Options d'affichage"></Accordion>
        </Col>
      </Row>
      <Row gutters>
        <Col lg={8} className="studio">
          {" "}
          <iframe height="600" width="100%" id={"integration_iframe"} src={pageUrl} title={"test"} />
          <Button
            onClick={() =>
              setCode((document.getElementById("integration_iframe") as HTMLIFrameElement).contentWindow.location.href)
            }
          >
            Générer le code de l'iframe
          </Button>
          {code && (
            <TextInput
              disabled
              hint="À copier/coller sur votre page web"
              label="Code de l'iframe"
              type="text"
              value={code}
            />
          )}
        </Col>
      </Row>
      <Row gutters>
        <Col md={4}>
          {/* <CopyToClipboard text={getIframeText()}> */}
          <Button icon="clipboard-fill" iconPosition="right">
            Copier le code de l'iframe
          </Button>
          {/* </CopyToClipboard> */}
        </Col>
        <Col md={4}>
          {/* <CopyToClipboard text={getGraphUrl()}> */}
          <Button icon="clipboard-fill" iconPosition="right">
            Copier l'url
          </Button>
          {/* </CopyToClipboard> */}
        </Col>
      </Row>
    </section>
  )
}
