import { useState } from "react"
import { Button, SelectableTag, TagGroup, Text, TextInput } from "@dataesr/dsfr-plus"
import { FormattedMessage, useIntl } from "react-intl"
import useAggregateData from "../../../hooks/useAggregationData"
import useUrl from "../../../hooks/useUrl"
import { AuthorsAggregations } from "../../../../../types/author"
import OperatorButton from "../../../../../components/operator-button"

const SEE_MORE_AFTER = 8

export default function PublicationAuthorsAwardsFilter() {
  const intl = useIntl()
  const { currentFilters, handleFilterChange, setOperator } = useUrl()
  const { data = { byAward: [] } } = useAggregateData("filters")
  const { byAward } = data as AuthorsAggregations

  const [seeMore, setSeeMore] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  const filter = currentFilters["authors.awards.label"]
  const operator = filter?.operator || "or"
  const filteredByAward = byAward.filter((award) => award.label.toLowerCase().includes(searchInput.toLowerCase()))

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
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("authors.awards.label", key === "and" ? "and" : "or")}
        />
      </div>
      <TextInput
        disableAutoValidation
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={intl.formatMessage({ id: "search.filters.search-tags" })}
      />
      <TagGroup>
        {filteredByAward.slice(0, seeMore ? 10000 : SEE_MORE_AFTER).map((award) => (
          <SelectableTag
            selected={filter?.values?.map((v) => v.value)?.includes(award.value)}
            key={award.value}
            onClick={() => handleFilterChange({ field: "authors.awards.label", value: award.value })}
          >
            {award.label}
          </SelectableTag>
        ))}
      </TagGroup>
      {!!(byAward?.length > SEE_MORE_AFTER) && (
        <Button variant="text" size="sm" onClick={() => setSeeMore((prev) => !prev)}>
          {seeMore
            ? intl.formatMessage({ id: "search.filters.see-less" })
            : intl.formatMessage({ id: "search.filters.see-more" }, { count: byAward?.length })}
        </Button>
      )}
    </>
  )
}
