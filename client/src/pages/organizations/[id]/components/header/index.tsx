import cn from "classnames";
import { BadgeGroup, Badge, Title, Text, Row, Link, useDSFRConfig } from "@dataesr/dsfr-plus"
import getLangFieldValue from "../../../../../utils/lang";
import { Organization } from "../../../../../types/organization";
import { useIntl } from "react-intl";
import Truncate from "../../../../../components/truncate";
import IconLink from "../../../../../components/icon-link";
import styles from "./styles.module.scss";

export default function OrganizationHeader({ data }: { data: Organization }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  const shortLevel = data.level?.match(/\((.*?)\)/)?.[1] || data.level;
  const hasAcronym = getLangFieldValue(locale)(data.acronym);

  return (
    <section>
      <div className={cn(styles.header, "fr-my-1v")}>
        <div className={styles.grow}>
          <BadgeGroup className="structure-badge-list fr-mt-1v">
            {data?.kind?.map((k) => (
              <Badge key={k} size="sm" color="yellow-tournesol" noIcon>
                {k}
              </Badge>
            ))}
            {data.level && (
              <Badge size="sm" color="green-emeraude" title={shortLevel ? data.level : undefined}>
                {shortLevel || data.level}
              </Badge>
            )}
            {data.nature && data.nature !== data.level && (
              <Badge size="sm" color="green-emeraude">
                {data.nature}
              </Badge>
            )}
          </BadgeGroup>
          <Title className="fr-mb-0" as="h1" look="h5">
            {hasAcronym}
            {hasAcronym && " – "}
            {getLangFieldValue(locale)(data.label)}
          </Title>
          {data?.endDate && (
            <Text className="fr-card__detail" size="sm">
              <i>
                {intl.formatMessage({ id: "organizations.header.until" })} {data.endDate.slice(0, 4)}
              </i>
            </Text>
          )}
          {!data?.endDate && data?.creationYear && (
            <Text className="fr-card__detail" size="sm">
              <i>
                {intl.formatMessage({ id: "organizations.header.since" })} {data.creationYear}
              </i>
            </Text>
          )}
        </div>
        <div>
          <img
            id="structure-logo"
            className={styles.logo}
            width="auto"
            height="auto"
            src={`https://storage.sbg.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/dataesr/${data.id}_128.png`}
            alt={`Logo ${data.label.default}`}
            aria-hidden
            onError={() => document?.getElementById("structure-logo")?.remove()}
          />
        </div>
      </div>
      <Row>
        <Truncate lines={8} className="fr-mt-2w">
          <Text className="fr-m-0" size="sm">
            {getLangFieldValue(locale)(data?.description)}
          </Text>
          {!data?.description && data?.ai_description && (
            <>
              <Text className="fr-m-0" size="sm">
                {getLangFieldValue(locale)(data?.ai_description?.description)}
              </Text>
              <Text className="fr-mt-1w" size="sm" style={{ textAlign: "right" }}>
                <i>{intl.formatMessage({ id: "organizations.header.description.ia-generated-label" })}</i>{" "}
                <IconLink
                  title={intl.formatMessage({ id: "organizations.header.description.ia-generated-hover" })}
                  href="/about/FAQ?question=q62"
                  icon="question-line"
                  target="_blank"
                />{" "}
                <Link
                  title={intl.formatMessage({ id: "organizations.header.description.ia-edit-hover" })}
                  className="fr-ml-1w"
                  style={{ backgroundImage: "none" }}
                  href={`/bugs/organizations/${data.id}`}
                  target="_self"
                  icon="edit-line"
                  iconPosition="right"
                >
                  <i>{intl.formatMessage({ id: "organizations.header.description.ia-edit-label" })}</i>
                </Link>
              </Text>
            </>
          )}
        </Truncate>
      </Row>
    </section>
  )
}
