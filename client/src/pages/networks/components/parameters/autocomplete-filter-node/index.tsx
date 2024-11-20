import { Autocomplete, AutocompleteItem, Container, Text, useAutocompleteList } from "@dataesr/dsfr-plus"
import useTab from "../../../hooks/useTab"
import useParameters from "../../../hooks/useParameters"
import useSearchData from "../../../hooks/useSearchData"

export default function AutocompleteFilterNode() {
  const { currentTab } = useTab()
  const { parameters, handleParametersChange } = useParameters()
  const { search } = useSearchData(currentTab, parameters.clusters)

  const nodes = search?.data?.network?.items?.map((item) => ({ label: item.label, id: item.id }))
  const autocomplete =
    nodes?.length > 0
      ? useAutocompleteList<Record<string, string>>({
          async load({ filterText }) {
            return {
              items: nodes?.filter((node) => node.label.toLowerCase().startsWith(filterText.toLowerCase())),
            }
          },
        })
      : undefined

  return (
    <Container fluid className="fr-mb-3w">
      <Text className="fr-label fr-mb-1v" size="md">
        Filter the network
      </Text>
      <Text className="fr-hint-text fr-mb-1w">Filter the network</Text>
      {autocomplete ? (
        <Autocomplete
          label="Filter the network"
          items={autocomplete.items}
          inputValue={autocomplete.filterText}
          onInputChange={autocomplete.setFilterText}
          onSelectionChange={(item) => handleParametersChange("filterNode", item)}
          menuTrigger="input"
          size="md"
        >
          {(item) => <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      ) : (
        <Autocomplete label="Filter the network" size="md" isDisabled>
          {<div></div>}
        </Autocomplete>
      )}
    </Container>
  )
}