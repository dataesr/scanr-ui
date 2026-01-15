import { Container, Spinner, Text } from "@dataesr/dsfr-plus"
import useCountData from "../../hooks/useCountData"
import { useIntl } from "react-intl"
import useOptions from "../../hooks/useOptions"

export default function NetworkSpinner() {
  const intl = useIntl()
  const { count, isFetching } = useCountData()
  const { parameters } = useOptions()

  return (
    <Container fluid style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!isFetching && count && (
        <Text className="fr-mr-5w fr-mb-0">
          {intl.formatMessage(
            { id: "networks.spinner.count" },
            { count: parameters.sample ? Math.min(10000, count) : count }
          )}
        </Text>
      )}
      <Spinner />
    </Container>
  )
}
