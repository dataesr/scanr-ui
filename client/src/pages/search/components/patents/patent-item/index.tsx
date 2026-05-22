import { useQueryClient } from "@tanstack/react-query";
import {
  Text,
  Link,
  BadgeGroup,
  Badge,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { getPatentById } from "../../../../../api/patents/[id]";
import { ItemProps } from "../../../types";
import { Patent } from "../../../../../types/patent";
import { RawIntlProvider, createIntl } from "react-intl";

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
export default function PatentItem({
  data: patent,
  highlight,
}: ItemProps<Patent>) {
  const queryClient = useQueryClient();
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });

  function prefetchPatent(id: string) {
    queryClient.prefetchQuery({
      queryKey: ["patent", id],
      queryFn: () => getPatentById(id),
    });
  }

  const numberOfDep = patent?.applicants?.length || 0;
  const numberOfInv = patent?.inventors?.length || 0;

  return (
    <RawIntlProvider value={intl}>
      <div className="result-item" key={patent.id}>
        <BadgeGroup>
          <Badge size="sm" color="green-bourgeon">
            {intl.formatMessage({
              id: "patents.item.badges.main",
            })}
          </Badge>
          {patent.patents.some((el) => el.office === "WO") && (
            <Badge size="sm" color="blue-ecume" style={{ marginRight: "10px" }}>
              {intl.formatMessage({
                id: "patents.item.badges.isInternational",
              })}
            </Badge>
          )}
          {patent.patents.some((el) => el.office === "EP") && (
            <Badge size="sm" color="blue-ecume" style={{ marginRight: "10px" }}>
              {intl.formatMessage({
                id: "patents.item.badges.isOeb",
              })}
            </Badge>
          )}
          <Badge
            size="sm"
            color="green-bourgeon"
            style={{ marginRight: "10px" }}
          >
            {`${intl.formatMessage(
              {
                id: "patents.item.badges.application-count",
              },
              { count: patent.patents.length }
            )}`}
          </Badge>
          {patent.isGranted && (
            <Badge size="sm" color="success" style={{ marginRight: "10px" }}>
              {intl.formatMessage({
                id: "patents.item.badges.granted",
              })}
            </Badge>
          )}
        </BadgeGroup>
        <span onMouseEnter={() => prefetchPatent(patent.id)}>
          <Link href={`/patents/${patent.id}`} className="fr-link">
            {patent.title.fr || patent.title.en}{" "}
          </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {`${intl.formatMessage(
            {
              id: "patents.item.dep-count",
            },
            { count: numberOfDep }
          )} & 
           ${intl.formatMessage(
             {
               id: "patents.item.inv-count",
             },
             { count: numberOfInv }
           )}
          `}
        </Text>
        <Text
          size="sm"
          className="fr-text-mention--grey fr-mb-0"
          onMouseEnter={() => prefetchPatent(patent.id)}
        >
          <i>
            {intl.formatMessage(
              {
                id: "patents.item.submission-date",
              },
              {
                date: new Date(patent.applicationDate).toLocaleDateString(
                  locale,
                  { year: "numeric", month: "long", day: "numeric" }
                ),
              }
            )}
          </i>
          <br />
          <i>
            {intl.formatMessage(
              {
                id: "patents.item.publication-date",
              },
              {
                date: new Date(patent.publicationDate).toLocaleDateString(
                  locale,
                  { year: "numeric", month: "long", day: "numeric" }
                ),
              }
            )}
          </i>
        </Text>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </RawIntlProvider>
  );
}
