import { Container } from "@dataesr/dsfr-plus"
import ProjectYearFilter from "../../../search/components/projects/filters/years"
import ProjectTypeFilter from "../../../search/components/projects/filters/types"
import ProjectOrganizationsFilter from "../../../search/components/projects/filters/organizations"
import ProjectLocalisationsFilter from "../../../search/components/projects/filters/localisation"

export default function NetworkFiltersProjects() {
  return (
    <Container fluid>
      <ProjectYearFilter />
      <hr className="fr-mt-3w" />
      <ProjectTypeFilter />
      <hr className="fr-mt-3w" />
      <ProjectOrganizationsFilter />
      <hr className="fr-mt-3w" />
      <ProjectLocalisationsFilter />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
