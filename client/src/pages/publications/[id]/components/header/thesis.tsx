import {
  Row,
  BadgeGroup,
  Link,
  Badge,
  Title,
  Text,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { publicationTypeMapping } from "../../../../../utils/string";
import { useIntl } from "react-intl";
import Truncate from "../../../../../components/truncate";
import getLangFieldValue from "../../../../../utils/lang";

export default function ThesisHeader({ data }) {
  const intl = useIntl();
  const { locale } = useDSFRConfig();
  const summary = getLangFieldValue(locale)(data?.summary);
  const hasDate = data.publicationDate;
  const author = data.authors?.filter(
    (author) => author.role === "author"
  )?.[0];
  const directors =
    data.authors?.filter((author) => author.role === "directeurthese") || [];

  return (
    <section>
      <div>
        <BadgeGroup>
          <Badge color="purple-glycine" noIcon>
            {publicationTypeMapping[data.type]}
          </Badge>
          <Badge
            color={data.isOa ? "green-emeraude" : "pink-macaron"}
            icon={data.isOa ? "lock-unlock-line" : "lock-line"}
          >
            {intl.formatMessage({
              id: `publications.header.oa.${data.isOa ? "true" : "false"}`,
            })}
          </Badge>
        </BadgeGroup>
        <Title className="fr-mb-1v" as="h1" look="h5">
          {getLangFieldValue(locale)(data.title)}
        </Title>
        <Text className="fr-text-mention--grey" size="sm">
          <em>
            {author.fullName &&
              intl.formatMessage({ id: "publications.header.thesis.by" })}
            {author.person ? (
              <Link href={`/authors/${author.person}`}>{author.fullName}</Link>
            ) : (
              <span>{author.fullName}</span>
            )}{" "}
            {", "}
            {hasDate
              ? intl.formatMessage(
                  { id: "publications.header.thesis.date" },
                  {
                    date: new Date(data.publicationDate).toLocaleDateString(
                      "FR-fr",
                      { year: "numeric", month: "long", day: "numeric" }
                    ),
                  }
                )
              : intl.formatMessage(
                  { id: "publications.header.thesis.year" },
                  { year: data.year }
                )}
            {!!directors.length &&
              intl.formatMessage({ id: "publications.header.thesis.directed" })}
            {directors.map((director, index) => (
              <>
                <Link key={index} href={`/authors/${director.person}`}>
                  {director.fullName}
                </Link>
                {(directors.length === 2 && index === 0) ||
                index === directors.length - 2
                  ? intl.formatMessage({ id: "publications.header.thesis.and" })
                  : index < directors.length - 1
                  ? ", "
                  : ""}
              </>
            ))}
          </em>
        </Text>
      </div>
      {summary && (
        <Row>
          <Text className="fr-mt-3w fr-mb-0" bold>
            {intl.formatMessage({ id: "publications.header.summary" })}
          </Text>
          <Truncate lines={10} className="fr-mt-2w">
            <Text className="fr-m-0" size="sm">
              {summary}
            </Text>
          </Truncate>
        </Row>
      )}
    </section>
  );
}
