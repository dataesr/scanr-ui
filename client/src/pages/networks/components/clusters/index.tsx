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
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"
import { encode } from "../../../../utils/string"
import useTab from "../../hooks/useTab"
import useParameters from "../../hooks/useParameters"
import { useNetworkContext } from "../../context"

const SEE_MORE_AFTER = 5

type ClusterItemArgs = {
  currentTab: string
  community: NetworkCommunity
}

function ClusterItem({ currentTab, community }: ClusterItemArgs) {
  const intl = useIntl()
  const currentYear = new Date().getFullYear()
  const [showNodesModal, setShowNodesModal] = useState(false)
  const [showPublicationsModal, setShowPublicationsModal] = useState(false)
  const { setFocusItem } = useNetworkContext()

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
              {`${community.size} ${intl.formatMessage({ id: `networks.tab.${currentTab}` })}`}
            </Badge>
            <Badge
              onClick={() => {
                setShowPublicationsModal(true)
              }}
              style={{ cursor: "pointer" }}
              size="sm"
              color="pink-macaron"
            >
              {`${community.publicationsCount} ${intl.formatMessage({
                id: "networks.section.clusters.badge-publications",
              })}`}
            </Badge>
            <Badge noIcon size="sm" color={oaColor(community.oaPercent)}>
              {`${intl.formatMessage({ id: "networks.section.clusters.open-access" })}: ${community.oaPercent.toFixed(1)}%`}
            </Badge>
            <Badge size="sm" color="yellow-tournesol">
              {`${intl.formatMessage({ id: "networks.section.clusters.last-activity" })}: ${community?.maxYear || "N/A"}`}
            </Badge>
            <Badge size="sm" color="blue-cumulus">{`${intl.formatMessage(
              { id: "networks.section.clusters.citations" },
              { count: community.citationsRecent }
            )} (${currentYear - 1}-${currentYear})`}</Badge>
            <Badge size="sm" color="blue-ecume">{`Citation score: ${community.citationsScore.toFixed(1)}`}</Badge>
          </BadgeGroup>
        </Col>
      </Row>
      <Row>
        <div style={{ alignContent: "center", paddingRight: "0.5rem", color: `${community.color}` }}>{"█"} </div>
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
        {community?.domains
          ? Object.entries(community.domains)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 10)
              .map(([domain], k) => (
                <Fragment key={k}>
                  {k > 0 ? ", " : ""}
                  <Link href={`/search/publications?q="${encode(domain)}"`}>#{domain}</Link>
                </Fragment>
              ))
          : null}
      </Text>
      <Modal isOpen={showNodesModal} hide={() => setShowNodesModal(false)}>
        <ModalTitle>{intl.formatMessage({ id: `networks.tab.${currentTab}` })}</ModalTitle>
        <ModalContent>
          {community?.nodes?.map((node) => (
            <li>
              <Link href={node.url}>{node.label}</Link>
            </li>
          ))}
        </ModalContent>
      </Modal>
      <Modal isOpen={showPublicationsModal} hide={() => setShowPublicationsModal(false)}>
        <ModalTitle>{intl.formatMessage({ id: "networks.section.clusters.badge-publications" })}</ModalTitle>
        <ModalContent>
          {community?.publications?.map((publication) => (
            <li className="fr-mt-1w">
              <Link href={window.location.origin + "/publications/" + encode(publication.id as string)}>
                {publication.title}
              </Link>
            </li>
          ))}
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default function NetworkClusters() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { parameters } = useParameters()
  const { search } = useSearchData(currentTab)
  const [seeMore, setSeeMore] = useState(false)

  const network = search?.data?.network as NetworkData
  const communities = network?.clusters
  const sectionTitle = `networks.section.clusters.${currentTab}`

  if (!parameters.clusters) return null

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
        title={intl.formatMessage({ id: sectionTitle }, { count: communities?.length })}
        icon="shapes-line"
      >
        <>
          <div className="cluster-list">
            {communities?.slice(0, seeMore ? communities?.length + 1 : SEE_MORE_AFTER)?.map((community, index) => (
              <ClusterItem key={index} currentTab={currentTab} community={community} />
            ))}
          </div>
          {communities?.length > SEE_MORE_AFTER ? (
            <Row horizontalAlign="right">
              <Button variant="secondary" size="sm" onClick={() => setSeeMore((prev: boolean) => !prev)}>
                {seeMore
                  ? intl.formatMessage({ id: "networks.section.clusters.see-less" })
                  : intl.formatMessage(
                      { id: "networks.section.clusters.see-more" },
                      { count: communities?.length - SEE_MORE_AFTER }
                    )}
              </Button>
            </Row>
          ) : null}
        </>
      </PageSection>
    </Container>
  )
}
