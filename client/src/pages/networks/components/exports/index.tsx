import { Row, Title, MenuButton, MenuItem } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useExportData from "../../hooks/useExportData"
import { useNetworkContext } from "../../context"

export default function NetworkExports() {
  const intl = useIntl()
  const {
    search,
    currentQuery,
    integration: { integrationOptions },
  } = useNetworkContext()
  const { isExporting, exportFile } = useExportData()

  if (integrationOptions?.showExports === false) return null

  const handleExport = async (key: string) => {
    const format = key.split(">")[1] as "json" | "xlsx"
    await exportFile(format)
  }

  return (
    <Row>
      <div className="fr-mb-3w" style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
            {intl.formatMessage({ id: "networks.exports.title" })}
          </Title>
          {isExporting && (
            <p className="fr-text--xs fr-text-mention--grey">
              {intl.formatMessage({ id: "networks.exports.is-exporting" })}
            </p>
          )}
        </div>
        <div className="fr-pl-2w">
          <MenuButton
            disabledKeys={
              isExporting || search.isFetching || Boolean(search.error) || !currentQuery
                ? ["export>json", "export>xlsx"]
                : []
            }
            placement="end"
            size="sm"
            aria-label="Options"
            variant="text"
            icon="settings-5-line"
            onAction={handleExport}
            className="fr-mb-1w"
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
        </div>
      </div>
    </Row>
  )
}
