import { VOSviewerOnline } from "vosviewer-online"
import useNetwork from "../hooks/useNetwork"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"
import { Fragment, useState } from "react"
import {
  Row,
  Badge,
  BadgeGroup,
  Link,
  Text,
  Col,
  Modal,
  ModalContent,
  ModalTitle,
  Container,
  Button,
} from "@dataesr/dsfr-plus"
import { PageSection } from "../../../../components/page-content"
import { NetworkCommunity, NetworkData } from "../../../../types/network"
import { encode } from "../../../../utils/string"


type ClusterItemArgs = {
  currentModel: string
  community: NetworkCommunity
}

function ClusterItem({ community }: ClusterItemArgs) {
  const currentYear = new Date().getFullYear()
  const currentSource = "publications"
  const [showNodesModal, setShowNodesModal] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)

  const oaColor = (percent: number) => (percent >= 40.0 ? (percent >= 70.0 ? "success" : "yellow-moutarde") : "warning")

  return (
    <Container fluid className="cluster-item">
      <Row>
        <Col>
          <BadgeGroup>
            <Badge style={{ cursor: "pointer" }} size="sm" color="purple-glycine">
              {`${community.size} auteurs`}
            </Badge>
            <Badge style={{ cursor: "pointer" }} size="sm" color="pink-macaron">
              {`${community.metadata.documentsCount} publications`}
            </Badge>
            <Badge noIcon size="sm" color={oaColor(community.metadata.oaPercent)}>
              {`Accès ouvert: ${community.metadata.oaPercent.toFixed(1)}%`}
            </Badge>
            <Badge size="sm" color="yellow-tournesol">
              {`Dernière publication: ${community.metadata.documentsMaxYear || "N/A"}`}
            </Badge>
            {currentSource === "publications" && (
              <Badge size="sm" color="blue-cumulus">{`Citations: ${community.metadata.citationsRecent} (${
                currentYear - 1
              }-${currentYear})`}</Badge>
            )}
            {currentSource === "publications" && (
              <Badge size="sm" color="blue-ecume">{`Citation score: ${community.metadata.citationsScore.toFixed(1)}`}</Badge>
            )}
          </BadgeGroup>
        </Col>
      </Row>
      <Row verticalAlign="middle">
        <div className="fr-mr-1w" style={{ color: `${community.color}` }}>
          {"█"}{" "}
        </div>
        <Text bold className="fr-mb-0">
          {community.label}
        </Text>
      </Row>
      <Text size="sm" className="fr-mb-0">
        <i>
          {community.nodes
            .slice(0, 4)
            .map((n) => n.label)
            ?.join(", ")}
        </i>
        <i>{community.size > 10 ? ", ..." : "."}</i>
      </Text>
      <Text bold size="sm" className="fr-mb-0">
        {community?.metadata?.domains
          ? Object.entries(community.metadata.domains)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
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
      <Button size="sm" variant="text" onClick={() => setShowNodesModal(true)}>
        Voir les auteurs
      </Button>
      <Button size="sm" variant="text" onClick={() => setShowDocumentsModal(true)}>
        Voir les publications
      </Button>
      <Modal isOpen={showNodesModal} hide={() => setShowNodesModal(false)}>
        <ModalTitle>Liste des auteurs</ModalTitle>
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
        <ModalTitle>Liste des publications</ModalTitle>
        <ModalContent>
          {community?.metadata?.documents?.map((publication) => (
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

function NetworkClustersItems() {
  const { search } = useNetwork("authors")

  const network = search?.data?.network as NetworkData
  const communities = network?.clusters


  if (search.isFetching)
    return (
      <Container fluid className="fr-mt-2w">
        <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />
      </Container>
    )

  return (
    <Container fluid className="fr-mt-2w">
      <PageSection
        size="lead"
        show={true}
        title={`${communities?.length } clusters`}
        icon="shapes-line"
      >
        <>
          <div className="cluster-list">
            {communities?.map((community, index) => (
              <ClusterItem key={index} currentModel="publications" community={community} />
            ))}
          </div>
        </>
      </PageSection>
    </Container>
  )
}




export default function Network({ model }: { model: "authors" | "structures"}) {
  const { search, currentQuery, filters } = useNetwork(model)
  const theme = document.documentElement.getAttribute("data-fr-theme")

  const data = search?.data

  if (search.isFetching) return <BaseSkeleton height="600px" />
  if (!data?.network) return "Erreur"

  const key = JSON.stringify({ currentQuery, filters, theme, model })
  const params = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
  }

  if (model === "authors") {
    return (
      <>
        <Container fluid className="fr-mt-2w">
          <Row gutters verticalAlign="top">
            <Col xs="8" style={{ height: "800px" }}>
              <VOSviewerOnline key={key} data={data} parameters={params} />
            </Col>
            <Col xs="4" style={{ height: "800px", overflowY: "scroll", overflowX: "hidden" }}>
              {model === "authors" && <NetworkClustersItems />}
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  return (
    <Container fluid className="fr-mt-2w" style={{ height: "600px" }}>
      <VOSviewerOnline key={key} data={data} parameters={params} />
    </Container>
  )
}
