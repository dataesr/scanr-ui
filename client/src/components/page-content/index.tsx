import { Accordion, Col, Row, Text, Title } from "@dataesr/dsfr-plus";
import cs from "classnames";
import useScreenSize from "../../hooks/useScreenSize";
import "./styles.scss";

type PageSectionProps = {
	children: React.ReactNode;
	title: string;
	description?: React.ReactNode;
	action?: React.ReactNode;
	show: boolean;
	icon?: string;
	size?: "hero" | "lead" | "lg" | "md" | "sm" | "xs";
};

export function PageSection({
	children,
	title,
	icon,
	action,
	description = "",
	show = false,
	size = "md",
}: PageSectionProps) {
	const { screen } = useScreenSize();
	if (!show) {
		return null;
	}
	const titleCSS = cs("page-section__title", {
		[`fr-text--${size}`]: size !== "hero",
		"fr-h5": size === "hero",
		[`fr-icon-${icon}`]: icon,
		"fr-mb-1v": description,
		"fr-mb-0": !description,
	});
	const TitlePart = () => (
		<>
			<div
				style={{
					display: "flex",
					alignContent: "flex-start",
					alignItems: "center",
				}}
			>
				<div style={{ flexGrow: 1 }}>
					<Title as="h2" className={titleCSS}>
						{title}
					</Title>
				</div>
				{action && <div>{action}</div>}
			</div>
			{description && (
				<Text className="fr-card__detail" size="xs">
					{description}
				</Text>
			)}
		</>
	);
	if (["xs", "sm"].includes(screen)) {
		return <Accordion title={title}>{children}</Accordion>;
	}
	return (
		<Col xs="12">
			<section>
				<TitlePart />
				<div className="fr-py-3w">{children}</div>
			</section>
		</Col>
	);
}

export function PageContent({ children }: { children: React.ReactNode }) {
	const { screen } = useScreenSize();

	return (
		<Col xs="12">
			<Row gutters={!["xs", "sm"].includes(screen)}>
				{["xs", "sm"].includes(screen) ? (
					<ul className="fr-accordions-group">{children}</ul>
				) : (
					children
				)}
			</Row>
		</Col>
	);
}
