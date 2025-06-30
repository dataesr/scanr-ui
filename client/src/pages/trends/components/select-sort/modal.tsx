import { Button, Container, Listbox, ListboxItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import Modal from "../../../../components/modal"
import useOptions from "../../hooks/useOptions"
import { TRENDS_SORT_CONFIG } from "../../config/sorting"

export default function TrendsSelectSortModal() {
  const intl = useIntl()
  const { currentSort, handleSortChange } = useOptions()
  const id = "trends-options-select-sort-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "trends.select-sort.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <Listbox
          selectedKeys={[currentSort]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleSortChange(selected)
            // @ts-expect-error dsfr does not have types
            window.dsfr(document.getElementById(id)).modal.conceal()
          }}
        >
          {TRENDS_SORT_CONFIG.map((sort) => (
            <ListboxItem key={sort}>{intl.formatMessage({ id: `trends.select-sort.${sort}` })}</ListboxItem>
          ))}
        </Listbox>
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "trends.select-sort.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
