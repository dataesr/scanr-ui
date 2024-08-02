import { Container, Row, Text } from "@dataesr/dsfr-plus"
import { ChatMessage, ChatMessages } from "../../../types/chat"

function Message({ message }: { message: ChatMessage }) {
  const horizontalAlign = message.role === "user" ? "right" : "left"

  return (
    <Row horizontalAlign={horizontalAlign}>
      <Text
        style={{
          fontSize: "15px",
          whiteSpace: "pre-line",
          borderRadius: "0.7em",
          padding: "0.5em",
          backgroundColor: message.role === "user" ? "#417DC4" : "#C8AA39",
          color: "#fff",
        }}
      >
        {message.content}
      </Text>
    </Row>
  )
}

export default function Messages({ messages, isFetching }: { messages: ChatMessages; isFetching: boolean }) {
  function Fetching() {
    return isFetching ? <Message message={{ role: "assistant", content: ". . ." }} /> : null
  }

  return (
    <Container>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <Fetching />
    </Container>
  )
}
