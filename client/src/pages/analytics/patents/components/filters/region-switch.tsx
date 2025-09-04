import { Toggle } from "@dataesr/dsfr-plus";
import useUrl from "../../../hooks/useUrl";

export default function PatentRegionFilter() {
  const { handleBoolFilterChange, currentFilters } = useUrl();

  return (
    <>
      <Toggle
        checked={!!currentFilters.isGranted?.values?.[0]?.value}
        onChange={(e) =>
          handleBoolFilterChange({
            field: "isGranted",
            value: e.target.checked,
            label: "Brevets délivrés uniquements",
          })
        }
        label="Brevets délivrés uniquements"
      />
    </>
  );
}
