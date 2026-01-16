import { Link, Text, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import cn from "classnames";
import { useIntl } from "react-intl";
import LinkCard from "../../../../components/link-card";
import type { Participant } from "../../../../types/project";
import getLangFieldValue from "../../../../utils/lang";

type Data = Participant & {
	subParticipants: Participant[];
};

type ProjectParticipantsProps = {
	data: Data[];
	title?: string;
	description?: React.ReactNode;
	icon?: string;
	size?: "hero" | "lead" | "lg" | "md" | "sm" | "xs";
};

const TitlePart = ({ title, description, css}: { title: React.ReactNode, description?: React.ReactNode, css: string}) => (
		<>
			<Title as="h2" className={css}>
				{title}
			</Title>
			{description && (
				<Text className="fr-card__detail" size="xs">
					{description}
				</Text>
			)}
		</>
	);

export default function ProjectParticipants({
	title,
	description,
	size,
	icon,
	data = [],
}: ProjectParticipantsProps) {
	const { locale } = useDSFRConfig();
	const intl = useIntl();

	if (!(data.length > 0)) return null;

	const titleCSS = cn("page-section__title", {
		[`fr-text--${size}`]: size !== "hero",
		"fr-h5": size === "hero",
		[`fr-icon-${icon}`]: icon,
		"fr-mb-1v": description,
		"fr-mb-0": !description,
	});

	return (
		<div>
			{title && <TitlePart title={title} description={description} css={titleCSS} />}
			<div className="fr-py-3w">
				{data?.map((part, i) => (
					<div
						key={i}
						className={cn("fr-mb-2w", {
							"fr-border-bottom": i < data.length - 1,
						})}
					>
						<LinkCard type="organization" icon="building-line">
							<Text className="fr-m-0">
								{part.structure?.id ? (
									<Link href={`/organizations/${part.structure?.id}`}>
										{getLangFieldValue(locale)(part.structure?.label) ||
											part.label?.default?.split("__")?.[0]}
									</Link>
								) : (
									part.label?.default?.split("__")?.[0]
								)}
								{part.funding && (
									<Text className="fr-card__detail" size="sm">
										<i>
											{intl.formatMessage(
												{ id: "projects.section.participants.financed" },
												{
													funding: part.funding.toLocaleString(),
												},
											)}
										</i>
									</Text>
								)}
							</Text>
						</LinkCard>
						{part.subParticipants?.map((subPart, j) => (
							<div key={j} className="fr-mx-5w">
								<LinkCard type="prize" icon="corner-down-right">
									<Text className="fr-m-0">
										{subPart.structure?.id ? (
											<Link href={`/organizations/${subPart.structure?.id}`}>
												{getLangFieldValue(locale)(subPart.structure?.label)}
											</Link>
										) : (
											subPart.label?.default?.split("__")?.[0]
										)}
									</Text>
								</LinkCard>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
