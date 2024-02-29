import { Button, SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { useState } from "react";
import { AuthorsAggregations } from "../../../../../types/author";
import OperatorButton from "../../../../../components/operator-button";

const SEE_MORE_AFTER = 8


export default function AuthorAwardsFilter() {
  const intl = useIntl();
  const { currentFilters, handleFilterChange, setOperator } = useUrl()
  const { data = { byAward: [] } } = useAggregateData('filters')
  const { byAward } = data as AuthorsAggregations

  const [seeMore, setSeeMore] = useState(false)
  const filter = currentFilters['awards.label']
  const operator = filter?.operator || 'or'


  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mt-3w fr-mb-0" bold size="md">
            <FormattedMessage id="search.filters.authors.by-award" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.authors.by-award-description" />
          </Text>
        </div>
        <OperatorButton operator={operator} setOperator={(key) => setOperator('awards.label', (key === 'and') ? 'and' : 'or')} />
      </div>
      <TagGroup>
        {byAward.slice(0, seeMore ? 10000 : SEE_MORE_AFTER).map((type) => (
          <SelectableTag
            selected={filter?.values?.map(v => v.value)?.includes(type.value)}
            key={type.value}
            onClick={() => handleFilterChange({ field: 'awards.label', value: type.value })}
          >
            {type.label}
          </SelectableTag>
        ))}
      </TagGroup>
      {!!(byAward?.length > SEE_MORE_AFTER) && (
        <Button
          variant="text"
          size="sm"
          onClick={() => setSeeMore((prev) => !prev)}
        >
          {
            seeMore
              ? intl.formatMessage({ id: "search.filters.see-less" })
              : intl.formatMessage({ id: "search.filters.see-more" }, { count: byAward?.length })
          }
        </Button>
      )}
    </>
  )
}