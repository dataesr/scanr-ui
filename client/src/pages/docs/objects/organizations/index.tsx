import { Container, Text, Title } from "@dataesr/dsfr-plus";
import schema from "../../../../../../docs/scanr_organizations.json";
import SchemaDocumentation from "../components/schema-documentation";
import useSchema from "../../hooks/useSchema"

export default function OrganizationsDocs() {
  const { data: orgSchema } = useSchema("scanr-organizations")

  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Organizations
      </Title>
      <Text>
        This page describes the fields of the <code>organizations</code> resource of the ScanR API.
      </Text>
      <SchemaDocumentation schema={orgSchema ?? schema} />
    </Container>
  )
}
