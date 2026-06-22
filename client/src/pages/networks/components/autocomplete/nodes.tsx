import { Autocomplete, AutocompleteItem, DismissibleTag, TagGroup, Text, useAutocompleteList } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"
import { FormattedMessage } from "react-intl"
// import OperatorButton from "../../../../components/operator-button"

export default function NetworkAutocompleteNodes() {
  const {
    search: { data }, options: { parameters, handleParameterChange }
  } = useNetworkContext()
  const allIds = data?.meta?.all_ids || []

  const nodesAutocompletedList = useAutocompleteList<Record<string, string>>({
    async load({ filterText }) {
      if (!filterText) {
        return { items: [] }
      }

      return {
        items: allIds
          ?.map((id) => {
            const [value, label] = id.split("###")
            return { value, label }
          })
          ?.filter((id) => id.value.includes(filterText) || id.label.includes(filterText))
          ?.slice(0, 7),
      }
    },
  })

  const nodes = parameters?.filterNodes || []

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="networks.autocomplete.title" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="networks.autocomplete.description" />
          </Text>
        </div>
        {/* <OperatorButton operator={operator} setOperator={(key) => setOperator(nodesField, key === "and" ? "and" : "or")} /> */}
      </div>
      {nodes ? (
        <Text bold size="sm" className="fr-mb-1v">
          <FormattedMessage id="search.filters.selected" /> {":"}
        </Text>
      ) : null}
      <TagGroup>
        {nodes?.map((currentNode) => (
          <DismissibleTag
            key={String(currentNode.split("###")[0])}
            className="fr-mr-1v"
            color="orange-terre-battue"
            onClick={(e) => {
              e.preventDefault()
              handleParameterChange("filterNodes", nodes?.filter((node) => node != currentNode))
            }}
          >
            {currentNode.split("###")[1]}
          </DismissibleTag>
        ))}
      </TagGroup>
      <Autocomplete
        label="Search nodes"
        items={nodesAutocompletedList.items}
        inputValue={nodesAutocompletedList.filterText}
        onInputChange={nodesAutocompletedList.setFilterText}
        loadingState={nodesAutocompletedList.loadingState}
        // menuTrigger="focus"
        size="md"
        onSelectionChange={(item) => {
          if (!item) return
          handleParameterChange("filterNodes", [...parameters.filterNodes, item.toString()])
          nodesAutocompletedList.setFilterText("")
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
            // description={item.address?.find((a) => a.main)?.city}
            key={`${item.value}###${item.label}`}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  )
}
