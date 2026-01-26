import { Autocomplete, AutocompleteItem, DismissibleTag, TagGroup, Text, useAutocompleteList } from "@dataesr/dsfr-plus"
import { FormattedMessage } from "react-intl"
import useUrl from "../../../hooks/useUrl"
import OperatorButton from "../../../../../components/operator-button"
import { CountriesAutocomplete, autocompleteCountries } from "../../../../../api/countries"

export default function PublicationCountriesFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl()

  const countriesAutocompletedList = useAutocompleteList<CountriesAutocomplete>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] }
      }
      const res = await autocompleteCountries({ query: filterText })
      return { items: res.data?.map((country) => country._source) }
    },
  })

  const filter = currentFilters?.["affiliations.country"]
  const operator = filter?.operator || "or"

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.publications.by-country" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.publications.by-country-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("affiliations.country", key === "and" ? "and" : "or")}
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
            key={JSON.stringify(value)}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange({ field: "affiliations.country", value })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des pays"
        items={countriesAutocompletedList.items}
        inputValue={countriesAutocompletedList.filterText}
        onInputChange={countriesAutocompletedList.setFilterText}
        loadingState={countriesAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          handleFilterChange({ field: "affiliations.country", value: item })
          countriesAutocompletedList.setFilterText('')
        }}
      >
        {({ autocompleted }) => <AutocompleteItem key={autocompleted?.[0]}>{autocompleted?.[0]}</AutocompleteItem>}
      </Autocomplete>
    </>
  )
}
