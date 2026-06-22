import { Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import { ProjectAggregations } from "../../../../../types/project";
import useAggregateData from "../../../hooks/useAggregationData";
import { RangeSlider } from "../../../../../components/year-range-sliders";
import { FilterProps } from "../../../types";
import useUrl from "../../../hooks/useUrl";

export default function ProjectYearFilter(props: FilterProps) {
  const intl = useIntl();
  const { handleRangeFilterChange, currentFilters } = useUrl(props.filterParam);
  const { data = { byYear: [] } } = useAggregateData('filters', props)
  const { byYear = [] } = data as ProjectAggregations

  if (!byYear.length) return null;
  const min = currentFilters?.year?.values?.[0]?.value || byYear[0].value;
  const max = currentFilters?.year?.values?.[1]?.value || byYear[byYear.length - 1].value;

  const defaultValues = [byYear[0].value, byYear[byYear.length - 1].value]

  return (
    <>
      <Text bold size="md" className="fr-mb-1v">
        {intl.formatMessage({ id: "search.filters.projects.by-year" })}
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        {intl.formatMessage({ id: "search.filters.projects.by-year-description" }, { min, max })}
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
            {intl.formatMessage({ id: "search.filters.projects.by-year-tooltip" }, { year })}
            <br />
            {value}
          </>
        )}
      />
    </>
  )
}