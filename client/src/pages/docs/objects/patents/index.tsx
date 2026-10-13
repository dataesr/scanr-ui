import { Container, Text, Title } from "@dataesr/dsfr-plus"
import SchemaDocumentation from "../components/schema-documentation"
import useSchema from "../../hooks/useSchema"

export default function PublicationsDocs() {
  const { data: patSchema } = useSchema("scanr-patents")

  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Patents
      </Title>
      <Text>
        This page describes the fields of the <code>patents</code> resource of the ScanR API.
      </Text>
      {patSchema && <SchemaDocumentation schema={patSchema} />}
    </Container>
  )
}
