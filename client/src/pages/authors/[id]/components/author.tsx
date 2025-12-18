import {
	Badge,
	BadgeGroup,
	Button,
	ButtonGroup,
	Col,
	Container,
	Row,
	Title,
} from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import BarLink from "../../../../components/bar-link";
import Identifiers from "../../../../components/identifiers";
import MoreLikeThis from "../../../../components/more-like-this";
import NetworksNotice from "../../../../components/networks-notice";
import OpenAccessDonut from "../../../../components/oa-donut";
import { PageContent, PageSection } from "../../../../components/page-content";
import Share from "../../../../components/share";
import TagCloud from "../../../../components/tag-cloud";
import Websites from "../../../../components/websites";
import YearBars from "../../../../components/year-bars";
import type { Author } from "../../../../types/author";
import { stringifySearchFiltersForURL } from "../../../search/hooks/useUrl";
import AuthorAwards from "./awards";
import AuthorsPublications from "./publications";
import RecentAffiliations from "./recent-affiliations";

function getOaInfo(publi) {
	const oaCount = publi?.filter((publi) => publi.isOa)?.length;
	const oaTotal = publi?.length;
	return { oaPercent: Math.ceil((oaCount / oaTotal) * 100), oaCount, oaTotal };
}

export default function AuthorPage({ data }: { data: Author }) {
	const intl = useIntl();
	const { publications: publicationsObject, awards } = data;
	const { coAuthors, reviews, byYear, publications } = publicationsObject;

	const maxCommonPublications =
		coAuthors && Math.max(...coAuthors.map((el) => el.count));
	const maxReviews = reviews && Math.max(...reviews.map((el) => el.count));
	const thesis = publications?.filter((publi) => {
		return (
			publi.type === "thesis" &&
			publi.authors.find((author) => author.person === data.id)?.role ===
				"author"
		);
	});
	const thesisParticipations = publications?.filter((publi) => {
		return (
			publi.type === "thesis" &&
			publi.authors.find((author) => author.person === data.id)?.role !==
				"author" &&
			publi.authors.find((author) => author.person === data.id)?.role !==
				"directeurthese"
		);
	});
	const ongoingDirections = publications?.filter((publi) => {
		return (
			publi.type === "ongoing_thesis" &&
			publi.authors.find((author) => author.person === data.id)?.role ===
				"directeurthese"
		);
	});
	const thesisDirections = publications?.filter((publi) => {
		return (
			publi.type === "thesis" &&
			publi.authors.find((author) => author.person === data.id)?.role ===
				"directeurthese"
		);
	});
	const others = publications?.filter((publi) => publi.type !== "thesis");

	const networkFilter = stringifySearchFiltersForURL({
		"authors.person": {
			type: "terms",
			values: [{ value: data?.id, label: data?.fullName }],
		},
	});
	const networkUrl = `/networks?q=*&tab=authors&filters=${networkFilter}`;

	const alternativeNameForm =
		data?.firstName &&
		`"${data?.firstName
			?.split(" ")
			?.map((el) => el[0])
			?.join(" ")} ${data.lastName}"`;
	const nameForms = [`"${data?.fullName}"`, alternativeNameForm]
		.filter(Boolean)
		.join("|");
	const suggestUrl = `/suggest/${data.id}?q=(${nameForms})`;

	const { oaPercent } = getOaInfo(publications);

	return (
		<Container fluid>
			<Row gutters>
				<Col xs="12" lg="8">
					<Row gutters>
						<Col xs="12">
							<BadgeGroup>
								<Badge variant="info" noIcon>
									{intl.formatMessage({ id: "authors.section.author" })}
								</Badge>
							</BadgeGroup>
							<Title className="fr-mb-3w" as="h1" look="h4">
								{data?.fullName}
							</Title>
						</Col>
						<PageContent>
							<PageSection
								icon="lightbulb-line"
								size="lead"
								show={!!data?.wikis?.length}
								title={intl.formatMessage({ id: "authors.section.wiki.title" })}
								description={intl.formatMessage({
									id: "authors.section.wiki.desc",
								})}
							>
								<TagCloud data={data?.wikis} order="random" />
							</PageSection>
							<PageSection
								size="lead"
								show={!!data.recentAffiliations?.length}
								title={intl.formatMessage({
									id: "authors.section.recent-affiliations.title",
								})}
								description={intl.formatMessage({
									id: "authors.section.recent-affiliations.description",
								})}
							>
								<RecentAffiliations
									data={data.recentAffiliations}
									authorId={data.id}
									authorName={data.fullName}
								/>
							</PageSection>
							<PageSection
								icon="trophy-line"
								size="lead"
								show={!!awards?.length}
								title={intl.formatMessage({ id: "authors.section.prizes" })}
							>
								<AuthorAwards data={data?.awards} />
							</PageSection>
							<PageSection
								icon="article-line"
								size="lead"
								show={!!thesis?.length}
								title={intl.formatMessage(
									{ id: "authors.section.activity.thesis" },
									{ count: thesis.length },
								)}
							>
								<AuthorsPublications
									data={thesis}
									titleKey="authors.section.activity.thesis"
								/>
							</PageSection>
							<PageSection
								size="lead"
								show={!!others?.length}
								title={intl.formatMessage(
									{ id: "authors.section.activity.publications" },
									{ count: others.length },
								)}
								icon="heart-pulse-line"
							>
								<AuthorsPublications
									data={others}
									titleKey="authors.section.activity.publications"
								/>
								{data?.publications?.coAuthors?.length > 2 && (
									<div className="fr-mt-2w">
										<NetworksNotice url={networkUrl} />
									</div>
								)}
							</PageSection>
							<PageSection
								size="lead"
								icon="stethoscope-line"
								show={!!ongoingDirections?.length}
								title={intl.formatMessage(
									{ id: "authors.section.activity.thesis-ongoing-directions" },
									{ count: ongoingDirections.length },
								)}
							>
								<AuthorsPublications
									data={ongoingDirections}
									titleKey="authors.section.activity.thesis-ongoing-directions"
								/>
							</PageSection>
							<PageSection
								size="lead"
								icon="stethoscope-line"
								show={!!thesisDirections?.length}
								title={intl.formatMessage(
									{ id: "authors.section.activity.thesis-directions" },
									{ count: thesisDirections.length },
								)}
							>
								<AuthorsPublications
									data={thesisDirections}
									titleKey="authors.section.activity.thesis-directions"
								/>
							</PageSection>
							<PageSection
								size="lead"
								icon="stethoscope-line"
								show={!!thesisParticipations?.length}
								title={intl.formatMessage(
									{ id: "authors.section.activity.thesis-participations" },
									{ count: thesisParticipations.length },
								)}
							>
								<AuthorsPublications
									data={thesisParticipations}
									titleKey="authors.section.activity.thesis-participations"
								/>
							</PageSection>
							<PageSection
								size="lead"
								title={intl.formatMessage({
									id: "authors.section.more-like-this",
								})}
								icon="user-line"
								show
							>
								<MoreLikeThis
									id={data._id}
									api="authors"
									filters={[
										{
											bool: {
												must_not: {
													terms: {
														"id.keyword": coAuthors.map(
															(author) => author.value,
														),
													},
												},
											},
										},
									]}
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
					</Row>
				</Col>
				<Col xs="12" md="4" xl="3" offsetXl="1">
					<PageContent>
						<PageSection
							show
							title={intl.formatMessage({
								id: "authors.section.identifiers.title",
							})}
							description={intl.formatMessage({
								id: "authors.section.identifiers.desc",
							})}
						>
							<Identifiers data={data.externalIds} />
						</PageSection>
						<PageSection
							show={
								!!data.externalIds?.filter((identifier) => identifier.url)
									.length
							}
							title={intl.formatMessage({
								id: "authors.section.web.title",
							})}
						>
							<Websites
								data={data.externalIds?.filter((identifier) => identifier.url)}
							/>
						</PageSection>
						<PageSection
							show={!!byYear?.length}
							title={intl.formatMessage({
								id: "authors.section.by-year.title",
							})}
							description={intl.formatMessage({
								id: "authors.section.by-year.desc",
							})}
						>
							<YearBars
								name="Publications"
								counts={byYear.map((year) => year.count)}
								years={byYear.map((year) => year.label)}
							/>
						</PageSection>
						<PageSection
							show={!!oaPercent}
							title={intl.formatMessage({ id: "authors.section.oa.title" })}
							description={intl.formatMessage({
								id: "authors.section.oa.desc",
							})}
						>
							<OpenAccessDonut percentage={oaPercent} />
						</PageSection>
						<PageSection
							show={!!coAuthors?.length}
							title={intl.formatMessage({
								id: "authors.section.co-authors.title",
							})}
							description={intl.formatMessage({
								id: "authors.section.co-authors.desc",
							})}
						>
							{coAuthors?.slice(0, 6)?.map((coAuthor, i) => (
								<BarLink
									key={i}
									name={coAuthor.label}
									count={coAuthor.count}
									width={(coAuthor.count * 100) / maxCommonPublications}
									href={`/authors/${coAuthor.value}`}
								/>
							))}
						</PageSection>
						<PageSection
							show={!!reviews?.length}
							title={intl.formatMessage({
								id: "authors.section.reviews.title",
							})}
							description={intl.formatMessage({
								id: "authors.section.reviews.desc",
							})}
						>
							{reviews?.slice(0, 6)?.map((review, i) => (
								<BarLink
									key={i}
									name={review.label}
									count={review.count}
									width={(review.count * 100) / maxReviews}
									href={`/search/publications?q="${review.label}"`}
								/>
							))}
						</PageSection>
						<PageSection
							show
							title={intl.formatMessage({ id: "authors.section.share" })}
						>
							<Share />
						</PageSection>
						<PageSection
							title={intl.formatMessage({
								id: "authors.section.contribute.title",
							})}
							show
						>
							<ButtonGroup>
								<Button
									as="a"
									href={suggestUrl}
									variant="tertiary"
									icon="links-line"
									iconPosition="left"
								>
									{intl.formatMessage({ id: "authors.signals.publications" })}
								</Button>
								<Button
									as="a"
									href={`/bugs/authors/${data.id}`}
									color="error"
									variant="tertiary"
									icon="bug-line"
									iconPosition="left"
								>
									{intl.formatMessage({ id: "authors.signals.bug" })}
								</Button>
							</ButtonGroup>
						</PageSection>
					</PageContent>
				</Col>
			</Row>
		</Container>
	);
}
