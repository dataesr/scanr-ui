import {
  useDSFRConfig,
  Breadcrumb,
  Link,
  Col,
  Container,
  Row,
  Title,
} from "@dataesr/dsfr-plus";
import { IntlProvider, createIntl } from "react-intl";
import "./styles.scss";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function Resources() {
  const { locale } = useDSFRConfig();

  const intl = createIntl({ locale, messages: messages[locale] });
  if (!messages) return null;

  return (
    <IntlProvider messages={messages} locale="fr" defaultLocale="fr">
      <Container>
        <Breadcrumb>
          <Link href="/">Accueil</Link>
          <Link>
            {intl.formatMessage({ id: "app.resources.breadcrumb.current" })}
          </Link>
        </Breadcrumb>
        <Row className="bordered-row ">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/digital/search.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/digital/search.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/digital/search.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({ id: "app.resources.ref" })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/doi"
            >
              <img src="/img/logo/logo-doi.svg" alt="Logo doi" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/grid"
            >
              <img src="/img/logo/logo-grid.svg" alt="Logo grid" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/insee"
            >
              <img src="/img/logo/logo-insee.svg" alt="Logo insee" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/rnsr"
            >
              <img src="/img/logo/logo-rnsr.svg" alt="Logo rnsr" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/idref"
            >
              <img src="/img/logo/logo-idref.png" alt="Logo idref" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/orcid"
            >
              <img src="/img/logo/logo-orcid.svg" alt="Logo orcid" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/wikidata"
            >
              <img src="/img/logo/logo-wikidata.svg" alt="Logo wikidata" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/cpc"
            >
              <img src="/img/logo/logo-cpc.jpg" alt="Logo cpc" />
            </Link>
          </Col>
        </Row>
        <Row className="bordered-row ">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/digital/data-visualization.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/digital/data-visualization.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/digital/data-visualization.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({ id: "app.resources.source" })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/unpaywall"
            >
              <img src="/img/logo/logo-unpaywall.png" alt="Logo unpaywall" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/sudoc"
            >
              <img src="/img/logo/logo-sudoc.jpg" alt="Logo sudoc" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/thesesfr"
            >
              <img src="/img/logo/logo-thesesfr.svg" alt="Logo thesesfr" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/bso"
            >
              <img src="/img/logo/logo-bso.svg" alt="Logo bso" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/hal"
            >
              <img src="/img/logo/logo-hal.svg" alt="Logo hal" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/wikipedia"
            >
              <img src="/img/logo/logo-wikipedia.svg" alt="Logo wikipedia" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/opendata"
            >
              <img src="/img/logo/logo-opendata.svg" alt="Logo opendata" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/europe"
            >
              <img src="/img/logo/logo-europe.svg" alt="Logo europe" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/hceres"
            >
              <img src="/img/logo/logo-hceres.png" alt="Logo hceres" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/inpi"
            >
              <img src="/img/logo/logo-inpi.svg" alt="Logo inpi" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/patstat"
            >
              <img src="/img/logo/logo-patstat.gif" alt="Logo patstat" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/core"
            >
              <img src="/img/logo/logo-core.png" alt="Logo core" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/swh"
            >
              <img src="/img/logo/logo-swh.jpg" alt="Logo swh" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/datainfogreffe"
            >
              <img
                src="/img/logo/logo-datainfogreffe.svg"
                alt="Logo datainfogreffe"
              />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/casdar"
            >
              <img src="/img/logo/logo-casdar.png" alt="Logo casdar" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/anr"
            >
              <img src="/img/logo/logo-anr.svg" alt="Logo anr" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/phc"
            >
              <img src="/img/logo/logo-phc.svg" alt="Logo phc" />
            </Link>
          </Col>
        </Row>
        <Row horizontalAlign="center" className="bordered-row">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/digital/internet.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/digital/internet.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/digital/internet.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({ id: "app.resources.indirect.source" })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/pubmed"
            >
              <img src="/img/logo/logo-pubmed.svg" alt="Logo pubmed" />
            </Link>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/arxiv"
            >
              <img src="/img/logo/logo-arxiv.svg" alt="Logo arxiv" />
            </Link>
          </Col>
        </Row>
        <hr className="fr-pb-2w" />
        <Row horizontalAlign="center" className="bordered-row">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/system/system.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/system/system.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/system/system.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({ id: "app.resources.tools" })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="solo-centered-col">
            <Link
              className="fr-footer__bottom-link"
              href="/about/resources/adg"
            >
              <img src="/img/logo/logo-adresse-data-gouv.svg" alt="Logo adg" />
            </Link>
          </Col>
        </Row>
        <Row className="bordered-row">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/environment/human-cooperation.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/environment/human-cooperation.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/environment/human-cooperation.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({ id: "app.resources.contributors" })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="solo-centered-col">
            <img src="/img/logo/logo-3cr.svg" alt="Logo 3cr" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-afssi.svg" alt="Logo afssi" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-asrc.svg" alt="Logo asrc" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-simv.svg" alt="Logo simv" />
          </Col>
        </Row>
        <Row className="bordered-row">
          <Col xs="12" lg="12" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="150px"
              height="100px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/digital/search.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/digital/search.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/digital/search.svg#artwork-major"
              />
            </svg>
            <Title as="h5" className="fr-mb-1w">
              {intl.formatMessage({
                id: "app.resources.intervenants.contributors",
              })}
            </Title>
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-inrae.svg" alt="Logo inrae" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-inria.svg" alt="Logo inria" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-cnrs.svg" alt="Logo cnrs" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-onera.png" alt="Logo onera" />
          </Col>
          <Col xs="3" lg="3" className="centered-col">
            <img src="/img/logo/logo-cea.svg" alt="Logo cea" />
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
