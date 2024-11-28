import { Button, Container, Row, Text } from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import { VOSviewerOnline } from "vosviewer-online";
import type { Network } from "../../../../../types/network";
import { stringifySearchFiltersForURL } from "../../../../search/hooks/useUrl";

type OrganizationNetworkProps = {
	data: Network;
	value: string;
	label?: string;
};

export default function OrganizationNetwork({
	data: network,
	value,
	label,
}: OrganizationNetworkProps) {
	const intl = useIntl();

	if (!network) return null;

	const theme = document.documentElement.getAttribute("data-fr-scheme");
	const parameters = {
		largest_component: false,
		dark_ui: theme === "dark",
		simple_ui: true,
	};

	const networkFilter = stringifySearchFiltersForURL({
		"affiliations.id": {
			type: "terms",
			values: [{ value: value, label: label }],
		},
	});
	const networkUrl = `/networks?q=*&tab=domains&filters=${networkFilter}`;

	return (
		<>
			<Text size="sm">
				Ce graphique est un apperçu de notre outil d'exploration des réseaux et
				présente le réseaux des thématiques pour cet établissement. Rendez vous
				sur notre outil d'exploration des réseaux pour explorer les reseaux
				d'auteurs, d'établissements, de pays...
			</Text>
			{/* <Row horizontalAlign="left">
				<Button
					icon="arrow-right-s-line"
					iconPosition="right"
					as="a"
					href={networkUrl}
					variant="text"
				>
					Explorer tous les réseaux de l'établissement
				</Button>
			</Row> */}
			<Container fluid className="fr-mt-2w" style={{ height: "400px" }}>
				<VOSviewerOnline
					key={[value, theme]}
					data={network}
					parameters={parameters}
				/>
			</Container>
			<Text size="xs" className="fr-card__detail">
				{[
					"Ce graphique analyse les publications de l'organisme et présente un réseau thématique.",
					"Les noeuds correspondent à des thèmatiques de recherche et un lien entre deux noeuds indique qu'une publication traite les deux thèmes.",
					"Les noeuds sont classés par taille en fonction du nombre de publications associées.",
					"L'épaisseur des liens est proportionnelle au nombre de publications qui traitent des deux thèmes reliés.",
				].join("\n")}
			</Text>
		</>
	);
}
