import { useIntl } from "react-intl";
import {
  Text,
  Link,
  Row,
  Col,
  useDSFRConfig,
  Button,
} from "@dataesr/dsfr-plus";
import getLangFieldValue from "../../../../../utils/lang";
import Modal from "../../../../../components/modal";
import {
  OrganizationBadgesData,
  RelatedOrganizationData,
} from "../../../../../types/organization";
import { useQueryClient } from "@tanstack/react-query";
import { getOrganizationById } from "../../../../../api/organizations/[id]";
import { encode } from "../../../../../utils/string";
import LinkCard from "../../../../../components/link-card";

function StructureCard({
  structure,
  icon,
}: {
  structure: RelatedOrganizationData;
  icon: string;
}) {
  const intl = useIntl();
  const { locale } = useDSFRConfig();
  const queryClient = useQueryClient();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["organization", id],
      queryFn: () => getOrganizationById(encode(id)),
    });
  }

  return (
    <LinkCard
      prefetch={() => prefetch(structure.structure)}
      type="organization"
      icon={icon}
    >
      {structure.structure ? (
        <Link
          className="fr-text--bold"
          href={`/organizations/${structure.structure}`}
        >
          {getLangFieldValue(locale)(structure.denormalized.label) ||
            structure.label}
        </Link>
      ) : (
        <Text bold className="fr-m-0">
          structure.label
        </Text>
      )}
      {structure.fromDate && (
        <Text className="fr-card__detail" size="sm">
          <i>
            {intl.formatMessage({ id: "organizations.networks.since" })}{" "}
            {new Date(structure.fromDate).toLocaleDateString()}
          </i>
        </Text>
      )}
    </LinkCard>
  );
}

export function OrganizationNetworksBadges({
  data,
  titleKey,
  icon,
}: {
  data: OrganizationBadgesData[];
  titleKey: string;
  icon: string;
}) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();

  if (!data?.length) return null;
  return (
    <>
      <Text bold>
        {intl.formatMessage({ id: titleKey }, { count: data.length })}
      </Text>
      <Row verticalAlign="middle" gutters className="fr-mb-3w">
        {data?.map((badge) => (
          <Col xs="12" md="6">
            <LinkCard type="organization" icon={icon}>
              <Text bold className="fr-m-0">
                {getLangFieldValue(locale)(badge.label)}
              </Text>
            </LinkCard>
          </Col>
        ))}
      </Row>
    </>
  );
}

export function OrganizationNetworks({
  data,
  titleKey,
  icon,
}: {
  data: RelatedOrganizationData[];
  titleKey: string;
  icon: string;
}) {
  const intl = useIntl();
  if (!data?.length) return null;
  if (data.length > 5) {
    return (
      <>
        <div
          className="fr-mb-3w"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Text bold className="fr-m-0">
              {intl.formatMessage({ id: titleKey }, { count: data.length })}
            </Text>
          </div>
          <Button
            variant="text"
            icon="arrow-right-s-line"
            iconPosition="right"
            aria-controls={titleKey}
            data-fr-opened="false"
          >
            {intl.formatMessage({
              id: "organizations.section.networks.open-modal-button",
            })}
          </Button>
        </div>
        <Modal
          id={titleKey}
          size="lg"
          title={intl.formatMessage({ id: titleKey }, { count: data.length })}
        >
          <Row verticalAlign="middle" gutters className="fr-mb-3w">
            {data?.map((structure) => (
              <Col key={structure?.denormalized?.id} xs="12" xs="12">
                <StructureCard structure={structure} icon={icon} />
              </Col>
            ))}
          </Row>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Text bold>
        {intl.formatMessage({ id: titleKey }, { count: data.length })}
      </Text>
      <Row gutters className="fr-mb-3w">
        {data?.map((structure) => (
          <Col key={structure?.denormalized?.id} xs="12">
            <StructureCard structure={structure} icon={icon} />
          </Col>
        ))}
      </Row>
    </>
  );
}
