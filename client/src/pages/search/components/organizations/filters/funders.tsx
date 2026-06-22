import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";
import { FilterProps } from "../../../types";

export default function OrganizationFunderFilter(props: FilterProps) {
  const { currentFilters, handleFilterChange, setOperator } = useUrl(props.filterParam)
  const { data = { byFundings: [] } } = useAggregateData('filters', props)
  const { byFundings } = data as OrganizationAggregations

  const filter = currentFilters?.['projects.type']
  const operator = filter?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.organizations.by-project" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.organizations.by-project-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('projects.type', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byFundings.map((funder) => (
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