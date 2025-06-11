import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { PublicationAggregations } from "../../../../../types/publication";
import useFilters from "../../hooks/useFilters";
import useUrl from "../../hooks/useUrl";

export default function PublicationFunderFilter() {
  const { currentFilters, handleFilterChange } = useUrl()
  const { data = { byFunder: [] } } = useFilters()
  const { byFunder } = data as PublicationAggregations

  return (
    <>
      <Text className="fr-mb-1v" bold size="md">
        Filtrer par type de projet
      </Text>

      <TagGroup>
        {byFunder.map((funder) => (
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
