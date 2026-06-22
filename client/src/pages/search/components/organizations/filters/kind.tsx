import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";
import { FilterProps } from "../../../types";

export default function OrganizationKindFilter(props: FilterProps) {
  const { currentFilters, handleFilterChange, setOperator } = useUrl(props.filterParam)
  const { data = { byKind: [] } } = useAggregateData('filters', props)
  const { byKind } = data as OrganizationAggregations

  const filter = currentFilters.kind
  const operator = filter?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mt-3w fr-mb-0" bold size="md">
            <FormattedMessage id="search.filters.organizations.by-kind" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.organizations.by-kind-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('kind', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byKind?.map((element) => (
          <SelectableTag
            selected={filter?.values?.map(v => v.value)?.includes(element.value)}
            key={element.value}
            onClick={() => handleFilterChange({ field: 'kind', value: element.value })}
          >
            {element.label}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}