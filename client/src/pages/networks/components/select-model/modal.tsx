import { Button, Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { NETWORK_MODELS } from "../../config/models"
import { useIntl } from "react-intl"
import { useNetworkContext } from "../../context"

export default function NetworkSelectModelModal() {
  const intl = useIntl()
  const {
    options: { currentModel, currentSource, handleModelChange },
  } = useNetworkContext()
  const id = "networks-options-select-model-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-model.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <Listbox
          selectedKeys={[currentModel]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleModelChange(selected)
            document.dispatchEvent(new CustomEvent("modal:close", { detail: { id } }))
          }}
        >
          {NETWORK_MODELS[currentSource].map(({ label, icon }) => (
            <ListboxItem
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
              key={label}
              description={intl.formatMessage({ id: `networks.model.${label}.description` })}
            >
              {intl.formatMessage({ id: `networks.model.${label}` })}
            </ListboxItem>
          ))}
        </Listbox>
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "networks.select-model.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
