import { useState } from "react";
import {
  Button,
  SelectableTag,
  TagGroup,
  Text,
  TextInput,
} from "@dataesr/dsfr-plus";
import { FormattedMessage, useIntl } from "react-intl";
import useAggregateData from "../../../hooks/useAggregationData";
import useUrl from "../../../hooks/useUrl";
import { ClinicalTrialAggregations } from "../../../../../types/clinical-trial";
import OperatorButton from "../../../../../components/operator-button";

const SEE_MORE_AFTER = 8;

export default function ClinicalTrialRorFilter() {
  const intl = useIntl();
  const { currentFilters, handleFilterChange, setOperator } = useUrl()
  const { data = { byRor: [] } } = useAggregateData("filters")
  const { byRor } = data as ClinicalTrialAggregations

  const [seeMore, setSeeMore] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  const filter = currentFilters?.ror
  const operator = filter?.operator || "or"
  const filteredByRor = byRor.filter((ror) =>
    ror.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mt-3w fr-mb-0" bold size="md">
            <FormattedMessage id="search.filters.clinical-trials.by-ror" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.clinical-trials.by-ror-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) =>
            setOperator("ror", key === "and" ? "and" : "or")
          }
        />
      </div>
      <TextInput
        type="text"
        disableAutoValidation
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={intl.formatMessage({ id: "search.filters.search-tags" })}
      />
      <TagGroup>
        {filteredByRor
          .slice(0, seeMore ? 10000 : SEE_MORE_AFTER)
          .map((ror) => (
            <SelectableTag
              selected={filter?.values
                ?.map((v) => v.value)
                ?.includes(ror)}
              key={ror}
              onClick={() =>
                handleFilterChange({ field: "ror", label: ror.split('###')[1], value: ror.split('###')[0] })
              }
            >
              {ror.split('###')[1]}
            </SelectableTag>
          ))}
      </TagGroup>
      {!!(byRor?.length > SEE_MORE_AFTER) && (
        <Button
          variant="text"
          size="sm"
          onClick={() => setSeeMore((prev) => !prev)}
        >
          {seeMore
            ? intl.formatMessage({ id: "search.filters.see-less" })
            : intl.formatMessage(
                { id: "search.filters.see-more" },
                { count: byRor?.length }
              )}
        </Button>
      )}
    </>
  );
}
