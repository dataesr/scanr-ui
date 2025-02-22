import { Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import Modal from "../../../../components/modal"
import useOptions from "../../hooks/useOptions"

export default function TrendsSelectSourceModal() {
  const intl = useIntl()
  const { currentSource, handleSourceChange } = useOptions()
  const id = "trends-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.select-source.modal.title" })}>
      <Container fluid className="fr-mb-4w">
        <Listbox
          selectedKeys={[currentSource]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleSourceChange(selected)
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          <ListboxItem
            key={"publications"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-article-line`} />}
            description={intl.formatMessage({ id: "trends.select-source.publications.description" })}
          >
            {intl.formatMessage({ id: "trends.select-source.publications" })}
          </ListboxItem>
          <ListboxItem
            key={"citations"}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-chat-3-line`} />}
            description={intl.formatMessage({ id: "trends.select-source.citations.description" })}
          >
            {intl.formatMessage({ id: "trends.select-source.citations" })}
          </ListboxItem>
        </Listbox>
      </Container>
    </Modal>
  )
}
