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
  Title,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { Project } from "../../../../types/project";
import CopyBadge from "../../../../components/copy/copy-badge";
import { PageContent, PageSection } from "../../../../components/page-content";
import Map from "../../../../components/map";
import Truncate from "../../../../components/truncate";
import LinkCard from "../../../../components/link-card";
import { useIntl } from "react-intl";
import getLangFieldValue from "../../../../utils/lang";
import Modal from "../../../../components/modal";
import ProjectsPublications from "./publications";
import ProjectParticipants from "./participants";
import Websites from "../../../../components/websites";
import ProjectProgram from "./programs";
import Share from "../../../../components/share";
import MoreLikeThis from "../../../../components/more-like-this";

function calculateAccomplishment(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const _startDate = new Date(startDate);
  const _endDate = new Date(endDate);
  const currentDate = new Date();
  const totalDuration = _endDate.getTime() - _startDate.getTime();
  const elapsedDuration = currentDate.getTime() - _startDate.getTime();
  const percentAccomplishment = Math.floor(
    (elapsedDuration / totalDuration) * 100
  );
  if (percentAccomplishment < 0) return 0;
  if (percentAccomplishment > 100) return 100;
  return percentAccomplishment;
}

const typeLogoMapping = {
  anr: "/img/logo/logo-anr-20ans.png",
  h2020: "/img/logo/logo-europe.svg",
  "horizon europe": "/img/logo/logo-europe.svg",
  fp7: "/img/logo/logo-fp7.svg",
};

const frenchFirstSorter = (a) => {
  if (a?.structure?.mainAddress?.country === "France") return -1;
  return 1;
};

const getParticipants = (type, participants) => {
  if (type !== "H2020") return participants || [];
  return participants
    .filter((part) => part.label?.default?.slice(-1) === "0")
    .sort(frenchFirstSorter);
};

const getSubParticipants = (type, participants, id) => {
  if (type !== "H2020") return null;
  return participants.filter(
    (part) =>
      part.label?.default?.split("__")[2].slice(0, -2) === id &&
      part.label?.default?.slice(-1) !== "0"
  );
};

export default function ProjectPresentation({ data }: { data: Project }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();

  const markers =
    data?.participants
      ?.filter(
        ({ structure }) =>
          structure?.mainAddress?.gps?.lat && structure?.mainAddress?.gps?.lon
      )
      .map(({ structure }) => ({
        latLng: [
          structure?.mainAddress?.gps?.lat,
          structure?.mainAddress?.gps?.lon,
        ],
        address: `${structure.mainAddress?.address},
          ${structure.mainAddress?.postcode}, ${structure.mainAddress?.city},
          ${structure.mainAddress?.country}`,
      })) || [];

  const state = data.endDate
    ? new Date(data.endDate) < new Date()
      ? "completed"
      : "progress"
    : null;

  const stateDate =
    state === "completed"
      ? new Date(data.endDate).toLocaleDateString()
      : new Date(data.startDate).toLocaleDateString();

  const accomplishment = calculateAccomplishment(data.startDate, data.endDate);
  const fundingPercent =
    data.budgetTotal && data.budgetFinanced
      ? Math.floor((data.budgetFinanced / data.budgetTotal) * 100)
      : null;

  const logoUrl = typeLogoMapping[data.type?.toLowerCase()] || null;

  const coordinator = data?.participants?.find((part) =>
    ["coordinator", "coordinateur"].includes(part.role)
  );

  const participantsWithSubParticipants = getParticipants(
    data.type,
    data.participants
  ).map((part) => {
    const subParticipants = getSubParticipants(
      data.type,
      data.participants,
      part.label?.default?.split("__")[2]?.slice(0, -2)
    );
    return { ...part, subParticipants };
  });

  const frenchParticipants = participantsWithSubParticipants.filter(
    (part) =>
      part?.structure && part.structure.mainAddress?.country === "France"
  );
  const foreignParticipants = participantsWithSubParticipants.filter(
    (part) =>
      part?.structure && part.structure.mainAddress?.country !== "France"
  );
  const undefinedParticipants = participantsWithSubParticipants.filter(
    (part) => !part?.structure
  );

  return (
    <>
      <Container fluid>
        <Row gutters>
          <Col xs="12" md="8">
            <Container fluid className="fr-mb-8w">
              <div
                style={{ display: "flex", flexWrap: "nowrap" }}
                className="fr-my-1v"
              >
                <div style={{ flexGrow: 1 }}>
                  <BadgeGroup className="structure-badge-list fr-mt-1v">
                    <Badge size="sm" color="green-emeraude">
                      {data.type}
                    </Badge>
                  </BadgeGroup>
                  <Title className="fr-mb-0" as="h1" look="h5">
                    {getLangFieldValue(locale)(data.label)}
                    {getLangFieldValue(locale)(data.acronym) && (
                      <span> ({getLangFieldValue(locale)(data.acronym)})</span>
                    )}
                  </Title>
                  {data?.year && (
                    <Text className="fr-card__detail" size="sm">
                      <i>
                        {intl.formatMessage(
                          { id: "projects.section.header.year" },
                          { year: data.year }
                        )}
                      </i>
                    </Text>
                  )}
                </div>
                {logoUrl && (
                  <div>
                    <img
                      style={{ maxHeight: "100px" }}
                      width="auto"
                      height="auto"
                      src={logoUrl}
                      alt={`Logo ${data.type}`}
                      className="fr-mx-1v"
                    />
                  </div>
                )}
              </div>
              <Truncate lines={10} className="fr-mt-2w">
                <Text size="sm" className="fr-mb-0">
                  {getLangFieldValue(locale)(data.description)}
                </Text>
              </Truncate>
            </Container>
            <PageContent>
              <PageSection
                size="lead"
                show={
                  getLangFieldValue(locale)(data.action?.label) ||
                  data.call?.label ||
                  data.domains?.filter(({ type }) => type === "topic")
                    ?.length ||
                  data.domains?.filter(({ type }) => type === "priorities")
                    ?.length
                }
                title={intl.formatMessage({ id: "projects.section.programs" })}
              >
                <ProjectProgram
                  show={getLangFieldValue(locale)(data.action?.label)}
                  title={intl.formatMessage({
                    id: "projects.section.programs.tool",
                  })}
                >
                  {data.action?.id}
                  {" – "}
                  {getLangFieldValue(locale)(data.action?.label)}
                </ProjectProgram>
                <ProjectProgram
                  show={!!data.call?.label && !!data.call?.id}
                  title={intl.formatMessage({
                    id: "projects.section.programs.call",
                  })}
                >
                  {data.call?.id}
                  {" – "}
                  {data.call?.label}
                </ProjectProgram>
                <ProjectProgram
                  show={
                    !!data.domains?.filter(({ type }) => type === "topic")
                      ?.length
                  }
                  title={intl.formatMessage({
                    id: "projects.section.programs.topics",
                  })}
                >
                  {data.domains
                    ?.filter(({ type }) => type === "topic")
                    .map(({ label }) => getLangFieldValue(locale)(label))
                    .join(" – ")}
                </ProjectProgram>
                <ProjectProgram
                  show={
                    !!data.domains?.filter(({ type }) => type === "priorities")
                      ?.length
                  }
                  title={intl.formatMessage({
                    id: "projects.section.programs.priorities",
                  })}
                >
                  {data.domains
                    ?.filter(({ type }) => type === "priorities")
                    .map(({ label }) => getLangFieldValue(locale)(label))
                    .join(" – ")}
                </ProjectProgram>
              </PageSection>
              <PageSection
                size="lead"
                show={!!participantsWithSubParticipants?.length}
                title={intl.formatMessage(
                  { id: "projects.section.participants" },
                  { count: participantsWithSubParticipants?.length }
                )}
                action={
                  markers.length > 0 && (
                    <Text className="fr-text--sm">
                      <span className="fr-icon-map-pin-2-line fr-icon--sm fr-mr-1v" />
                      <Link
                        role="button"
                        href={null}
                        data-fr-opened="false"
                        aria-controls="participants-map"
                      >
                        {intl.formatMessage({
                          id: "projects.section.participants.map",
                        })}
                      </Link>
                    </Text>
                  )
                }
              >
                <Row gutters>
                  <Col xs="12">
                    <ProjectParticipants
                      size="md"
                      title={intl.formatMessage({
                        id: "projects.section.participants.french",
                      })}
                      data={frenchParticipants}
                    />
                    <ProjectParticipants
                      size="md"
                      title={intl.formatMessage({
                        id: "projects.section.participants.foreign",
                      })}
                      data={foreignParticipants}
                    />
                    <ProjectParticipants
                      size="md"
                      data={undefinedParticipants}
                    />
                  </Col>
                  {markers.length > 0 ? (
                    <Modal
                      id="participants-map"
                      size="xl"
                      title={intl.formatMessage({
                        id: "projects.section.participants.map-title",
                      })}
                    >
                      <Col xs="12">
                        <div
                          style={{
                            height: "400px",
                            width: "100%",
                            marginBottom: "6rem",
                          }}
                        >
                          <Map markers={markers} height="400px" width="100%" />
                        </div>
                      </Col>
                    </Modal>
                  ) : null}
                </Row>
              </PageSection>
              <PageSection
                size="lead"
                icon="stethoscope-line"
                show={!!data?.publications?.length}
                title={intl.formatMessage(
                  { id: "projects.section.publications" },
                  { count: data?.publications?.length }
                )}
              >
                <ProjectsPublications
                  data={data?.publications}
                  titleKey="projects.section.publications"
                />
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({
                  id: "projects.section.more-like-this",
                })}
                icon="article-line"
                show
              >
                <MoreLikeThis id={data._id} api="projects" />
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
          </Col>
          <Col xs="12" md="4" xl="3" offsetXl="1">
            <PageContent>
              <PageSection
                show
                title={intl.formatMessage({
                  id: "projects.section.state.title",
                })}
                description={
                  state
                    ? intl.formatMessage(
                      { id: `projects.section.state.${state}` },
                      { date: stateDate }
                    )
                    : intl.formatMessage({
                      id: "projects.section.state.no-data",
                    })
                }
              >
                {accomplishment && (
                  <div style={{ padding: "1rem .5rem" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ overflow: "visible" }}
                      width="100%"
                      height="10px"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                      >
                        <g>
                          <text
                            x="0"
                            y="-10"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            text-anchor="start"
                            font-size=".75rem"
                          >
                            {new Date(data.startDate).toLocaleDateString()}
                          </text>
                          <text
                            x="100%"
                            y="-10"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            text-anchor="end"
                            font-size=".75rem"
                          >
                            {new Date(data.endDate).toLocaleDateString()}
                          </text>
                          {data.duration && (
                            <text
                              x="50%"
                              y="-10"
                              fill="var(--text-mention-grey)"
                              stroke="none"
                              text-anchor="middle"
                              font-size=".75rem"
                            >
                              {data.duration} mois
                            </text>
                          )}
                          <rect
                            height="10px"
                            width="100%"
                            x="0"
                            y="0"
                            fill="var(--background-contrast-grey)"
                            rx="4"
                            ry="4"
                          />
                          <rect
                            height="10px"
                            width={`${accomplishment}%`}
                            x="0"
                            y="0"
                            fill="var(--background-contrast-pink-macaron-active)"
                            rx="4"
                            ry="4"
                          />
                          <circle
                            r="2"
                            cx="100%"
                            cy="5"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            transform="translate(-4,0)"
                          />
                          <circle
                            r="2"
                            cx="5"
                            cy="5"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                          />
                          <circle
                            r="4"
                            cx={`${accomplishment}%`}
                            cy="5"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            transform="translate(-4,0)"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "projects.section.funding.title",
                })}
                description={
                  <Text className="fr-mb-0" size="xs">
                    {!data.budgetTotal &&
                      !data.budgetFinanced &&
                      intl.formatMessage({
                        id: "projects.section.funding.no-data",
                      })}
                    {data.budgetTotal && (
                      <>
                        {intl.formatMessage({
                          id: "projects.section.funding.global-budget",
                        })}
                        <b>
                          {Math.floor(
                            Number(data.budgetTotal)
                          ).toLocaleString()}{" "}
                          €
                        </b>
                      </>
                    )}
                    <br />
                    {data.budgetFinanced && (
                      <>
                        {intl.formatMessage({
                          id: "projects.section.funding.contributed-budget",
                        })}
                        <b>
                          {Math.floor(
                            Number(data.budgetFinanced)
                          ).toLocaleString()}{" "}
                          €
                        </b>
                      </>
                    )}
                  </Text>
                }
                show
              >
                {fundingPercent && (
                  <div style={{ padding: "1rem .5rem" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ overflow: "visible" }}
                      width="100%"
                      height="10px"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                      >
                        <g>
                          {fundingPercent && (
                            <text
                              x={`${fundingPercent}%`}
                              y="-10"
                              fill="var(--text-mention-grey)"
                              stroke="none"
                              text-anchor={
                                fundingPercent > 80
                                  ? "end"
                                  : fundingPercent < 20
                                    ? "start"
                                    : "middle"
                              }
                              font-size=".75rem"
                            >
                              {intl.formatMessage({
                                id: "projects.section.funding.financed-at",
                              })}{" "}
                              {fundingPercent.toLocaleString()} %
                            </text>
                          )}
                          <rect
                            height="10px"
                            width="100%"
                            x="0"
                            y="0"
                            fill="var(--background-contrast-grey)"
                            rx="4"
                            ry="4"
                          />
                          <rect
                            height="10px"
                            width={`${fundingPercent}%`}
                            x="0"
                            y="0"
                            fill="var(--background-contrast-green-emeraude-active)"
                            rx="4"
                            ry="4"
                          />
                          <circle
                            r="2"
                            cx="100%"
                            cy="5"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            transform="translate(-4,0)"
                          />
                          <circle
                            r="4"
                            cx={`${fundingPercent}%`}
                            cy="5"
                            fill="var(--text-mention-grey)"
                            stroke="none"
                            transform="translate(-4,0)"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                )}
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "projects.section.coordinator.title",
                })}
                show={!!coordinator}
              >
                <LinkCard type="organization" icon="building-line">
                  <Text className="fr-m-0">
                    {coordinator?.structure?.id ? (
                      <Link
                        href={`/organizations/${coordinator.structure?.id}`}
                      >
                        {getLangFieldValue(locale)(
                          coordinator?.structure?.label
                        )}
                      </Link>
                    ) : (
                      coordinator?.label?.default?.split("__")[0]
                    )}
                  </Text>
                </LinkCard>
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "projects.section.identifiers.title",
                })}
                description={intl.formatMessage({
                  id: "projects.section.identifiers.desc",
                })}
                show={!!data?.id}
              >
                <div>
                  <div className="fr-badge-group">
                    <CopyBadge lowercase size="sm" copyText={data.id}>
                      {data.id}
                    </CopyBadge>
                  </div>
                </div>
              </PageSection>
              {data.url && (
                <PageSection
                  title={intl.formatMessage({
                    id: "projects.section.website.title",
                  })}
                  description=""
                  show={!!data?.url}
                >
                  <Websites data={[{ url: data.url, type: "main" }]} />
                </PageSection>
              )}
              <PageSection
                title={intl.formatMessage({
                  id: "projects.section.share.title",
                })}
                show
              >
                <Share />
              </PageSection>
              <PageSection
                title={intl.formatMessage({
                  id: "projects.section.contribute.title",
                })}
                show
              >
                <ButtonGroup>
                  <Button
                    as="a"
                    href={`/bugs/projects/${data.id}`}
                    color="error"
                    variant="tertiary"
                    icon="bug-line"
                    iconPosition="left"
                  >
                    {intl.formatMessage({
                      id: "projects.section.contribute.bugs",
                    })}
                  </Button>
                </ButtonGroup>
              </PageSection>
            </PageContent>
          </Col>
        </Row>
      </Container>
    </>
  );
}
