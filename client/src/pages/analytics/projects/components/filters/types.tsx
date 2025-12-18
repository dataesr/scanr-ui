import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { ProjectAggregations } from "../../../../../types/project";
import useUrl from "../../../hooks/useUrl";
import useFilters from "../../hooks/useFilters";

export default function ProjectTypeFilter() {
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byType: [] } } = useFilters();
  const { byType } = data as ProjectAggregations

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        Filtrer par type de financement
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
