import { Container, Text, Title } from "@dataesr/dsfr-plus";
import schema from "../../../../../../docs/scanr_persons.json";
import SchemaDocumentation from "../components/schema-documentation";
import useSchema from "../../hooks/useSchema"

export default function PersonsDocs() {
  const { data: personsSchema } = useSchema("scanr-persons")

  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Persons
      </Title>
      <Text>
        This page describes the fields of the <code>persons</code> resource of the ScanR API.
      </Text>
      <SchemaDocumentation schema={personsSchema ?? schema} />
    </Container>
  )
}
