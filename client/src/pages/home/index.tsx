import {
	Button,
	ButtonGroup,
	Col,
	Container,
	Link,
	Row,
	Title,
	useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { RawIntlProvider, createIntl, useIntl } from "react-intl";
import "./styles.scss";

const modules = import.meta.glob("./locales/*.json", {
	eager: true,
	import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
	const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
	if (locale) {
		return { ...acc, [locale]: modules[key] };
	}
	return acc;
}, {});

function MainBanner() {
	const intl = useIntl();
	return (
		<Container fluid className="main-banner">
			<Container>
				<Title as="h1">
					{intl.formatMessage({ id: "home.title" }, { br: () => <br /> })}
				</Title>
			</Container>
		</Container>
	);
}

function ObjectsBanner() {
	const intl = useIntl();
	return (
		<Container className="bg-grey" fluid>
			<Container className="fr-py-10w">
				<Row horizontalAlign="center">
					<Title as="h2" look="h5">
						{intl.formatMessage({ id: "home.objects.title" })}
					</Title>
				</Row>
				<Row className="search-object-list">
					<Col xs="6" lg="2">
						<div className="fr-p-2w search-object">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="100px"
								height="100px"
							>
								<use
									className="fr-artwork-decorative"
									href="/artwork/pictograms/buildings/school.svg#artwork-decorative"
								/>
								<use
									className="fr-artwork-minor"
									href="/artwork/pictograms/buildings/school.svg#artwork-minor"
								/>
								<use
									className="fr-artwork-major"
									href="/artwork/pictograms/buildings/school.svg#artwork-major"
								/>
							</svg>
							<Title as="h4" className="fr-mb-1w">
								{intl.formatMessage({ id: "home.objects.organizations" })}
							</Title>
							<hr className="fr-pb-2w" style={{ width: "60px" }} />
							<Link
								className="search-object-link fr-link fr-icon-arrow-right-line fr-link--icon-right"
								href="/search/organizations"
							>
								{intl.formatMessage({ id: "home.objects.link" })}
							</Link>
						</div>
					</Col>
					<Col xs="6" lg="2">
						<div className="fr-p-2w search-object">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="100px"
								height="100px"
							>
								<use
									className="fr-artwork-decorative"
									href="/artwork/pictograms/digital/avatar.svg#artwork-decorative"
								/>
								<use
									className="fr-artwork-minor"
									href="/artwork/pictograms/digital/avatar.svg#artwork-minor"
								/>
								<use
									className="fr-artwork-major"
									href="/artwork/pictograms/digital/avatar.svg#artwork-major"
								/>
							</svg>
							<Title as="h4" className="fr-mb-1w">
								{intl.formatMessage({ id: "home.objects.authors" })}
							</Title>
							<hr className="fr-pb-2w" style={{ width: "60px" }} />
							<Link
								className="search-object-link fr-link fr-icon-arrow-right-line fr-link--icon-right"
								href="/search/authors"
							>
								{intl.formatMessage({ id: "home.objects.link" })}
							</Link>
						</div>
					</Col>
					<Col xs="6" lg="2">
						<div className="fr-p-2w search-object">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="100px"
								height="100px"
							>
								<use
									className="fr-artwork-decorative"
									href="/artwork/pictograms/institutions/money.svg#artwork-decorative"
								/>
								<use
									className="fr-artwork-minor"
									href="/artwork/pictograms/institutions/money.svg#artwork-minor"
								/>
								<use
									className="fr-artwork-major"
									href="/artwork/pictograms/institutions/money.svg#artwork-major"
								/>
							</svg>
							<Title as="h4" className="fr-mb-1w">
								{intl.formatMessage({ id: "home.objects.projects" })}
							</Title>
							<hr className="fr-pb-2w" style={{ width: "60px" }} />
							<Link
								className="search-object-link fr-link fr-icon-arrow-right-line fr-link--icon-right"
								href="/search/projects"
							>
								{intl.formatMessage({ id: "home.objects.link" })}
							</Link>
						</div>
					</Col>
					<Col xs="6" lg="2">
						<div className="fr-p-2w search-object">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="100px"
								height="100px"
							>
								<use
									className="fr-artwork-decorative"
									href="/artwork/pictograms/leisure/book.svg#artwork-decorative"
								/>
								<use
									className="fr-artwork-minor"
									href="/artwork/pictograms/leisure/book.svg#artwork-minor"
								/>
								<use
									className="fr-artwork-major"
									href="/artwork/pictograms/leisure/book.svg#artwork-major"
								/>
							</svg>
							<Title as="h4" className="fr-mb-1w">
								{intl.formatMessage({ id: "home.objects.publications" })}
							</Title>
							<hr className="fr-pb-2w" style={{ width: "60px" }} />
							<Link
								className="search-object-link fr-link fr-icon-arrow-right-line fr-link--icon-right"
								href="/search/publications"
							>
								{intl.formatMessage({ id: "home.objects.link" })}
							</Link>
						</div>
					</Col>
					<Col xs="6" lg="2">
						<div className="fr-p-2w search-object">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="100px"
								height="100px"
							>
								<use
									className="fr-artwork-decorative"
									href="/artwork/pictograms/document/contract.svg#artwork-decorative"
								/>
								<use
									className="fr-artwork-minor"
									href="/artwork/pictograms/document/contract.svg#artwork-minor"
								/>
								<use
									className="fr-artwork-major"
									href="/artwork/pictograms/document/contract.svg#artwork-major"
								/>
							</svg>
							<Title as="h4" className="fr-mb-1w">
								{intl.formatMessage({ id: "home.objects.patents" })}
							</Title>
							<hr className="fr-pb-2w" style={{ width: "60px" }} />
							<Link
								className="search-object-link fr-link fr-icon-arrow-right-line fr-link--icon-right"
								href="/search/patents"
							>
								{intl.formatMessage({ id: "home.objects.link" })}
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

function NetworksBanner() {
	const intl = useIntl();
	const theme = document.documentElement.getAttribute("data-fr-theme");
	return (
		<Container
			fluid
			style={{
				backgroundColor: theme === "light" ? "#fff" : "#131313",
			}}
		>
			<Container
				fluid
				className={`home-graph-background-${theme}`}
				style={{ height: "400px" }}
			>
				<Container
					fluid
					style={{ height: "100%", backdropFilter: "blur(1px) contrast(80%)" }}
				>
					<Container style={{ height: "100%" }}>
						<Row style={{ height: "100%" }} verticalAlign="middle">
							<Col xs="12">
								<Title as="h4" style={{ maxWidth: "350px" }}>
									{intl.formatMessage({ id: "home.networks.title" })}
								</Title>
								<Button
									iconPosition="right"
									icon="arrow-right-line"
									as="a"
									href="/networks"
								>
									{intl.formatMessage({ id: "home.networks.link" })}
								</Button>
							</Col>
						</Row>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}

function ServicesBanner() {
	const intl = useIntl();
	return (
		<Container fluid>
			<Container className="fr-py-10w">
				<Row>
					<Title as="h4">
						{intl.formatMessage({ id: "home.services.title" })}
					</Title>
				</Row>
				<hr style={{ width: "50%" }} />
				<Row gutters className="fr-my-2w">
					<Col xs="12" sm="6" lg="4">
						<div className="fr-card">
							<div className="fr-card__header">
								<div className="fr-card__img">
									<img
										className="fr-responsive-img"
										src="/img/barometre.png"
										alt="Baromètre de la science ouverte"
									/>
								</div>
							</div>
							<div className="fr-card__body">
								<div className="fr-card__content">
									<h3 className="fr-card__title">
										{intl.formatMessage({
											id: "home.services.barometre.title",
										})}
									</h3>
									<p className="fr-card__desc">
										{intl.formatMessage({
											id: "home.services.barometre.tagline",
										})}
									</p>
								</div>
								<div className="fr-card__footer">
									<ButtonGroup isInlineFrom="lg">
										<Button
											iconPosition="right"
											icon="arrow-right-line"
											as="a"
											variant="secondary"
											href="https://barometredelascienceouverte.esr.gouv.fr/"
											target="_blank"
											rel="noreferrer noopener"
										>
											{intl.formatMessage({
												id: "home.services.barometre.link",
											})}
										</Button>
									</ButtonGroup>
								</div>
							</div>
						</div>
					</Col>
					<Col xs="12" sm="6" lg="4">
						<div className="fr-card">
							<div className="fr-card__header">
								<div className="fr-card__img">
									<img
										className="fr-responsive-img"
										src="/img/curiexplore.png"
										alt="Curie explore"
									/>
								</div>
							</div>
							<div className="fr-card__body">
								<div className="fr-card__content">
									<h3 className="fr-card__title">
										{intl.formatMessage({ id: "home.services.curie.title" })}
									</h3>
									<p className="fr-card__desc">
										{intl.formatMessage({ id: "home.services.curie.tagline" })}
									</p>
								</div>
								<div className="fr-card__footer">
									<ButtonGroup isInlineFrom="lg">
										<Button
											iconPosition="right"
											icon="arrow-right-line"
											as="a"
											variant="secondary"
											href="https://curiexplore.enseignementsup-recherche.gouv.fr/"
											target="_blank"
											rel="noreferrer noopener"
										>
											{intl.formatMessage({ id: "home.services.curie.link" })}
										</Button>
									</ButtonGroup>
								</div>
							</div>
						</div>
					</Col>
					<Col xs="12" sm="6" lg="4">
						<div className="fr-card">
							<div className="fr-card__header">
								<div className="fr-card__img">
									<img
										className="fr-responsive-img"
										src="https://dataesr.enseignementsup-recherche.pro/images/O967-BANDEAU_FR.png"
										alt="dataesr"
									/>
								</div>
							</div>
							<div className="fr-card__body">
								<div className="fr-card__content">
									<h3 className="fr-card__title">
										{intl.formatMessage({ id: "home.services.dataesr.title" })}
									</h3>
									<p className="fr-card__desc">
										{intl.formatMessage({
											id: "home.services.dataesr.tagline",
										})}
									</p>
								</div>
								<div className="fr-card__footer">
									<ButtonGroup isInlineFrom="lg">
										<Button
											iconPosition="right"
											icon="arrow-right-line"
											as="a"
											variant="secondary"
											href="https://data.esr.gouv.fr/FR/"
											target="_blank"
											rel="noreferrer noopener"
										>
											{intl.formatMessage({ id: "home.services.dataesr.link" })}
										</Button>
									</ButtonGroup>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

function OpendataBanner() {
	const intl = useIntl();
	return (
		<Container className="bg-grey fr-mb-10w" fluid>
			<Container className="fr-py-4w">
				<Row>
					<Col xs="12" md="8">
						<Title as="h4">
							{intl.formatMessage({ id: "home.opendata.title" })}
						</Title>
						<ButtonGroup isInlineFrom="lg">
							<Button
								iconPosition="right"
								icon="arrow-right-line"
								as="a"
								variant="secondary"
								href="https://data.esr.gouv.fr/FR/"
								target="_blank"
								rel="noreferrer noopener"
							>
								{intl.formatMessage({ id: "home.opendata.link" })}
							</Button>
						</ButtonGroup>
					</Col>
					<Col xs="12" offsetXs="4" md="3" offsetMd="1">
						<svg
							className="fr-artwork"
							aria-hidden="true"
							viewBox="0 0 80 80"
							width="150px"
							height="auto"
						>
							<use
								className="fr-artwork-decorative"
								href="/artwork/pictograms/digital/data-visualization.svg#artwork-decorative"
							/>
							<use
								className="fr-artwork-minor"
								href="/artwork/pictograms/digital/data-visualization.svg#artwork-minor"
							/>
							<use
								className="fr-artwork-major"
								href="/artwork/pictograms/digital/data-visualization.svg#artwork-major"
							/>
						</svg>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default function Home() {
	const { locale } = useDSFRConfig();
	const intl = createIntl({
		locale,
		messages: messages[locale],
	});
	return (
		<RawIntlProvider value={intl}>
			<MainBanner />
			<ObjectsBanner />
			<NetworksBanner />
			<ServicesBanner />
			<OpendataBanner />
		</RawIntlProvider>
	);
}
