import { SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";

import OperatorButton from "../../../../../components/operator-button";
import { ClinicalTrialAggregations } from "../../../../../types/clinical-trial";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";

export default function ClinicalTrialLeadSponsorTypeFilter() {
  const intl = useIntl();
  const { currentFilters, handleFilterChange, setOperator } = useUrl()
  const { data = { byLeadSponsorType: [] } } = useAggregateData('filters')
  const { byLeadSponsorType } = data as ClinicalTrialAggregations

  const filter = currentFilters.lead_sponsor_type
  const operator = filter?.operator || "or"

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mt-3w fr-mb-0" bold size="md">
            <FormattedMessage id="search.filters.clinical-trials.by-lead-sponsor-type" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.clinical-trials.by-lead-sponsor-type-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('lead_sponsor_type', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byLeadSponsorType?.map((element) => (
          <SelectableTag
            selected={filter?.values?.map(v => v.value)?.includes(element)}
            key={element}
            onClick={() => handleFilterChange({ field: 'lead_sponsor_type', label: intl.formatMessage({ id: `search.filters.clinical-trials.by-lead-sponsor-type.${element}` }), value: element })}
          >
            {intl.formatMessage({ id: `search.filters.clinical-trials.by-lead-sponsor-type.${element}` })}
          </SelectableTag>
        ))}
      </TagGroup>
    </>
  )
}