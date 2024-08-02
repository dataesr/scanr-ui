import { Container, Badge, Row } from "@dataesr/dsfr-plus"
import { ChatMessages, ChatRole } from "../../../types/chat"

export default function Messages({ messages, isFetching }: { messages: ChatMessages; isFetching: boolean }) {
  console.log("messages", messages)

  const roleColor = (role: ChatRole) => (role === "user" ? "blue-cumulus" : "yellow-tournesol")

  function Fetching({ isFetching }) {
    return isFetching ? (
      <Row>
        <Badge color={roleColor("system")}>...</Badge>
      </Row>
    ) : null
  }

  return (
    <Container>
      {messages.map((message, index) => (
        <Badge color={roleColor(message.role)} key={index}>{`(${message.role}) ${message.content}`}</Badge>
      ))}
      <Fetching isFetching={isFetching} />
    </Container>
  )
}
