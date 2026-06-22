import { Container } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context/hook"
import OrganizationKindFilter from "../../../search/components/organizations/filters/kind"
import OrganizationLevelFilter from "../../../search/components/organizations/filters/level"
import OrganizationSupervisorsFilter from "../../../search/components/organizations/filters/supervisors"
import OrganizationFunderFilter from "../../../search/components/organizations/filters/funders"
import OrganizationAgreementsFilter from "../../../search/components/organizations/filters/agreements"
import OrganizationAwardsFilter from "../../../search/components/organizations/filters/awards"
import OrganizationRegionsFilter from "../../../search/components/organizations/filters/regions"

export default function NetworkFiltersOrganizations() {
  const {
    search: { data },
  } = useNetworkContext()
  const filterIds = data?.meta?.all_nodes?.map((node) => node.split("###")[0]) || []

  return (
    <Container fluid>
      <OrganizationRegionsFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
      <OrganizationKindFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
      <OrganizationLevelFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
      <OrganizationSupervisorsFilter filterParam="nfilters" />
      <hr className="fr-mt-3w" />
      <OrganizationFunderFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
      <OrganizationAgreementsFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
      <OrganizationAwardsFilter filterParam="nfilters" filterIds={filterIds} forceApi="organizations" ignoreQuery />
      <hr className="fr-mt-3w" />
    </Container>
  )
}
