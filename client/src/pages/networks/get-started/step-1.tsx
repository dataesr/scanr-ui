import { Button, Container, Row, SearchBar, Text } from "@dataesr/dsfr-plus"
import { useFormContext } from "./context"

export default function Step1({ onNext }) {
  const { query, setQuery } = useFormContext()

  const onSearch = (query: string) => {
    setQuery(query)
    onNext()
  }

  return (
    <Container>
      <Row horizontalAlign="center">
        <Text size="lead">What are you looking for ?</Text>
      </Row>
      <SearchBar placeholder="science" onSearch={onSearch} />
      <Text size="sm" className="fr-mt-5w">
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
        voluptates repudiandae sint et molestiae non recusandae.
      </Text>
    </Container>
  )
}
