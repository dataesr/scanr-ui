import {
	Button,
	ButtonGroup,
	Col,
	Container,
	Row,
	useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import Identifiers from "../../../../components/identifiers";
import MoreLikeThis from "../../../../components/more-like-this";
import { PageContent, PageSection } from "../../../../components/page-content";
import Share from "../../../../components/share";
import SocialMedias from "../../../../components/social-medias";
import Websites from "../../../../components/websites";
import useScreenSize from "../../../../hooks/useScreenSize";
import type { Organization } from "../../../../types/organization";
import { isInProduction } from "../../../../utils/helpers";
import getLangFieldValue from "../../../../utils/lang";
import OrganizationAgreements from "./agreements";
import OrganizationAwards from "./awards";
import OrganizationHeader from "./header";
import OrganizationLeaders from "./leaders";
import OrganizationLocalizations from "./localizations";
import OrganizationNetwork from "./network";
import { OrganizationNetworks, OrganizationNetworksBadges } from "./networks";
import CoInstitutions from "./networks/co-institutions";
import OngoingThesis from "./ongoing-thesis";
import OrganizationPatents from "./patents";
import OrganizationProjects from "./projects";
import OrganizationPublications from "./publications";
import OrganizationPublicationsDetection from "./publications-detection";

const NETWORK_BADGES_CODES = [
	"carnot",
	"gican",
	"gifas",
	"gicat",
	"rescurie",
	"itagricole",
	"irt",
	"polecompetitivite",
	"satt",
];

export default function OrganizationPresentation({
	data,
}: {
	data: Organization;
}) {
	const { locale } = useDSFRConfig();
	const intl = useIntl();
	const { publications, projects, patents, network } = data;
	const { screen } = useScreenSize();
	const networkBadges = data.badges?.filter((b) =>
		NETWORK_BADGES_CODES.includes(b.code.toLowerCase()),
	);

	const propre = data?.institutionOf
		?.filter((element) =>
			["établissement tutelle", "primary"].includes(element.relationType),
		)
		?.filter(
			(element) =>
				element.denormalized.institutions.length === 1 &&
				element.denormalized.institutions[0].structure === data.id,
		);
	const notPropre = data?.institutionOf
		?.filter((element) =>
			["établissement tutelle", "primary"].includes(element.relationType),
		)
		?.filter(
			(element) =>
				!(
					element.denormalized.institutions.length === 1 &&
					element.denormalized.institutions[0].structure === data.id
				),
		);

	const ongoingThesis = publications.byType?.find(
		(types) => types.value === "ongoing_thesis",
	);

	return (
			<Container fluid>
				<Row gutters={!["sm", "xs"].includes(screen)}>
					<Col xs="12" md="8">
						<Container fluid className="fr-mb-8w">
							<OrganizationHeader data={data} />
						</Container>
						<Container fluid>
							<PageContent>
									<PageSection
										show={data.id?.startsWith("ED") && ongoingThesis?.count > 0}
									>
										<OngoingThesis
											count={ongoingThesis?.count}
											value={data.id}
											label={getLangFieldValue(locale)(data.label)}
										/>
									</PageSection>
								<PageSection
									size="lead"
									title={intl.formatMessage({
										id: "organizations.section.agreements.title",
									})}
									show={!!data?.agreements?.length}
								>
									<OrganizationAgreements agreements={data?.agreements} />
								</PageSection>
								<PageSection
									size="lead"
									title={intl.formatMessage({
										id: "organizations.section.awards.title",
									})}
									show={!!data?.awards?.length}
								>
									<OrganizationAwards awards={data?.awards} />
								</PageSection>
								<PageSection
									size="lead"
									icon="team-line"
									title={intl.formatMessage({
										id: "organizations.section.leaders.title",
									})}
									show={!!data?.leaders?.length}
								>
									<OrganizationLeaders data={data?.leaders} />
								</PageSection>
								<PageSection
									size="lead"
									icon="git-branch-line"
									title={intl.formatMessage({
										id: "organizations.section.networks.title",
									})}
									show={
										!!(
											data?.institutions?.length ||
											data?.relations?.length ||
											data?.institutionOf?.length ||
											data?.relationOf?.length ||
											data.parents?.length ||
											data.parentOf?.length ||
											networkBadges?.length
										)
									}
								>
									<OrganizationNetworks
										data={data.institutions?.filter((institution) =>
											["établissement tutelle", "primary"].includes(
												institution.relationType,
											),
										)}
										titleKey="organizations.section.networks.supervisors.title"
										icon="building-line"
									/>
									<OrganizationNetworks
										data={propre}
										titleKey="organizations.section.networks.supervise.propre.title"
										icon="building-line"
									/>
									<OrganizationNetworks
										data={notPropre}
										titleKey="organizations.section.networks.supervise.notPropre.title"
										icon="building-line"
									/>
									<CoInstitutions
										orgId={data.id}
										institutionOfData={data.institutionOf}
										forType="tutelle"
									/>

									<OrganizationNetworks
										data={data.institutions?.filter(
											(institution) =>
												!["établissement tutelle", "primary"].includes(
													institution.relationType,
												),
										)}
										titleKey="organizations.section.networks.participants.title"
										icon="building-line"
									/>
									<OrganizationNetworks
										data={data.institutionOf?.filter(
											(institution) =>
												!["établissement tutelle", "primary"].includes(
													institution.relationType,
												),
										)}
										titleKey="organizations.section.networks.participate-to.title"
										icon="building-line"
									/>
									<CoInstitutions
										orgId={data.id}
										institutionOfData={data.institutionOf}
										forType="participant"
									/>
									<OrganizationNetworks
										data={data.parents}
										titleKey="organizations.section.networks.groups.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.parentOf}
										titleKey="organizations.section.networks.is-grouped.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relations?.filter((e) => e.type === "DS_LABS")}
										titleKey="organizations.section.networks.doctoral-schools.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relationOf?.filter((e) => e.type === "DS_LABS")}
										titleKey="organizations.section.networks.linked-to.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relations?.filter(
											(e) => e.type === "satt_actionnaire",
										)}
										titleKey="organizations.section.networks.satt.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relationOf?.filter(
											(e) => e.type === "satt_actionnaire",
										)}
										titleKey="organizations.section.networks.satt-of.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relations?.filter(
											(e) => e.type === "incubateur_public",
										)}
										titleKey="organizations.section.networks.incubateur.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relationOf?.filter(
											(e) => e.type === "incubateur_public",
										)}
										titleKey="organizations.section.networks.incubateur-of.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relations?.filter(
											(e) => e.type === "membre_carnot",
										)}
										titleKey="organizations.section.networks.carnot.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relations?.filter(
											(e) => e.type === "rachete_par",
										)}
										titleKey="organizations.section.networks.eaten.title"
										icon="community-fill"
									/>
									<OrganizationNetworks
										data={data.relationOf?.filter(
											(e) => e.type === "rachete_par",
										)}
										titleKey="organizations.section.networks.eat.title"
										icon="community-fill"
									/>
									{/*
                  TODO: Uncomment when the data is available
                  <OrganizationNetworks
                    data={data.relations?.filter(
                      (item) =>
                        (item.type || "").indexOf("spinoff") !== -1 || false
                    )}
                    titleKey="organizations.section.networks.spinnof.title"
                    icon="community-fill"
                  />
                  <OrganizationNetworks
                    data={data.relationOf?.filter(
                      (item) =>
                        (item.type || "").indexOf("spinoff") !== -1 || false
                    )}
                    titleKey="organizations.section.networks.spinnof-of.title"
                    icon="community-fill"
                  /> */}
									<OrganizationNetworksBadges
										data={networkBadges}
										titleKey="organizations.section.networks.badges.title"
										icon="links-fill"
									/>
								</PageSection>
								<PageSection
									size="lead"
									icon="heart-pulse-line"
									title={intl.formatMessage({
										id: "organizations.section.activities.title",
									})}
									show={
										!!(
											publications.publicationsCount ||
											projects.projectsCount ||
											patents.patentsCount
										)
									}
								>
									<OrganizationPublications
										data={publications}
										value={data.id}
										label={getLangFieldValue(locale)(data.label)}
									/>
									{!isInProduction() && (
										<OrganizationPublicationsDetection
											data={publications}
											value={data.id}
											label={getLangFieldValue(locale)(data.label)}
										/>
									)}
									<OrganizationNetwork
										data={network}
										value={data.id}
										label={getLangFieldValue(locale)(data.label)}
									/>
									<OrganizationProjects
										data={projects}
										value={data.id}
										label={getLangFieldValue(locale)(data.label)}
									/>
									<OrganizationPatents
										data={patents}
										value={data.id}
										label={getLangFieldValue(locale)(data.label)}
									/>
								</PageSection>
								<PageSection
									size="lead"
									title={intl.formatMessage({
										id: "organizations.section.more-like-this",
									})}
									icon="building-line"
									show
								>
									<MoreLikeThis
										id={data._id}
										api="organizations"
										filters={[{ term: { "level.keyword": data.level } }]}
									/>
								</PageSection>
								<PageSection
									title="Data JSON"
									description=""
									show={import.meta.env.DEV}
								>
									<div>
										<pre>{JSON.stringify(data || "", null, 2)}</pre>
									</div>
								</PageSection>
							</PageContent>
						</Container>
					</Col>
					<Col xs="12" md="4" xl="3" offsetXl="1">
						<PageContent>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.localization.title",
								})}
								show={!!data.address?.length}
							>
								<OrganizationLocalizations data={data?.address} />
							</PageSection>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.web.title",
								})}
								show={!!data?.links?.length}
							>
								<Websites data={data.links} />
							</PageSection>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.social-medias.title",
								})}
								show={!!data?.socialMedias?.length}
							>
								<SocialMedias data={data?.socialMedias} />
							</PageSection>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.identifiers.title",
								})}
								description={intl.formatMessage({ id: "organizations.copy" })}
								show={!!data?.externalIds?.length}
							>
								<Identifiers data={data?.externalIds} />
							</PageSection>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.share.title",
								})}
								show
							>
								<Share />
							</PageSection>
							<PageSection
								title={intl.formatMessage({
									id: "organizations.section.contribute.title",
								})}
								show
							>
								<ButtonGroup>
									<Button
										as="a"
										href={`/bugs/organizations/${data.id}`}
										color="error"
										variant="tertiary"
										icon="bug-line"
										iconPosition="left"
									>
										{intl.formatMessage({
											id: "organizations.section.contribute.button-label",
										})}
									</Button>
								</ButtonGroup>
							</PageSection>
						</PageContent>
					</Col>
				</Row>
			</Container>
	);
}
