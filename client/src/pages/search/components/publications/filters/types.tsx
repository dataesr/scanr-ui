import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import { PublicationAggregations } from "../../../../../types/publication";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";

export default function PublicationTypeFilter() {
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byType: [] } } = useAggregateData('filters')
  const { byType } = data as PublicationAggregations

  return (
    <>
      <Text className="fr-mb-0" bold size="md">
        <FormattedMessage id="search.filters.publications.by-type" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.publications.by-type-description" />
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