import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import { ProjectAggregations } from "../../../../../types/project";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { FilterProps } from "../../../types";

export default function ProjectTypeFilter(props: FilterProps) {
  const { currentFilters, handleFilterChange } = useUrl(props.filterParam)
  const { data = { byType: [] } } = useAggregateData('filters', props)
  const { byType } = data as ProjectAggregations

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.filters.projects.by-type" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.projects.by-type-description" />
      </Text>
      <TagGroup>
        {byType.map((type) => (
          <SelectableTag
            selected={currentFilters.type?.values?.map(v => v.value)?.includes(type.value)}
            key={type.value}
            onClick={() => handleFilterChange({ field: 'type', value: type.value })}
          >
            {type.label}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}