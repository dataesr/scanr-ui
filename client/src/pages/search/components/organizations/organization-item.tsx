import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Link, BadgeGroup, Badge, useDSFRConfig } from "@dataesr/dsfr-plus";
import { encode } from "../../../../utils/string";
import { ItemProps } from "../../types";
import { getOrganizationById } from "../../../../api/organizations/[id]";
import { LightOrganization } from "../../../../types/organization";
import getLangFieldValue from "../../../../utils/lang";
// import CopyBadge from "../../../../components/copy/copy-badge";

export default function OrganizationItem({
  data: organization,
  highlight,
}: ItemProps<LightOrganization>) {
  const { locale } = useDSFRConfig();
  const queryClient = useQueryClient();

  function prefetch(id: string) {
    queryClient.prefetchQuery({
      queryKey: ["organization", id],
      queryFn: () => getOrganizationById(encode(id)),
    });
  }

  const hasAcronym = getLangFieldValue(locale)(organization.acronym);


  return (
    <Fragment key={organization.id}>
      <div className="result-item" key={organization.id}>
        <BadgeGroup className="fr-badge-group structure-badge-list fr-mt-1v">
          {organization?.kind?.length ? (
            <Badge size="sm" color="yellow-tournesol" noIcon>
              {organization.kind?.join(" / ")}
            </Badge>
          ) : null}
          {organization.level && (
            <Badge size="sm" color="yellow-tournesol">
              {organization.level?.match(/\((.*?)\)/)?.[1] ||
                organization.level}
            </Badge>
          )}
        </BadgeGroup>
        <span onMouseEnter={() => prefetch(organization.id)}>
          <Link
            href={`/organizations/${encode(organization.id)}`}
            className="fr-link"
          >
            {hasAcronym}
            {hasAcronym && " – "}
            {highlight?.["label.default"] ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight?.["label.default"],
                }}
              />
            ) : (
              organization.label.default ||
              organization.label?.fr ||
              organization.label?.en
            )}
          </Link>
        </span>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>{organization?.address?.find((a) => a.main)?.city}</i>
        </Text>

        {/* <div className="fr-mt-1w fr-badge-group">
          <CopyBadge key={organization.id} size="sm" copyText={organization.id}>{organization.id}</CopyBadge>
        </div> */}
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  );
}
