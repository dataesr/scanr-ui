import { Container, Text, Title } from "@dataesr/dsfr-plus"
import SchemaDocumentation from "../components/schema-documentation"
import useSchema from "../../hooks/useSchema"

export default function PublicationsDocs() {
  const { data: partSchema } = useSchema("scanr-participations")

  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Projects participations
      </Title>
      <Text>
        This page describes the fields of the <code>participations</code> resource of the ScanR API.
      </Text>
      {partSchema && <SchemaDocumentation schema={partSchema} />}
    </Container>
  )
}
