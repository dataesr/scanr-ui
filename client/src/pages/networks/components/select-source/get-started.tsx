import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import { NETWORK_SOURCES } from "../../config/sources"
import useGetStarted from "../../hooks/useGetStarted"
import { useNetworkContext } from "../../context"

export default function NetworkSelectSourceGetStarted() {
  const intl = useIntl()
  const { handlePageChange } = useGetStarted()
  const {
    options: { currentSource },
  } = useNetworkContext()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.select-source.title" })}>
      <Text>{intl.formatMessage({ id: "networks.get-started.select-source.description" })}</Text>
      <Listbox
        selectedKeys={[currentSource]}
        selectionMode="single"
        onSelectionChange={(value) => {
          const selected = Object.values(value)[0] || currentSource
          handlePageChange({ source: selected })
        }}
      >
        {NETWORK_SOURCES.map(({ label, icon }) => (
          <ListboxItem
            key={label}
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
            description={intl.formatMessage({ id: `networks.source.${label}.description` })}
          >
            {intl.formatMessage({ id: `networks.source.${label}` })}
          </ListboxItem>
        ))}
      </Listbox>
    </NetworkGetStartedPage>
  )
}
