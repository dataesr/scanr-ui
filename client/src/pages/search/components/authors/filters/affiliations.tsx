import {
  Autocomplete,
  AutocompleteItem,
  DismissibleTag,
  TagGroup,
  Text,
  useAutocompleteList,
  useDSFRConfig,
} from "@dataesr/dsfr-plus"
import { FormattedMessage } from "react-intl"
import useUrl from "../../../hooks/useUrl"
import { RecentAffiliation } from "../../../../../types/author"
import OperatorButton from "../../../../../components/operator-button"
import { autocompleteAuthorsAffiliations } from "../../../../../api/authors/autocomplete"
import getLangFieldValue from "../../../../../utils/lang"

export default function AuthorAffiliationsFilter({
  recent = false,
  filtersParam = "filters",
}: {
  recent?: boolean
  filtersParam?: string
}) {
  const { currentFilters, handleFilterChange, setOperator } = useUrl(filtersParam)
  const { locale } = useDSFRConfig()
  const field = recent ? "recentAffiliations" : "affiliations"
  const fieldId = field + ".structure.id"

  const affiliationsAutocompletedList = useAutocompleteList<RecentAffiliation>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] }
      }
      const res = await autocompleteAuthorsAffiliations({ query: filterText, recent })
      return { items: res.data?.flatMap((org) => org._source[field]) }
    },
  })
  console.log("affiliationsAutocompletedList", affiliationsAutocompletedList)

  const filter = currentFilters?.[fieldId]
  const operator = filter?.operator || "or"

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.publications.by-organization" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.publications.by-organization-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("affiliations.id", key === "and" ? "and" : "or")}
        />
      </div>
      {filter ? (
        <Text bold size="sm" className="fr-mb-1v">
          <FormattedMessage id="search.filters.selected" /> {":"}
        </Text>
      ) : null}
      <TagGroup>
        {filter?.values?.map(({ value, label }) => (
          <DismissibleTag
            key={Array.isArray(value) ? value.join("|||") : value}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange({ field: fieldId, value: value })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des structures"
        items={affiliationsAutocompletedList.items}
        inputValue={affiliationsAutocompletedList.filterText}
        onInputChange={affiliationsAutocompletedList.setFilterText}
        loadingState={affiliationsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          const [label, value] = item.toString().split("###")
          handleFilterChange({ field: fieldId, value, label })
          affiliationsAutocompletedList.setFilterText("")
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            // endContent={
            //   item.publicationsCount ? (
            //     <span className="fr-text--xs fr-text-mention--grey">{item.publicationsCount} publications</span>
            //   ) : null
            // }
            description={item.structure?.mainAddress?.city}
            key={`${getLangFieldValue(locale)(item.structure?.label)}###${item.structure?.id}`}
          >
            {getLangFieldValue(locale)(item.structure?.label || "")}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}
