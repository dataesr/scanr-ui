import { Button, SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";
import { useState } from "react";
import { FilterProps } from "../../../types";

const SEE_MORE_AFTER = 8


export default function OrganizationAwardsFilter(props: FilterProps) {
  const intl = useIntl();
  const { currentFilters, handleFilterChange, setOperator } = useUrl(props.filterParam)
  const { data = { byAwards: [] } } = useAggregateData('filters', props)
  const { byAwards } = data as OrganizationAggregations

  const [seeMore, setSeeMore] = useState(false)

  const filter = currentFilters?.['awards.label']
  const operator = filter?.operator || 'or'

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.organizations.by-awards" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.organizations.by-awards-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('awards.label', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byAwards.slice(0, seeMore ? 10000 : SEE_MORE_AFTER).map((funder) => (
          <SelectableTag
            selected={currentFilters?.['awards.label']?.values?.map(v => v.value)?.includes(funder.value)}
            key={funder.value}
            color="pink-macaron"
            onClick={() => handleFilterChange({ field: 'awards.label', value: funder.value })}
          >
            {funder.label}
          </SelectableTag>
        ))}
      </TagGroup>
      {!!(byAwards?.length > SEE_MORE_AFTER) && (
        <Button
          variant="text"
          size="sm"
          onClick={() => setSeeMore((prev) => !prev)}
        >
          {
            seeMore
              ? intl.formatMessage({ id: "search.filters.see-less" })
              : intl.formatMessage({ id: "search.filters.see-more" }, { count: byAwards?.length })
          }
        </Button>
      )}
    </>
  )
}