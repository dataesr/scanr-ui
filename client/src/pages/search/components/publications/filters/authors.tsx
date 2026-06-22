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
import { Fragment } from "react";
import { autocompleteAuthors } from "../../../../../api/authors/autocomplete";
import { LightAuthor } from "../../../../../types/author";
import OperatorButton from "../../../../../components/operator-button";

export default function PublicationAuthorFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl();

  const authorsAutocompletedList = useAutocompleteList<LightAuthor>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] };
      }
      const res = await autocompleteAuthors({ query: filterText });
      return { items: res.data?.map((author) => author._source) };
    },
  });

  const operator = currentFilters?.["authors.person"]?.operator || "or";

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.publications.by-author" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.publications.by-author-description" />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(key) => setOperator("authors.person", key === "and" ? "and" : "or")}
        />
      </div>
      {currentFilters?.["authors.person"] ? (
        <Text bold size="sm" className="fr-mb-1v">
          <FormattedMessage id="search.filters.selected" /> {":"}
        </Text>
      ) : null}
      <TagGroup>
        {currentFilters?.["authors.person"]?.values?.map(({ value, label }) => (
          <DismissibleTag
            key={JSON.stringify(value)}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange({ field: "authors.person", value })
            }}
          >
            {label || value}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Rechercher des auteurs"
        items={authorsAutocompletedList.items}
        inputValue={authorsAutocompletedList.filterText}
        onInputChange={authorsAutocompletedList.setFilterText}
        loadingState={authorsAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          const [value, label] = item.toString().split("###")
          handleFilterChange({ field: "authors.person", value, label })
          authorsAutocompletedList.setFilterText('')
        }}
      >
        {(item) => (
          <AutocompleteItem
            startContent={<span className="fr-mr-3v fr-icon--md fr-icon-user-line" />}
            description={item.topDomains
              ?.filter((el) => el.type === "wikidata")
              ?.slice(0, 3)
              ?.map((el, i) => (
                <Fragment key={i}>
                  {i > 0 ? ", " : ""}
                  <Text as="span" bold>
                    #{el?.label.default}
                  </Text>
                </Fragment>
              ))}
            key={`${item.id}###${item.fullName}`}
          >
            {item.fullName}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}
