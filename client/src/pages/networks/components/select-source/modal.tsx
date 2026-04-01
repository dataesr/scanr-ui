import { Button, Container, Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import Modal from "../../../../components/modal"
import { useIntl } from "react-intl"
import { NETWORK_SOURCES } from "../../config/sources"
import { useNetworkContext } from "../../context"

export default function NetworkSelectSourceModal() {
  const intl = useIntl()
  const {
    options: { currentSource, handleSourceChange },
    integration,
  } = useNetworkContext()
  const id = "networks-options-select-source-modal"

  return (
    <Modal id={id} size="lg" title={intl.formatMessage({ id: "networks.select-source.modal.title" })}>
      <Container fluid className="fr-mb-4w fr-pb-4w">
        <Listbox
          selectedKeys={[currentSource]}
          selectionMode="single"
          onSelectionChange={(value) => {
            const selected = Object.values(value)[0]
            selected && handleSourceChange(selected)
          }}
        >
          {integration.integrationId ? (
            <ListboxItem
              key={NETWORK_SOURCES[0].label}
              startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${NETWORK_SOURCES[0].icon}`} />}
              description={intl.formatMessage({
                id: `networks.source.${NETWORK_SOURCES[0].label}.description`,
              })}
            >
              {intl.formatMessage({ id: `networks.source.${NETWORK_SOURCES[0].label}` })}
            </ListboxItem>
          ) : (
            NETWORK_SOURCES.map(({ label, icon }) => (
              <ListboxItem
                key={label}
                startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
                description={intl.formatMessage({ id: `networks.source.${label}.description` })}
              >
                {intl.formatMessage({ id: `networks.source.${label}` })}
              </ListboxItem>
            ))
          )}
        </Listbox>
        <Text className="fr-mt-3w fr-message fr-message--warning" size="xs">
          {intl.formatMessage({ id: "networks.select-source.warning" })}
        </Text>
      </Container>
      <div className="fr-modal__footer fr-px-0" style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <Button aria-controls={id}>{intl.formatMessage({ id: "networks.select-source.modal.display" })}</Button>
      </div>
    </Modal>
  )
}
