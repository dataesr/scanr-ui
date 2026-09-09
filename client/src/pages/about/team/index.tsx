import {
  Breadcrumb,
  Col,
  Container,
  Link,
  Row,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, IntlProvider } from "react-intl";

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

const formating = {
  h2: (chunks: any) => (
    <Title as="h2" look="h4">
      {chunks}
    </Title>
  ),
  br: () => <br />,
  p: (chunks: any) => <p>{chunks}</p>,
  ul: (chunks: any) => <ul>{chunks}</ul>,
  li: (chunks: any) => <li>{chunks}</li>,
  b: (chunks: any) => <b>{chunks}</b>,
  aGazette: (chunks: any) => (
    <a
      href="https://www.lagazettedescommunes.com/510770/participez-aux-trophees-de-lopendata-pour-les-territoires-deuxieme-edition/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aPgp: (chunks: any) => (
    <a
      href="https://www.opengovpartnership.org/fr/documents/france-action-plan-2018-2020/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aEsr: (chunks: any) => (
    <a
      href="https://www.enseignementsup-recherche.gouv.fr/fr/le-plan-national-pour-la-science-ouverte-les-resultats-de-la-recherche-scientifique-ouverts-tous-49241"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aRs: (chunks: any) => (
    <a
      href="https://researchalps.eu/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aEIG: (chunks: any) => (
    <a
      href="https://www.eig.numerique.gouv.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aMit: (chunks: any) => (
    <a
      href="https://direct.mit.edu/qss/article/3/1/18/109245/Identifying-scientific-publications-countrywide"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aWdd: (chunks: any) => (
    <a href="https://wedodata.fr/" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aDsfr: (chunks: any) => (
    <a
      href="https://www.systeme-de-design.gouv.fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aElastic: (chunks: any) => (
    <a href="https://www.elastic.co/" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aCwts: (chunks: any) => (
    <a href="https://www.cwts.nl/" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  ),
  aWos: (chunks: any) => (
    <a
      href="https://www.vosviewer.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aOvh: (chunks: any) => (
    <a
      href="https://www.ovhcloud.com/fr/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  aGit: (chunks: any) => (
    <a
      href="https://github.com/orgs/dataesr/repositories?q=scanr"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  ),
  em: (chunks: any) => <a href="/focus">{chunks}</a>,
};

export default function Team() {
  const { locale } = useDSFRConfig();
  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="fr"
    >
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/">Accueil</Link>
            <Link>
              <FormattedMessage id="app.team.breadcrumb" values={formating} />
            </Link>
          </Breadcrumb>
          <Row className="fr-mb-4w">
            <Title as="h1" look="h3">
              <FormattedMessage id="app.team.h1" values={formating} />
            </Title>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row>
          <Col xs="12" md="8" lg="8" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.project" values={formating} />
          </Col>
          <Col xs="4" xl="4" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="200px"
              height="300px"
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
          </Col>
        </Row>
        <Row>
          <Col xs="4" xl="4" className="search-object fr-mb-5w ">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="250px"
              height="300px"
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
          </Col>
          <Col xs="12" md="8" lg="8" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.scanr" values={formating} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="8" lg="8" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.version" values={formating} />
          </Col>
          <Col xs="4" xl="4" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="300px"
              height="300px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/environment/environment.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/environment/environment.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/environment/environment.svg#artwork-major"
              />
            </svg>
          </Col>
        </Row>
        <Row>
          <Col xs="4" xl="4" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="300px"
              height="200px"
            >
              <use
                className="fr-artwork-decorative"
                href="/artwork/pictograms/environment/tree.svg#artwork-decorative"
              />
              <use
                className="fr-artwork-minor"
                href="/artwork/pictograms/environment/tree.svg#artwork-minor"
              />
              <use
                className="fr-artwork-major"
                href="/artwork/pictograms/environment/tree.svg#artwork-major"
              />
            </svg>
          </Col>
          <Col xs="12" md="8" lg="8" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.topo" values={formating} />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="8" lg="8" xl="8" className="fr-mb-2w">
            <FormattedMessage id="app.team.team" values={formating} />
          </Col>
          <Col xs="4" xl="4" className="search-object fr-mb-5w">
            <svg
              className="fr-artwork"
              aria-hidden="true"
              viewBox="0 0 80 80"
              width="300px"
              height="200px"
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
          </Col>
        </Row>
      </Container>
    </IntlProvider>
  );
}
