import { Text } from "@dataesr/dsfr-plus";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";
import { PatentAggregations } from "../../../../../types/patent";
import useFilters from "../../hooks/useFilters";

const KEEP_PATENTS_AFTER = 2009;

export default function PatentYearFilter() {
  const { handleRangeFilterChange } = useUrl();
  const { data = { byYear: [] } } = useFilters();
  const { byYear } = data as PatentAggregations;


  const _byYear = byYear?.filter(
    (year) => parseInt(year.value, 10) > KEEP_PATENTS_AFTER
  );

  if (!_byYear.length) {
    return null;
  }
  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        Filtrer par année
      </Text>
      <RangeSlider
        aria-label="Années de première publication"
        minValue={_byYear[0].value}
        maxValue={_byYear[_byYear.length - 1].value}
        step={1}
        height="100px"
        data={_byYear.map((year) => year.count)}
        color="purple-glycine"
        defaultValue={[_byYear[0].value, _byYear[_byYear.length - 1].value]}
        onChangeEnd={(value) =>
          handleRangeFilterChange({
            field: "year",
            value: value,
          })
        }
        tooltipLabel={(value, year) => (
          <>
            Familles de brevets en {year}:
            <br />
            {value}
          </>
        )}
      />
    </>
  )
}
