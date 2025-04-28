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
import { autocompleteOrganizations } from "../../../../../api/organizations/autocomplete"
import { LightOrganization } from "../../../../../types/organization"
import OperatorButton from "../../../../../components/operator-button"
import getLangFieldValue from "../../../../../utils/lang"

export default function PatentOrganizationsFilter() {
  const { locale } = useDSFRConfig()
  const { currentFilters, handleFilterChange, setOperator } = useUrl()

  const organizationsAutocompletedList = useAutocompleteList<LightOrganization>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] }
      }
      const res = await autocompleteOrganizations({ query: filterText })
      return { items: res.data?.map((org) => org._source) }
    },
  })

  const filter = currentFilters?.["applicants.ids.id"]
  const operator = filter?.operator || "or"

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.patents.by-organization" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.patents.by-organization-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("applicants.ids.id", key === "and" ? "and" : "or")}
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
              handleFilterChange({ field: "applicants.ids.id", value })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des structures"
        items={organizationsAutocompletedList.items}
        inputValue={organizationsAutocompletedList.filterText}
        onInputChange={organizationsAutocompletedList.setFilterText}
        loadingState={organizationsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          const [value, label] = item.toString().split("###")
          handleFilterChange({ field: "applicants.ids.id", value, label })
          organizationsAutocompletedList.setFilterText('')
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            endContent={<span className="fr-text--xs fr-text-mention--grey">{item.patentsCount} patents</span>}
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
