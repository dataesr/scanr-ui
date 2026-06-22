import { Container } from "@dataesr/dsfr-plus";
import AuthorAwardsFilter from "../../../search/components/authors/filters/awards";
import { useNetworkContext } from "../../context/hook"

export default function NetworkFiltersAuthors() {
    const {
      search: { data },
    } = useNetworkContext()
    const filterIds = data?.meta?.all_nodes?.map((node) => node.split("###")[0]) || []

    return (
      <Container fluid>
        <AuthorAwardsFilter filterParam="nfilters" filterIds={filterIds} forceApi="authors" ignoreQuery />
        <hr className="fr-mt-3w" />
      </Container>
    )
}