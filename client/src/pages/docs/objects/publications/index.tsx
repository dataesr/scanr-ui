import { Container, Text, Title } from '@dataesr/dsfr-plus';
import schema from '../../../../../../docs/scanr_publications.json';
import SchemaDocumentation from '../components/schema-documentation';
import useSchema from "../../hooks/useSchema"


export default function PublicationsDocs() {
  const { data: publiSchema } = useSchema("scanr-publications")

  return (
    <Container className="fr-mb-8w">
      <Title as="h1" look="h3">
        Publications
      </Title>
      <Text>
        This page describes the fields of the <code>publications</code> resource of the ScanR API.
      </Text>
      <SchemaDocumentation schema={publiSchema ?? schema} />
    </Container>
  )
}