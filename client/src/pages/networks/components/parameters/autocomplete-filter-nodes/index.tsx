import {
  Autocomplete,
  AutocompleteItem,
  Col,
  Container,
  DismissibleTag,
  Row,
  TagGroup,
  Text,
  Toggle,
  useAutocompleteList,
} from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../../context"
import { FormattedMessage, useIntl } from "react-intl"

export default function AutocompleteFilterNodes() {
  const intl = useIntl()
  const {
    search: { data },
    options: { parameters, handleParameterChange },
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
    <Container fluid className="fr-mb-3w">
      <Row verticalAlign="middle">
        <Col md={8}>
          <Text className="fr-label fr-mb-1v" size="md">
            {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.label" })}
          </Text>
          <Text className="fr-hint-text fr-mb-1w">
            {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.hint" })}
          </Text>
        </Col>
        <Col md={4}>
          <Row verticalAlign="middle">
            <Toggle checked={parameters.filterNeighbors} onChange={(event) => handleParameterChange("filterNeighbors", event.target.checked)} />
            <Text className="fr-hint-text fr-mb-1v" size="md">
              {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.toggle" })}
            </Text>
          </Row>
        </Col>
      </Row>
      {
        nodes.length ? (
          <Text bold size="sm" className="fr-mb-1v">
            <FormattedMessage id="search.filters.selected" /> {":"}
          </Text>
        ) : null
      }
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
      {!parameters.filterNeighbors && parameters.filterNodes.length && parameters.filterNodes.length < 3 && (
        <Text className="fr-mt-3w fr-message fr-message--warning" size="xs">
          {intl.formatMessage({ id: "networks.parameters.autocomplete-filter-nodes.warning" })}
        </Text>
      )}
    </Container>
  )
}
