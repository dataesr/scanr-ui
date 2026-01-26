import {
  Autocomplete,
  AutocompleteItem,
  DismissibleTag,
  TagGroup,
  Text,
  useAutocompleteList,
} from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";
import {
  LocalisationAutocomplete,
  autocompleteLocalisations,
} from "../../../../../api/localisations";
import OperatorButton from "../../../../../components/operator-button";

export default function OrganizationLocalisationsFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl();

  const localisationAutocompletedList =
    useAutocompleteList<LocalisationAutocomplete>({
      async load({ filterText }) {
        if (!filterText) {
          return { items: [] };
        }
        const res = await autocompleteLocalisations({ query: filterText });

        return { items: res.data?.map((org) => org._source) };
      },
    });

  const filter = currentFilters?.["address.localisationSuggestions"];
  const operator = filter?.operator || "or";

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.organizations.by-localisation" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.organizations.by-localisation-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("address.localisationSuggestions", key === "and" ? "and" : "or")}
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
              handleFilterChange({
                field: "address.localisationSuggestions",
                value,
              })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des structures"
        items={localisationAutocompletedList.items}
        inputValue={localisationAutocompletedList.filterText}
        onInputChange={localisationAutocompletedList.setFilterText}
        loadingState={localisationAutocompletedList.loadingState}
        placeholder="Ex: Ile de France, Bas-Rhin, Lyon..."
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          handleFilterChange({
            field: "address.localisationSuggestions",
            value: item,
          })
          localisationAutocompletedList.setFilterText('')
        }}
      >
        {({ autocompleted }) => <AutocompleteItem key={autocompleted?.[0]}>{autocompleted?.[0]}</AutocompleteItem>}
      </Autocomplete>
    </>
  )
}
