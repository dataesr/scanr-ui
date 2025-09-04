import { Text } from "@dataesr/dsfr-plus";
import { ProjectAggregations } from "../../../../../types/project";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";
import useFilters from "../../hooks/useFilters";

export default function ProjectYearFilter() {
  const { handleRangeFilterChange } = useUrl();
  const { data = { byYear: [] } } = useFilters();
  const { byYear = [] } = data as ProjectAggregations

  if (!byYear.length) return null;

  const defaultValues = [byYear[0].value, byYear[byYear.length - 1].value]

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        Filtrer par année de financement
      </Text>
      <RangeSlider
        aria-label="Années de financement"
        minValue={defaultValues[0]}
        maxValue={defaultValues[1]}
        step={1}
        height="100px"
        data={byYear.map((year) => year.count)}
        color="green-emeraude"
        defaultValue={defaultValues}
        onChangeEnd={(value) => handleRangeFilterChange({ field: 'year', value: value })}
        tooltipLabel={(value, year) => (
          <>
            Financement en {year}
            <br />
            {value}
          </>
        )}
      />
    </>
  )
}
