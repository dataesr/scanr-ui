import { Button, SelectableTag, TagGroup, Text } from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { OrganizationAggregations } from "../../../../../types/organization";
import { useState } from "react";
import { FilterProps } from "../../../types";

const SEE_MORE_AFTER = 8;


export default function OrganizationLevelFilter(props: FilterProps) {
  const intl = useIntl();
  const { currentFilters, handleFilterChange } = useUrl(props.filterParam)
  const { data = { byLevel: [] } } = useAggregateData('filters', props)
  const { byLevel } = data as OrganizationAggregations;

  const [seeMore, setSeeMore] = useState(false)

  return (
    <>
      <Text className="fr-mb-1v" bold size="md">
        <FormattedMessage id="search.filters.organizations.by-level" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.organizations.by-level-description" />
      </Text>
      <TagGroup>
        {byLevel.slice(0, seeMore ? 10000 : SEE_MORE_AFTER).map((element) => (
          <SelectableTag
            selected={currentFilters.level?.values?.map(v => v.value)?.includes(element.value)}
            key={element.value}
            color="yellow-tournesol"
            onClick={() => handleFilterChange({ field: 'level', value: element.value })}
          >
            {element.label}
          </SelectableTag>
        ))}
      </TagGroup>
      {!!(byLevel?.length > SEE_MORE_AFTER) && (
        <Button
          variant="text"
          size="sm"
          onClick={() => setSeeMore((prev) => !prev)}
        >
          {
            seeMore
              ? intl.formatMessage({ id: "search.filters.see-less" })
              : intl.formatMessage({ id: "search.filters.see-more" }, { count: byLevel?.length })
          }
        </Button>
      )}
    </>
  )
}