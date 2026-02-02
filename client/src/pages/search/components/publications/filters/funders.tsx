import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import { PublicationAggregations } from "../../../../../types/publication";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";

export default function PublicationFunderFilter() {
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byFunder: [] } } = useAggregateData('filters')
  const { byFunder } = data as PublicationAggregations

  return (
    <>
      <Text className="fr-mb-1v" bold size="md">
        <FormattedMessage id="search.filters.publications.by-project" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.publications.by-project-description" />
      </Text>
      <TagGroup>
        {byFunder?.map((funder) => (
          <SelectableTag
            selected={currentFilters?.['projects.type']?.values?.map(v => v.value)?.includes(funder.value)}
            key={funder.value}
            color="green-emeraude"
            onClick={() => handleFilterChange({ field: 'projects.type', value: funder.value })}
          >
            {funder.label}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}