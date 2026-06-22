import { Container } from "@dataesr/dsfr-plus"
import ProjectYearFilter from "../../../search/components/projects/filters/years"
import ProjectTypeFilter from "../../../search/components/projects/filters/types"
import ProjectOrganizationsFilter from "../../../search/components/projects/filters/organizations"
import ProjectLocalisationsFilter from "../../../search/components/projects/filters/localisation"
import { useNetworkContext } from "../../context/hook"

export default function NetworkFiltersProjects({ as = "source" }: { as?: "source" | "model" }) {
  const {
    search: { data },
  } = useNetworkContext()
  const filterIds = data?.meta?.all_nodes?.map((node) => node.split("###")[0]) || []

  if (as === "source") {
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

  if (as === "model") {
    return (
      <Container fluid>
        <ProjectYearFilter filterParam="nfilters" filterIds={filterIds} forceApi="projects" />
        <hr className="fr-mt-3w" />
        <ProjectTypeFilter filterParam="nfilters" filterIds={filterIds} forceApi="projects" />
        <hr className="fr-mt-3w" />
        <ProjectOrganizationsFilter filterParam="nfilters" filterIds={filterIds} />
        <hr className="fr-mt-3w" />
        <ProjectLocalisationsFilter />
        <hr className="fr-mt-3w" />
      </Container>
    )
  }

  return null
}