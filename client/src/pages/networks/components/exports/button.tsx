import { MenuButton, MenuItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useExportData from "../../hooks/useExportData"
import useScreenSize from "../../../../hooks/useScreenSize"
import { useNetworkContext } from "../../context"

export default function NetworkExportsButton() {
  const intl = useIntl()
  const { screen } = useScreenSize()
  const {
    search,
    integration: { integrationOptions },
  } = useNetworkContext()
  const { isExporting, exportFile } = useExportData()

  if (integrationOptions?.showExports === false) return null

  const handleExport = async (key: string) => {
    const format = key.split(">")[1] as "json" | "xlsx"
    await exportFile(format)
  }

  return (
    <MenuButton
      disabledKeys={isExporting || search.isFetching || Boolean(search.error) ? ["export>json", "export>xlsx"] : []}
      label={
        ["xs", "sm", "mg", "lg"].includes(screen)
          ? ""
          : isExporting
            ? intl.formatMessage({ id: "networks.exports.is-exporting" })
            : intl.formatMessage({ id: "networks.exports.title" })
      }
      className="fr-mt-1w"
      size="md"
      placement="end"
      aria-label="Options"
      variant="text"
      iconPosition="right"
      icon="download-line"
      onAction={handleExport}
    >
      <MenuItem
        key="export>json"
        className="fr-p-1w"
        description={intl.formatMessage({ id: "networks.exports.json.description" })}
        endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
      >
        <span className="fr-text--sm">{intl.formatMessage({ id: "networks.exports.json.title" })}</span>
      </MenuItem>
      <MenuItem
        key="export>xlsx"
        className="fr-p-1w"
        description={intl.formatMessage({ id: "networks.exports.xlsx.description" })}
        endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
      >
        <span className="fr-text--sm">{intl.formatMessage({ id: "networks.exports.xlsx.title" })}</span>
      </MenuItem>
    </MenuButton>
  )
}
