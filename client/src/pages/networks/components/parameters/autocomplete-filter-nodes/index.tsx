import {
  // Autocomplete,
  // AutocompleteItem,
  Container,
  // DismissibleTag,
  // TagGroup,
  TagInput,
  Text,
  // useAutocompleteList,
} from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../../context"
import { useIntl } from "react-intl"

export default function AutocompleteFilterNode() {
  const intl = useIntl()
  const {
    // search,
    options: { parameters, handleParameterChange },
  } = useNetworkContext()

  // const nodes = search?.data?.network?.items?.map((item) => ({ label: item.label, id: item.id }))
  // const autocomplete = useAutocompleteList<Record<string, string>>({
  //   async load({ filterText }) {
  //     return {
  //       items: nodes?.filter((node) => node.label.toLowerCase().startsWith(filterText.toLowerCase())) ?? [],
  //     }
  //   },
  // })

  return (
    <Container fluid className="fr-mb-3w">
      <Text className="fr-label fr-mb-1v" size="md">
        {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.label" })}
      </Text>
      <Text className="fr-hint-text fr-mb-1w">
        {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.hint" })}
      </Text>
      {/* <TagGroup>
        {Object.entries(parameters.filterNodes || {}).map(([key, value]) => (
          <DismissibleTag
            key={key}
            className="fr-mr-1v"
            color="green-bourgeon"
            onClick={(e) => {
              e.preventDefault()
              const nextFilterNodes = parameters.filterNodes
              delete nextFilterNodes?.[key]
              console.log("nextFilterNodes", nextFilterNodes)
              handleParameterChange("filterNodes", nextFilterNodes)
            }}
          >
            {value || key}
          </DismissibleTag>
        ))}
      </TagGroup>
      {autocomplete ? (
        <Autocomplete
          items={autocomplete.items}
          inputValue={autocomplete.filterText}
          onInputChange={autocomplete.setFilterText}
          onSelectionChange={(item) => {
            if (!item) return
            const [id, label] = item.toString().split("###")
            handleParameterChange("filterNodes", { ...parameters.filterNodes, [id]: label || "" })
          }}
          menuTrigger="input"
          size="md"
        >
          {(item) => <AutocompleteItem key={`${item.id}###${item.label}`}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      ) : (
        <Autocomplete size="md" isDisabled>
          {<div></div>}
        </Autocomplete>
      )} */}
      <TagInput
        key={"filter-nodes"}
        label=""
        tags={parameters.filterNodes?.map((tag) => String(tag))}
        onTagsChange={(tags) => {
          handleParameterChange("filterNodes", tags)
        }}
      />
      {Object.keys(parameters.filterNodes || {}).length > 0 && Object.keys(parameters.filterNodes || {}).length < 3 && (
        <Text className="fr-mt-3w fr-message fr-message--warning" size="xs">
          {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.warning" })}
        </Text>
      )}
    </Container>
  )
}
