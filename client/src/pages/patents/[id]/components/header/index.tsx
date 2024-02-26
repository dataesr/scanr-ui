import {
  BadgeGroup,
  Badge,
  Title,
  Text,
  Row,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import getLangFieldValue from "../../../../../utils/lang";
import { useIntl } from "react-intl";
import Truncate from "../../../../../components/truncate";
import { Patent } from "../../../../../types/patent";

export default function PatentsHeader({ data }: { data: Patent }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  return (
    <section>
      <div style={{ display: "flex", flexWrap: "nowrap" }} className="fr-my-1v">
        <div style={{ flexGrow: 1 }}>
          <BadgeGroup className="structure-badge-list fr-mt-1v">
            {data?.kind?.map((k) => (
              <Badge key={k} size="sm" color="yellow-tournesol" noIcon>
                {k}
              </Badge>
            ))}
            {data.level && (
              <Badge size="sm" color="green-emeraude">
                {data.level}
              </Badge>
            )}
            {data.nature && (
              <Badge size="sm" color="green-emeraude">
                {data.nature}
              </Badge>
            )}
          </BadgeGroup>
          <Title className="fr-mb-0" as="h1" look="h4">
            {getLangFieldValue(locale)(data.label)}
          </Title>
          {data?.creationYear && (
            <Text className="fr-card__detail" size="sm">
              <i>
                {intl.formatMessage({ id: "organizations.header.since" })}{" "}
                {data.creationYear}
              </i>
            </Text>
          )}
        </div>
        <div>
          <img
            id="structure-logo"
            style={{ maxHeight: "100px" }}
            width="auto"
            height="auto"
            src={`https://storage.sbg.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/dataesr/${data.id}_128.png`}
            alt={`Logo ${data.label.default}`}
            aria-hidden
            className="fr-mr-1v"
            onError={() => document?.getElementById("structure-logo")?.remove()}
          />
        </div>
      </div>
      <Row>
        <Truncate lines={8} className="fr-mt-2w">
          <Text className="fr-m-0" size="sm">
            {getLangFieldValue(locale)(data?.description)}
          </Text>
        </Truncate>
      </Row>
    </section>
  );
}
