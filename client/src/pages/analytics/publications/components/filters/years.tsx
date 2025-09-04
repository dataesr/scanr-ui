import { Text } from "@dataesr/dsfr-plus";
import { PublicationAggregations } from "../../../../../types/publication";
import useFilters from "../../hooks/useFilters";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import useUrl from "../../../hooks/useUrl";

export default function PublicationYearFilter() {
  const { handleRangeFilterChange, currentFilters } = useUrl();
  const { data = { byYear: [] } } = useFilters()
  const { byYear = [] } = data as PublicationAggregations

  if (!byYear.length) return null;
  const min = currentFilters?.year?.values?.[0]?.value || byYear[0].value;
  const max = currentFilters?.year?.values?.[1]?.value || byYear[byYear.length - 1].value;

  const defaultValues = [byYear[0].value, byYear[byYear.length - 1].value]

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        Filtrer par années
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        `entre ${min} et ${max}`
      </Text>

      <RangeSlider
        aria-label="Années de publication"
        minValue={defaultValues[0]}
        maxValue={defaultValues[1]}
        step={1}
        height="100px"
        data={byYear.map((year) => year.count)}
        color="purple-glycine"
        defaultValue={defaultValues}
        onChangeEnd={(value) => handleRangeFilterChange({ field: 'year', value: value })}
        tooltipLabel={(value, year) => (
          <>
            Publications en {year} :
            <br />
            {value}
          </>
        )}
      />
    </>
  )
}
