import { Col, Container, Row, Text } from "@dataesr/dsfr-plus"
import { useFormContext } from "./context"

function NetworkCard({ title, onCardClick }) {
  return (
    <div className="fr-card fr-enlarge-link" style={{ width: "250px", height: "200px" }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            <a href="#" onClick={() => onCardClick(title.toLowerCase())}>
              {title}
            </a>
          </h3>
          <p className="fr-card__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        </div>
      </div>
    </div>
  )
}

export default function Step2({ onNext }) {
  const { setTab } = useFormContext()

  const onCardClick = (value: string) => {
    setTab(value)
    onNext()
  }

  return (
    <Container>
      <Row horizontalAlign="center">
        <Text size="lead">What kind of network ?</Text>
        <Text size="sm">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi.
        </Text>
      </Row>
      <Row horizontalAlign="center">
        <Col sm="4">
          <NetworkCard title="Authors" onCardClick={onCardClick} />
        </Col>
        <Col sm="4">
          <NetworkCard title="Structures" onCardClick={onCardClick} />
        </Col>
        <Col sm="4">
          <NetworkCard title="Topics" onCardClick={onCardClick} />
        </Col>
      </Row>
      <Row horizontalAlign="center">
        <Col sm="4">
          <NetworkCard title="Software" onCardClick={onCardClick} />
        </Col>
        <Col sm="4">
          <NetworkCard title="Projects" onCardClick={onCardClick} />
        </Col>
        <Col sm="4">
          <NetworkCard title="Countries" onCardClick={onCardClick} />
        </Col>
      </Row>
    </Container>
  )
}
