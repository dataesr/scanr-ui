import { Container } from "@dataesr/dsfr-plus";
import AuthorAwardsFilter from "../../../search/components/authors/filters/awards";

export default function NetworkFiltersAuthors() {
    return (
        <Container fluid>
            <AuthorAwardsFilter filtersParam="nfilters" />
            <hr className="fr-mt-3w" />
        </Container>
    )
}