import { Button, Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import ToggleNormalize from "./toggle-normalize"
import { useIntl } from "react-intl"
import useTrends from "../../hooks/useTrends"
import useOptions from "../../hooks/useOptions"

export default function TrendsParametersModal() {
  const intl = useIntl()
  const { isFetching } = useTrends()
  const { setNormalized } = useOptions()

  const resetParameters = () => setNormalized(true)

  const id = "trends-options-parameters-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.parameters.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pt-4w">
        <ToggleNormalize />
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Button variant="secondary" onClick={() => resetParameters()}>
            {intl.formatMessage({ id: "trends.parameters.modal.reset" })}
          </Button>
        </div>
        <Button
          disabled={isFetching}
          onClick={() => {
            const element = document.getElementById(id)
            // @ts-expect-error dsfr does not have types
            window.dsfr(element).modal.conceal()
          }}
        >
          {intl.formatMessage({ id: "trends.parameters.modal.display" })}
        </Button>
      </div>
    </Modal>
  )
}
