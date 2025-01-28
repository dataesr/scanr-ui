import { Listbox, ListboxItem, Text } from "@dataesr/dsfr-plus"
import { NETWORKS_MODELS } from "../../config/models"
import { useIntl } from "react-intl"
import NetworkGetStartedPage from "../get-started/template"
import useGetStarted from "../../hooks/useGetStarted"
import useOptions from "../../hooks/useOptions"

export default function NetworkSelectModelGetStarted() {
  const intl = useIntl()
  const { navigateToNetwork } = useGetStarted()
  const { currentModel, currentSource } = useOptions()

  return (
    <NetworkGetStartedPage title={intl.formatMessage({ id: "networks.get-started.select-model.title" })}>
      <Text size="sm">{intl.formatMessage({ id: "networks.get-started.select-model.description" })}</Text>
      <Text size="sm"></Text>
      <Listbox
        selectedKeys={[currentModel]}
        selectionMode="single"
        selectionBehavior="replace"
        onSelectionChange={(value) => {
          const selected = Object.values(value)[0] || currentModel
          navigateToNetwork({ model: selected })
        }}
      >
        {NETWORKS_MODELS[currentSource].map(({ label, icon }) => (
          <ListboxItem
            startContent={<span className={`fr-mr-3v fr-icon--lg fr-icon-${icon}`} />}
            key={label}
            description={intl.formatMessage({ id: `networks.model.${label}.description` })}
          >
            {intl.formatMessage({ id: `networks.model.${label}` })}
          </ListboxItem>
        ))}
      </Listbox>
    </NetworkGetStartedPage>
  )
}
