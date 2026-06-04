import { Row, Title, MenuButton, MenuItem } from "@dataesr/dsfr-plus";
import useSearchData from "../../hooks/useSearchData";
import { useIntl } from "react-intl";
import useExportData from "../../hooks/useExportData";

export default function ResultExports() {
  const intl = useIntl()
  const { total } = useSearchData()
  const { exportFile, isError, isExporting } = useExportData()

  const handleExport = async (key: string) => {
    const format = key.split('>')[1] as 'json' | 'csv'
    await exportFile(format)
  }

  return (
    <Row>
      <div className="fr-mb-3w" style={{ display: "flex", alignItems: (total > 1000) ? "start" : "center", width: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
            {intl.formatMessage({ id: "search.exports.title" })}
          </Title>
          {(total > 1000) && (
            <p className="fr-text--xs fr-text-mention--grey">
              {intl.formatMessage({ id: "search.exports.description" })}
            </p>
          )}
          {isExporting && (
            <p className="fr-text--xs fr-text-mention--grey">
              {intl.formatMessage({ id: "search.exports.is-exporting" })}
            </p>
          )}
          {isError && (
            <p className="fr-text--xs fr-text-label--red-marianne">
              {intl.formatMessage({ id: "search.exports.is-error" })}
            </p>
          )}
        </div>
        <div className="fr-pl-2w">
          <MenuButton
            disabledKeys={isExporting ? ["export>json", "export>csv"] : []}
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
              description={intl.formatMessage({ id: "search.exports.json.description" })}
              endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
            >
              <span className="fr-text--sm">
                {intl.formatMessage({ id: "search.exports.json.title" })}
              </span>
            </MenuItem>
            <MenuItem
              key="export>csv"
              className="fr-p-1w"
              description={intl.formatMessage({ id: "search.exports.csv.description" })}
              endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
            >
              <span className="fr-text--sm">
                {intl.formatMessage({ id: "search.exports.csv.title" })}
              </span>
            </MenuItem>
          </MenuButton>
        </div>
      </div>
    </Row>
  );
}