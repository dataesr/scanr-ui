import {
  Autocomplete,
  AutocompleteItem,
  DismissibleTag,
  TagGroup,
  Text,
  useAutocompleteList,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { FormattedMessage } from "react-intl";
import useUrl from "../../../hooks/useUrl";
import { autocompleteOrganizations } from "../../../../../api/organizations/autocomplete";
import { LightOrganization } from "../../../../../types/organization";
import OperatorButton from "../../../../../components/operator-button";
import getLangFieldValue from "../../../../../utils/lang";

export default function OrganizationSupervisorsFilter() {
  const { locale } = useDSFRConfig();
  const { currentFilters, handleFilterChange, setOperator } = useUrl();

  const authorsAutocompletedList = useAutocompleteList<LightOrganization>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] };
      }
      const res = await autocompleteOrganizations({ query: filterText });
      return { items: res.data?.map((org) => org._source) };
    },
  });

  const filter = currentFilters?.["institutions.structure"];
  const operator = filter?.operator || "or";

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.organizations.by-supervisors" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.organizations.by-supervisors-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("institutions.structure", key === "and" ? "and" : "or")}
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
            key={value}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange({ field: "institutions.structure", value })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des structures"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          const [value, label] = item.toString().split("###")
          handleFilterChange({ field: "institutions.structure", value, label })
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            description={item.address?.find((a) => a.main).city}
            key={`${item.id}###${getLangFieldValue(locale)(item.label)}`}
          >
            {getLangFieldValue(locale)(item.label)}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}
