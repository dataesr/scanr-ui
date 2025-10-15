import { Col, Link, Row, Text } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { getAuthorById } from "../../../../../api/authors/[id]";
import LinkCard from "../../../../../components/link-card";

export default function Directors({ authors }) {
	const intl = useIntl();
	const queryClient = useQueryClient();
	if (!authors.length) return null;
	const directors =
		authors?.filter((author) => author.role === "directeurthese") || [];

	function prefetch(id: string) {
		if (!id) return;
		queryClient.prefetchQuery({
			queryKey: ["author", id],
			queryFn: () => getAuthorById(id),
		});
	}

	return (
		<Row gutters>
			<Col xs="12">
				<Row gutters>
					{directors.map((dir) => (
						<Col key={dir.fullName} xs="12" md="6">
							<LinkCard
								prefetch={dir.person ? () => prefetch(dir.person) : undefined}
								type="author"
								icon="user-heart-line"
							>
								<Text className="fr-text-mention--grey fr-mb-0" size="sm">
									<i>
										{intl.formatMessage({
											id: `publications.section.jury.${dir.role}`,
										})}
									</i>
								</Text>
								{dir.person ? (
									<Link
										className="fr-text--bold"
										href={`/authors/${dir.person}`}
									>
										{dir.fullName}
									</Link>
								) : (
									<Text bold className="fr-m-0">
										{dir.fullName}
									</Text>
								)}
							</LinkCard>
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	);
}
