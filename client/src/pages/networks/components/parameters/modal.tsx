import { Button, Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import { useIntl } from "react-intl"
import ToggleSample from "./toggle-sample"
import { useNetworkContext } from "../../context"
import ToggleFilterFocus from "./toggle-filter-focus"

export default function NetworkParametersModal() {
  const intl = useIntl()
  const {
    options: { resetParameters },
  } = useNetworkContext()

  const id = "networks-options-parameters-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.parameters.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <ToggleSample />
        <InputMaxNodes />
        <InputMaxComponents />
        <ToggleFilterFocus />
        {/* <SelectLayout /> */}
        {/* <SelectClustering /> */}
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Button variant="secondary" onClick={() => resetParameters()}>
            {intl.formatMessage({ id: "networks.parameters.modal.reset" })}
          </Button>
        </div>
        <Button aria-controls={id}>{intl.formatMessage({ id: "networks.parameters.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
