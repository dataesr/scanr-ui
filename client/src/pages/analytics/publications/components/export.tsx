import { MenuButton, MenuItem } from "@dataesr/dsfr-plus";
import useExportData from "../hooks/useExport";

export default function ResultExports() {
  const { isExporting, exportFile } = useExportData();


  const handleExport = async (key: string) => {
    const format = key.split('>')[1] as 'json' | 'csv';
    await exportFile(format);
  }

  return (
      <MenuButton
        label="Exporter"
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
          description="Exporter les résultats au format JSON"
          endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
        >
          <span className="fr-text--sm">
            JSON
          </span>
        </MenuItem>
        <MenuItem
          key="export>csv"
          className="fr-p-1w"
          description="Exporter les résultats au format CSV"
          endContent={<span className="fr-icon-download-line fr-icon--sm fr-ml-3w" />}
        >
          <span className="fr-text--sm">
            CSV
          </span>
        </MenuItem>
      </MenuButton>
  );
}
