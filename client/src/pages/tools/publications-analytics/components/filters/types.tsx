import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { PublicationAggregations } from "../../../../../types/publication";
import useFilters from "../../hooks/useFilters";
import useUrl from "../../hooks/useUrl";

export default function PublicationTypeFilter() {
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byType: [] } } = useFilters()
  const { byType } = data as PublicationAggregations

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        Filtrer par type
      </Text>
      <TagGroup>
        {byType.map((type) => (
          <SelectableTag
            selected={currentFilters.type?.values?.map(v => v.value)?.includes(type.value)}
            key={type.value}
            onClick={() => handleFilterChange({ field: 'type', value: type.value, label: type.label })}
          >
            {type.label}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}
