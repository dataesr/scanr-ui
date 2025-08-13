import { Container, Title } from "@dataesr/dsfr-plus"

type TrendsCardProps = {
  data: any
  title: string
}
export default function TrendsCard({ data, title }: TrendsCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <div>{data}</div>
    </Container>
  )
}
