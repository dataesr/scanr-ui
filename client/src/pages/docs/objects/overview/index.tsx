import {
  Badge,
  Button,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { createIntl } from "react-intl";

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

export default function Overview() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const urls = {
    organizations: "scanr-organizations",
    publications: "scanr-publications",
    persons: "scanr-persons",
    projects: "scanr-projects",
    patents: "scanr-patents",
  };
  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        {intl.formatMessage({ id: "app.docs.overwiew.title" })}
      </Title>
      <Text>{intl.formatMessage({ id: "app.docs.overwiew.text" })}</Text>
      <Text>
        {intl.formatMessage({ id: "app.docs.overwiew.elastic" })}
        <Link href="https://www.elastic.co/guide/en/elasticsearch/reference/8.11/index.html">
          {intl.formatMessage({ id: "app.docs.overwiew.elastic2" })}
        </Link>
      </Text>
      <Text>
        {intl.formatMessage({ id: "app.docs.overwiew.apimodel.doc" })}
      </Text>
      <Text>{intl.formatMessage({ id: "app.docs.overwiew.indexes" })}</Text>
      <Badge size="sm" variant="info">
        {intl.formatMessage({ id: "app.docs.overwiew.badge.info" })}
      </Badge>
      <Row className="fr-mb-5v fr-mt-3v">
        {Object.entries(urls).map(([key, value]) => (
          <Col>
            <Button
              key={key}
              as="a"
              href={`https://cluster-production.elasticsearch.dataesr.ovh/${value}/_search`}
              variant="tertiary"
              icon="links-line"
              iconPosition="left"
              className="fr-mr-1w"
            >
              {intl.formatMessage({ id: `app.docs.overwiew.${key}.index` })}
            </Button>
          </Col>
        ))}
      </Row>
      <Text>
        {intl.formatMessage({ id: "app.docs.overwiew.indexes.download" })}
      </Text>
      <Badge size="sm" variant="warning">
        {intl.formatMessage({ id: "app.docs.overwiew.badge.warning" })}
      </Badge>
      <div className="fr-mt-3v">
        <Button
          as="a"
          href="https://scanr-data.s3.gra.io.cloud.ovh.net/production/manifest_scanr.json"
          variant="tertiary"
          icon="file-text-line"
          iconPosition="left"
        >
          {intl.formatMessage({ id: "app.docs.overwiew.manifest" })}
        </Button>
      </div>
    </Container>
  );
}
