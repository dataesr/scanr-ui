import { Container, Badge, Row } from "@dataesr/dsfr-plus"
import { ChatMessages, ChatRole } from "../../../types/chat"

export default function Messages({ messages, isFetching }: { messages: ChatMessages; isFetching: boolean }) {
  const roleColor = (role: ChatRole) => (role === "user" ? "blue-cumulus" : "yellow-tournesol")

  function Fetching() {
    return isFetching ? (
      <Row>
        <Badge className="fr-mb-1w" color={roleColor("assistant")}>
          ...
        </Badge>
      </Row>
    ) : null
  }

  return (
    <Container>
      {messages.map((message, index) => (
        <Row key={index}>
          <Badge
            className="fr-mb-1w"
            color={roleColor(message.role)}
            key={index}
          >{`(${message.role}) ${message.content}`}</Badge>
        </Row>
      ))}
      <Fetching />
    </Container>
  )
}
