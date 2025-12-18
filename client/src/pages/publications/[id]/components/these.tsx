import {
	Badge,
	BadgeGroup,
	Button,
	ButtonGroup,
	Col,
	Container,
	Link,
	Row,
	Text,
	useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import LinkCard from "../../../../components/link-card";
import Map from "../../../../components/map";
import Modal from "../../../../components/modal";
import { PageContent, PageSection } from "../../../../components/page-content";
import Share from "../../../../components/share";
import Wiki from "../../../../components/wiki";
import useScreenSize from "../../../../hooks/useScreenSize";
import getLangFieldValue from "../../../../utils/lang";
import { encode } from "../../../../utils/string";
import Author from "./author";
import Directors from "./directors";
import OngoingThesisHeader from "./header/ongoing";
import ThesisHeader from "./header/thesis";
import Jury from "./jury";

export default function These({ data }) {
	const { locale } = useDSFRConfig();
	const { screen } = useScreenSize();
	const intl = useIntl();
	const keywords =
		data.domains
			?.filter((domain) => domain.type === "keyword")
			.map((domain) => getLangFieldValue(locale)(domain.label)) || [];
	const wikis =
		data.domains?.filter((domain) => domain.type === "wikidata") || [];
	const affiliations =
		data.affiliations?.filter((affiliation) => affiliation.label) || [];
	const markers =
		data?.affiliations
			?.filter(
				({ mainAddress }) => mainAddress?.gps?.lat && mainAddress?.gps?.lon,
			)
			.map(({ mainAddress }) => ({
				latLng: [mainAddress?.gps?.lat, mainAddress?.gps?.lon],
				address: `${mainAddress?.address},
          ${mainAddress?.postcode}, ${mainAddress?.city},
          ${mainAddress?.country}`,
			})) || [];

	return (
		<Container fluid>
			<Row gutters={!["sm", "xs"].includes(screen)}>
				<Col xs="12" md="8">
					<Container fluid className="fr-mb-6w">
						{data?.id?.startsWith("nnts") ? (
							<OngoingThesisHeader data={data} />
						) : (
							<ThesisHeader data={data} />
						)}
					</Container>
					<Container fluid>
						<PageContent>
							<PageSection
								size="lead"
								title={intl.formatMessage({
									id: "publications.section.author",
								})}
								show={data.authors}
							>
								<Author authors={data.authors} />
							</PageSection>
							<PageSection
								size="lead"
								title={intl.formatMessage({ id: "publications.section.directors" })}
								show={!!data.authors?.length && data.type === "ongoing_thesis"}
							>
								<Directors authors={data.authors} />
							</PageSection>
							<PageSection
								size="lead"
								title={intl.formatMessage({ id: "publications.section.jury" })}
								show={!!data.authors?.length && data.type !== "ongoing_thesis"}
							>
								<Jury authors={data.authors} />
							</PageSection>
							<PageSection
								size="lead"
								title={intl.formatMessage({
									id: "publications.section.affiliations",
								})}
								show={!!affiliations?.length}
								action={
									markers.length > 0 && (
										<Text className="fr-text--sm">
											<span className="fr-icon-map-pin-2-line fr-icon--sm fr-mr-1v" />
											<Link
												role="button"
												href={null}
												data-fr-opened="false"
												aria-controls="affiliations-map"
											>
												{intl.formatMessage({
													id: "publications.section.affiliations.map",
												})}
											</Link>
										</Text>
									)
								}
							>
								<>
									{affiliations
										.filter((affiliation) => affiliation.id)
										.map((affiliation, i) => (
											<LinkCard
												key={i}
												type="organization"
												icon="building-line"
											>
												<Text className="fr-m-0">
													<Link href={`/organizations/${affiliation.id}`}>
														{getLangFieldValue(locale)(affiliation.label)}
													</Link>
													{affiliation.mainAddress?.city && (
														<Text
															className="fr-text-mention--grey fr-mb-0"
															size="sm"
														>
															<em>{affiliation.mainAddress.city}</em>
														</Text>
													)}
												</Text>
											</LinkCard>
										))}
									{markers.length > 0 ? (
										<Modal
											id="affiliations-map"
											size="xl"
											title={intl.formatMessage({
												id: "publications.section.affiliations.map-title",
											})}
										>
											<div
												style={{
													height: "400px",
													width: "100%",
													marginBottom: "6rem",
												}}
											>
												<Map markers={markers} height="400px" width="100%" />
											</div>
										</Modal>
									) : null}
								</>
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
				<Col md="4" lg="3" offsetLg="1">
					<PageContent>
						<PageSection
							title={intl.formatMessage({ id: "publications.section.access" })}
							show={!!(data.pdfUrl || data.landingPage)}
						>
							<ButtonGroup size="sm">
								{data.pdfUrl && (
									<Button
										as="a"
										href={data.pdfUrl}
										target="_blank"
										icon="file-download-line"
										iconPosition="right"
									>
										{intl.formatMessage({
											id: "publications.section.access.download-thesis",
										})}
									</Button>
								)}
								{data.landingPage && (
									<Button
										as="a"
										href={data.landingPage}
										target="_blank"
										variant="tertiary"
										icon="external-link-line"
										iconPosition="right"
									>
										{intl.formatMessage({
											id: "publications.section.access.visit-thesis",
										})}
									</Button>
								)}
							</ButtonGroup>
						</PageSection>
						<PageSection title="Mots-clés" show={!!keywords?.length}>
							<BadgeGroup>
								{keywords?.map((keyword) => (
									<Badge
										as="a"
										key={keyword}
										size="sm"
										href={`/search/publications?q="${keyword}"`}
									>
										{keyword}
									</Badge>
								))}
							</BadgeGroup>
						</PageSection>
						<PageSection
							title={intl.formatMessage({ id: "publications.section.wikis" })}
							show={!!wikis?.length}
						>
							<Wiki wikis={wikis} />
						</PageSection>
						<PageSection
							title={intl.formatMessage({ id: "publications.section.share" })}
							show
						>
							<Share />
						</PageSection>
						<PageSection
							title={intl.formatMessage({
								id: "publications.section.contribute",
							})}
							show
						>
							<ButtonGroup>
								<Button
									as="a"
									href={`/bugs/publications/${encode(data.id)}`}
									color="error"
									variant="tertiary"
									icon="bug-line"
									iconPosition="left"
								>
									{intl.formatMessage({ id: "publications.signals.bug" })}
								</Button>
							</ButtonGroup>
						</PageSection>
					</PageContent>
				</Col>
			</Row>
		</Container>
	);
}
