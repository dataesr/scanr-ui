import { useState } from "react"
import { useIntl } from "react-intl"
import { Container, Row, Button, Link, Text, Modal, ModalContent, ModalTitle, ButtonGroup, Tag } from "@dataesr/dsfr-plus"
import { NetworkCommunity, NetworkData } from "../../../../types/network"
import useOptions from "../../hooks/useOptions"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"
import Separator from "../../../../components/separator"
import { encode } from "../../../../utils/string"
import { useNetworkContext } from "../../context"
import ClustersButton from "./button"
import "./styles.scss"

const SEE_MORE_AFTER = 10

interface ClusterItemArgs {
  currentModel: string
  community: NetworkCommunity
  isFetching: boolean
}

function ClusterItem({ currentModel, community, isFetching }: ClusterItemArgs) {
  const intl = useIntl()
  const currentYear = new Date().getFullYear()
  const {
    options: { currentSource, setFocusItem },
  } = useNetworkContext()
  const [showNodesModal, setShowNodesModal] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const metadata = community.metadata

  const oaColor = (percent: number) =>
    percent >= 50.0 ? (percent >= 70.0 ? "success-425-625" : "yellow-tournesol-main-731") : "warning-425-625"

  return (
    <Container fluid>
      <Button variant="text" className="fr-link" onClick={() => setFocusItem(community.nodes[0].label)}>
        {community.label}
      </Button>
      <Separator />
      <Container fluid>
        <ButtonGroup size="sm" isInlineFrom="xs">
          <Button
            className="fr-mb-0"
            variant="text"
            style={{ color: "var(--text-default-grey)" }}
            icon="arrow-down-s-line"
            iconPosition="right"
            onClick={() => {
              setShowNodesModal(true)
            }}
          >{`${community.size} ${intl.formatMessage({
            id: `networks.model.${currentModel}`,
          })}`}</Button>
          {metadata?.documentsCount && (
            <Button
              className="fr-mb-0"
              variant="text"
              icon="arrow-down-s-line"
              iconPosition="right"
              onClick={() => {
                setShowDocumentsModal(true)
              }}
              style={{ color: "var(--text-default-grey)" }}
            >
              {`${metadata?.documentsCount} ${intl.formatMessage({
                id: `networks.source.${currentSource}`,
              })}`}
            </Button>
          )}
        </ButtonGroup>
      </Container>
      {!!metadata ? (
        <Container fluid>
          <Separator className="fr-mb-1w" />
          <Row className="cluster-metrics fr-mt-1w">
            {metadata?.citationsRecent && (
              <div title="Number of citations over the last two years">
                <i className="fr-icon-quote-line fr-icon--sm fr-mr-2v" style={{ color: community.color }} />
                <Text as="span" size="sm">
                  {`${intl.formatMessage(
                    { id: "networks.section.clusters.citations" },
                    { count: metadata.citationsRecent },
                  )} (${currentYear - 1}-${currentYear})`}
                </Text>
              </div>
            )}
            {metadata?.citationsScore && (
              <div
                title="Number of recent citations (over the last two years) divided by the number of total publications in the cluster.&#10;This score is intended to help detect hotspots in the communities."
              >
                <i className="fr-icon-star-line fr-icon--sm fr-mr-2v" style={{ color: community.color }} />
                <Text as="span" size="sm">
                  {`Citations score: ${metadata.citationsScore.toFixed(1)}`}
                </Text>
              </div>
            )}
            {metadata?.oaPercent && (
              <div title="Percentage of open access documents">
                <i className="fr-icon-lock-unlock-line fr-icon--sm fr-mr-2v" style={{ color: community.color }} />
                <Text style={{ color: `var(--${oaColor(metadata.oaPercent)})` }} as="span" size="sm">
                  {`${metadata.oaPercent.toFixed(0)}%`}
                </Text>
                <Text className="fr-ml-1v" as="span" size="sm">
                  {intl.formatMessage({ id: "networks.section.clusters.open-access" })}
                </Text>
              </div>
            )}
            {metadata?.documentsMaxYear && (
              <div title="Most recent document">
                <i className="fr-icon-calendar-line fr-icon--sm fr-mr-2v" style={{ color: community.color }} />
                <Text as="span" size="sm">
                  {`${intl.formatMessage({ id: `networks.section.clusters.last-activity.${currentSource}` })}: ${
                    metadata.documentsMaxYear
                  }`}
                </Text>
              </div>
            )}
          </Row>
          <Separator className="fr-my-1w" />
          {metadata?.domains && (
            <Container fluid>
              {Object.entries(metadata.domains)
                .sort((a, b) => b[1] - a[1])
                .map(([domain], k) => (
                  <Tag
                    className="cluster-tag fr-mb-1w fr-mr-1v"
                    size="sm"
                    as="a"
                    href={`/search/${currentSource}?q="${encode(domain)}"`}
                    key={k}
                    target="_blank"
                  >
                    {domain}
                  </Tag>
                ))}
            </Container>
          )}
        </Container>
      ) : isFetching ? (
        <BaseSkeleton width="100%" height="10rem" className="fr-my-1v" />
      ) : null}
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
            id: `networks.source.${currentSource}`,
          })}
        </ModalTitle>
        <ModalContent>
          {metadata?.documents?.map((document) => (
            <li key={document.id} className="fr-mt-1w">
              <Link
                key={document.id}
                target="_blank"
                href={window.location.origin + `/${currentSource}/` + encode(document.id as string)}
              >
                {document?.title || document.id}
              </Link>
            </li>
          ))}
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default function NetworkClustersItems() {
  const intl = useIntl()
  const { currentModel, parameters } = useOptions()
  const { search } = useNetworkContext()
  const [seeMore, setSeeMore] = useState(false)

  const network = search?.data?.network as NetworkData
  const communities = network?.clusters

  if (!search?.data && search?.isFetching)
    return (
      <Container fluid className="fr-mt-2w">
        <BaseSkeleton width="100%" height="30rem" className="fr-my-1v" />
      </Container>
    )

  return (
    <Container fluid>
      <>
        {!parameters.clusters && <ClustersButton />}
        {communities?.slice(0, seeMore ? communities?.length + 1 : SEE_MORE_AFTER)?.map((community, index) => (
          <div
            className="fr-card fr-p-1w fr-mb-2w"
            style={{
              borderLeft: `6px solid ${community.color}`,
              borderRadius: "5px",
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <ClusterItem
              key={index}
              currentModel={currentModel}
              community={community}
              isFetching={Boolean(parameters.clusters && search.isFetching)}
            />
          </div>
        ))}
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
                    { count: communities?.length - SEE_MORE_AFTER },
                  )}
            </Button>
          </Separator>
        ) : null}
      </>
    </Container>
  )
}
