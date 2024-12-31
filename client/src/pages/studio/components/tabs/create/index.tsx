import { useState } from "react"
import { Button, Col, Row, Select, SelectOption, TextInput, Toggle } from "@dataesr/dsfr-plus"

export default function StudioCreate() {
  const [bsoLocalAffiliation, setBsoLocalAffiliation] = useState("130015506") // University of Lorraine
  const [displayComment, setDisplayComment] = useState(true)
  const [displayFooter, setDisplayFooter] = useState(true)
  const [displayTitle, setDisplayTitle] = useState(false)
  const [endYear, setEndYear] = useState("2022")
  const [firstObservationYear, setFirstObservationYear] = useState("2018")
  const [lang, setLang] = useState("fr")
  const [lastObservationYear, setLastObservationYear] = useState()
  const [object, setObject] = useState("publi")
  const [startYear, setStartYear] = useState("2013")
  const [tab, setTab] = useState("general")
  const [useHalId, setUseHalId] = useState(false)

  const langs = [
    { label: "Français", value: "fr" },
    { label: "Anglais", value: "en" },
  ]

  return (
    <section className="studio-section-create">
      <Row gutters>
        <Col md={6}>
          <TextInput
            hint="Si périmètre ad-hoc, identifiant communiqué par l'équipe BSO ou RoR. Dans tous les cas, identifiant de structure HAL, ou code collection HAL"
            label="Identifiant de l'établissement"
            message="Merci de saisir un identifiant"
            messageType={bsoLocalAffiliation === "" ? "error" : null}
            onChange={(e) => setBsoLocalAffiliation(e.target.value)}
            required
            value={bsoLocalAffiliation}
          />
        </Col>
        <Col md={6}>
          <Select label="Langue" onSelectionChange={(e) => setLang(String(e))}>
            {langs.map((lang) => (
              <SelectOption key={lang.value}>{lang.label}</SelectOption>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutters>
        <Col md={6}>
          <Select label="Objet de recherche">{}</Select>
        </Col>
        <Col md={6}>
          <Select label="Onglet">{}</Select>
        </Col>
      </Row>
      <Row gutters>
        <Col md={12}>
          <Select label="Graphique">{}</Select>
        </Col>
      </Row>
      <Row gutters>
        <Col md={6}>
          <Select label="Première année de publication">{}</Select>
        </Col>
        <Col md={6}>
          <Select label="Dernière année de publication">{}</Select>
        </Col>
      </Row>
      <Row gutters>
        <Col md={6}>
          <Select label="Première année d'observation">{}</Select>
        </Col>
        <Col md={6}>
          <Select label="Dernière année d'observation">{}</Select>
        </Col>
      </Row>
      <hr />
      <Row gutters>
        <Col md={6}>
          <Toggle
            checked={displayTitle}
            label="Afficher le titre du graphique"
            onChange={() => setDisplayTitle(!displayTitle)}
          />
        </Col>
        <Col md={6}>
          <Toggle
            checked={displayComment}
            label="Afficher le commentaire du graphique"
            onChange={() => setDisplayComment(!displayComment)}
          />
        </Col>
      </Row>
      <hr />
      <Row gutters>
        <Col md={6}>
          <Toggle
            checked={displayFooter}
            label="Afficher le footer du graphique"
            onChange={() => setDisplayFooter(!displayFooter)}
          />
        </Col>
        {object === "publi" && (
          <Col md={6}>
            <Toggle checked={useHalId} label="Inclure les identifiants de HAL" onChange={() => setUseHalId(!useHalId)} />
          </Col>
        )}
      </Row>
      <Row gutters>
        <Col className="studio">{}</Col>
      </Row>
      <Row gutters>
        <Col>
          <TextInput
            disabled
            hint="À copier/coller sur votre page web"
            label="Code de l'iframe"
            type="text"
            value={"test"}
          />
        </Col>
      </Row>
      <Row gutters>
        <Col md={6}>
          {/* <CopyToClipboard text={getIframeText()}> */}
          <Button icon="clipboard-fill" iconPosition="right">
            Copier le code de l'iframe
          </Button>
          {/* </CopyToClipboard> */}
        </Col>
        <Col md={6}>
          {/* <CopyToClipboard text={getGraphUrl()}> */}
          <Button icon="clipboard-fill" iconPosition="right">
            Copier l'url
          </Button>
          {/* </CopyToClipboard> */}
        </Col>
      </Row>
      <Row gutters>
        <Col md={6}>
          <Button icon="download-fill" iconPosition="right" onClick={() => {}}>
            Télécharger la liste des urls des graphiques (.csv)
          </Button>
        </Col>
        <Col md={6}>
          <Button icon="download-fill" iconPosition="right" onClick={() => {}}>
            Télécharger la liste des graphiques (.html)
          </Button>
        </Col>
      </Row>
    </section>
  )
}
