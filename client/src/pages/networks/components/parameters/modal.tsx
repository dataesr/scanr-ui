import { Button, Container } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import InputMaxNodes from "./input-max-nodes"
import InputMaxComponents from "./input-max-components"
import { useIntl } from "react-intl"
import useSearchData from "../../hooks/useSearchData"
import useTab from "../../hooks/useTab"
import useParameters from "../../hooks/useParameters"

export default function NetworkParametersModal() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const {
    search: { isFetching },
  } = useSearchData(currentTab)
  const { resetParameters } = useParameters()

  const id = "networks-options-parameters-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.parameters.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <InputMaxNodes />
        <InputMaxComponents />
        {/* <SelectLayout /> */}
        {/* <SelectClustering /> */}
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Button variant="secondary" onClick={() => resetParameters()}>
            {intl.formatMessage({ id: "networks.parameters.modal.reset" })}
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
          {intl.formatMessage({ id: "networks.parameters.modal.display" })}
        </Button>
      </div>
    </Modal>
  )
}