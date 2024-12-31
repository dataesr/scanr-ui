import { Button, Col, Container, FileUpload, Notice, Row, TextInput } from "@dataesr/dsfr-plus"
import "./styles.scss"

export default function StudioSubmit() {
  const email = ""
  const name = ""
  const acronym = ""
  const id = ""
  const ror = ""

  const message = ""
  const isError = null

  const previousDoiCount = 0
  const doiCount = 0
  const halCollCodeCount = 0
  const halIdCount = 0
  const halStructIdCount = 0
  const nntEtabCount = 0
  const nntIdCount = 0

  return (
    <Container>
      <section className="color-blue-dark-125 content mb-20">
        <Row gutters>
          <Col lg={8}>
            <div>
              Vous pouvez nous envoyer votre fichier tout au long de l'année. Les dates de constitution et d'envoi de ce
              fichier n'ont pas d'incidence sur les graphiques générés car ceux-ci reposent sur des "snapshots" des outils
              utilisés (Unpaywall, PubMed...).
            </div>
            <br />
            <form onSubmit={() => {}}>
              <TextInput
                autoComplete="email"
                autoFocus
                label="Email de contact"
                onChange={(e) => console.log(e.target.value)}
                required
                type="email"
                value={email}
              />
              <TextInput label="Nom de la structure" onChange={(e) => console.log(e.target.value)} required value={name} />
              <TextInput label="Acronyme de la structure" onChange={(e) => console.log(e.target.value)} value={acronym} />
              <TextInput
                hint="Utiliser https://scanr.enseignementsup-recherche.gouv.fr/search/organizations pour trouver le Siren de la structure"
                label="Siren ou RNSR de la structure"
                onChange={(e) => console.log(e)}
                value={id}
              />
              {!!previousDoiCount && (
                <div className="text-green">
                  Le précédent baromètre local de cette structure comptait <b>{previousDoiCount} lignes</b>.
                </div>
              )}
              <TextInput
                hint="Utiliser https://ror.org/ pour trouver le RoR de la structure"
                label="RoR de la structure"
                onChange={(e) => console.log(e.target.value)}
                value={ror}
              />
              <FileUpload
                hint="Fichier Excel, ODS ou CSV (séparateur point virgule ;). Merci d'inclure une ligne d'en-têtes avec les noms de colonnes, comme dans le fichier exemple."
                label="Fichier de publications"
                onChange={() => {}}
              />
              {message && (
                <span className={isError ? "text-red" : "text-green"}>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                </span>
              )}

              {!!(doiCount || halCollCodeCount || halIdCount || halStructIdCount || nntEtabCount || nntIdCount) && (
                <div>
                  Ce fichier contient :
                  <ul>
                    {!!doiCount && <li>{`${doiCount} DOI`}</li>}
                    {!!halCollCodeCount && <li>{`${halCollCodeCount} hal_coll_code`}</li>}
                    {!!halIdCount && <li>{`${halIdCount} hal_id`}</li>}
                    {!!halStructIdCount && <li>{`${halStructIdCount} hal_struct_id`}</li>}
                    {!!nntEtabCount && <li>{`${nntEtabCount} nnt_etab`}</li>}
                    {!!nntIdCount && <li>{`${nntIdCount} nnt_id`}</li>}
                  </ul>
                </div>
              )}
              <Button
                className="fr-mt-4w"
                icon="send-plane-fill"
                iconPosition="right"
                disabled={email?.length === 0 || name?.length === 0 || isError}
              >
                Envoyer
              </Button>
              {(email?.length === 0 || name?.length === 0 || isError) && (
                <Notice className="fr-mt-2w" type="warning" closeMode="disallow">
                  Veuillez remplir les champs email et nom ou corriger les erreurs.
                </Notice>
              )}
            </form>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
