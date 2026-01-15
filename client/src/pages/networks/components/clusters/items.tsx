import { Fragment, useState } from "react"
import { useIntl } from "react-intl"
import {
  Container,
  Row,
  Button,
  Badge,
  BadgeGroup,
  Link,
  Text,
  Col,
  Modal,
  ModalContent,
  ModalTitle,
} from "@dataesr/dsfr-plus"
import { PageSection } from "../../../../components/page-content"
import { NetworkCommunity, NetworkData } from "../../../../types/network"
import useSearchData from "../../hooks/useSearchData"
import useOptions from "../../hooks/useOptions"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"
import Separator from "../../../../components/separator"
import { encode } from "../../../../utils/string"
import { useNetworkContext } from "../../context"
import ClustersButton from "./button"

const SEE_MORE_AFTER = 10

type ClusterItemArgs = {
  currentModel: string
  community: NetworkCommunity
}

function ClusterItem({ currentModel, community }: ClusterItemArgs) {
  const intl = useIntl();
  const currentYear = new Date().getFullYear();
  const { currentSource } = useOptions();
  const [showNodesModal, setShowNodesModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const { setFocusItem } = useNetworkContext();
  const metadata = community.metadata

  const oaColor = (percent: number) => (percent >= 40.0 ? (percent >= 70.0 ? "success" : "yellow-moutarde") : "warning")

  return (
    <Container fluid className="cluster-item">
      <Row>
        <Col>
          <BadgeGroup>
            <Badge
              onClick={() => {
                setShowNodesModal(true)
              }}
              style={{ cursor: "pointer" }}
              size="sm"
              color="purple-glycine"
            >
              {`${community.size} ${intl.formatMessage({
                id: `networks.model.${currentModel}`,
              })}`}
            </Badge>
            <Badge
              onClick={() => {
                setShowDocumentsModal(true)
              }}
              style={{ cursor: "pointer" }}
              size="sm"
              color="pink-macaron"
            >
              {`${metadata?.documentsCount} ${intl.formatMessage({
                id: "networks.section.clusters.badge-publications",
              })}`}
            </Badge>
            <Badge noIcon size="sm" color={oaColor(metadata?.oaPercent)}>
              {`${intl.formatMessage({
                id: "networks.section.clusters.open-access",
              })}: ${metadata?.oaPercent.toFixed(1)}%`}
            </Badge>
            <Badge size="sm" color="yellow-tournesol">
              {`${intl.formatMessage({
                id: "networks.section.clusters.last-activity",
              })}: ${community?.maxYear || "N/A"}`}
            </Badge>
            {currentSource === "publications" && (
              <Badge size="sm" color="blue-cumulus">{`${intl.formatMessage(
                { id: "networks.section.clusters.citations" },
                { count: metadata?.citationsRecent }
              )} (${currentYear - 1}-${currentYear})`}</Badge>
            )}
            {currentSource === "publications" && (
              <Badge size="sm" color="blue-ecume">{`Citation score: ${metadata?.citationsScore.toFixed(1)}`}</Badge>
            )}
          </BadgeGroup>
        </Col>
      </Row>
      <Row>
        <div
          style={{
            alignContent: "center",
            paddingRight: "0.5rem",
            color: `${community.color}`,
          }}
        >
          {"█"}{" "}
        </div>
        <Button variant="text" className="fr-link" onClick={() => setFocusItem(community.nodes[0].label)}>
          {community.label}
        </Button>
      </Row>
      <Text size="sm" className="fr-mb-0">
        <i>
          {community.nodes
            .slice(0, 10)
            .map((n) => n.label)
            ?.join(", ")}
        </i>
        <i>{community.size > 10 ? ", ..." : "."}</i>
      </Text>
      <Text bold size="sm" className="fr-mb-0">
        {metadata?.domains
          ? Object.entries(metadata.domains)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 10)
              .map(([domain], k) => (
                <Fragment key={k}>
                  {k > 0 ? ", " : ""}
                  <Link key={k} href={`/search/publications?q="${encode(domain)}"`}>
                    #{domain}
                  </Link>
                </Fragment>
              ))
          : null}
      </Text>
      <Modal isOpen={showNodesModal} hide={() => setShowNodesModal(false)}>
        <ModalTitle>{intl.formatMessage({ id: `networks.model.${currentModel}` })}</ModalTitle>
        <ModalContent>
          {community?.nodes?.map((node) => (
            <li key={node.id}>
              {node?.page ? (
                <Link key={node.id} target="_blank" href={node.page}>
                  {node.label}
                </Link>
              ) : (
                node.label
              )}
            </li>
          ))}
        </ModalContent>
      </Modal>
      <Modal isOpen={showDocumentsModal} hide={() => setShowDocumentsModal(false)}>
        <ModalTitle>
          {intl.formatMessage({
            id: "networks.section.clusters.badge-publications",
          })}
        </ModalTitle>
        <ModalContent>
          {metadata?.documents?.map((publication) => (
            <li key={publication.id} className="fr-mt-1w">
              <Link
                key={publication.id}
                target="_blank"
                href={window.location.origin + "/publications/" + encode(publication.id as string)}
              >
                {publication.title}
              </Link>
            </li>
          ))}
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default function NetworkClustersItems() {
  const intl = useIntl();
  const { currentModel, parameters } = useOptions();
  const { search } = useSearchData();
  const [seeMore, setSeeMore] = useState(false);

  const network = search?.data?.network as NetworkData;
  const communities = network?.clusters;
  const sectionTitle = `networks.section.clusters.${currentModel}`;

  if (!parameters.clusters) return <ClustersButton />

  if (search.isFetching)
    return (
      <Container fluid className="fr-mt-2w">
        <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />
      </Container>
    );

  return (
    <Container fluid>
      <PageSection
        size="lead"
        show={true}
        title={intl.formatMessage(
          { id: sectionTitle },
          { count: communities?.length }
        )}
        icon="shapes-line"
      >
        <>
          <div className="cluster-list">
            {communities
              ?.slice(0, seeMore ? communities?.length + 1 : SEE_MORE_AFTER)
              ?.map((community, index) => (
                <ClusterItem
                  key={index}
                  currentModel={currentModel}
                  community={community}
                />
              ))}
          </div>
          {communities?.length > SEE_MORE_AFTER ? (
            <Separator className="fr-my-2w">
              <Button
                icon={seeMore ? "arrow-up-s-line" : "arrow-down-s-line"}
                variant="text"
                onClick={() => setSeeMore((prev: boolean) => !prev)}
              >
                {seeMore
                  ? intl.formatMessage({
                      id: "networks.section.clusters.see-less",
                    })
                  : intl.formatMessage(
                      { id: "networks.section.clusters.see-more" },
                      { count: communities?.length - SEE_MORE_AFTER }
                    )}
              </Button>
            </Separator>
          ) : null}
        </>
      </PageSection>
    </Container>
  );
}
