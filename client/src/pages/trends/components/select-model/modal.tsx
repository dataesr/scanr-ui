import { Button, Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import Modal from "../../../../components/modal"
import useOptions from "../../hooks/useOptions"

export default function TrendsSelectModelModal() {
  const intl = useIntl()
  const { currentModel, handleModelChange } = useOptions()
  const id = "trends-options-select-model-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.select-model.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <Listbox
          selectedKeys={[currentModel]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleModelChange(selected)
          }}
        >
          <ListboxItem
            key={"entity-fishing"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.entity-fishing.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.entity-fishing" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-topics"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-topics.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-topics" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-subfields"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-subfields.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-subfields" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-fields"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-fields.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-fields" })}
          </ListboxItem>
          <ListboxItem
            key={"open-alex-domains"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-book-2-line`} />}
            description={intl.formatMessage({ id: "trends.select-model.open-alex-domains.description" })}
          >
            {intl.formatMessage({ id: "trends.select-model.open-alex-domains" })}
          </ListboxItem>
        </Listbox>
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "trends.select-model.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
