import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BadgeGroup, Badge, Text, Link } from "@dataesr/dsfr-plus";
import { publicationTypeMapping, encode } from "../../../../utils/string";
import { getPublicationById } from "../../../../api/publications/[id]";
import { LightPublication } from "../../../../types/publication";
import { ItemProps } from "../../types";
import { IntlShape, useIntl } from "react-intl";

const AUTHOR_DISPLAY_LIMIT = 3;

const isThesis = (publication: LightPublication) =>
  publication.type === "thesis";

type TAuthors = LightPublication["authors"];

const AuthorDisplay = ({ author }: { author: TAuthors[0] }) => {
  if (!author?.person) return author.fullName;
  return (
    <Link href={`/authors/${encode(author.person)}`}>{author.fullName}</Link>
  );
};
type AuthorListDisplayProps = {
  authors: TAuthors;
  intl: IntlShape;
  limit?: number;
};
const AuthorListDisplay = ({
  authors,
  intl,
  limit = AUTHOR_DISPLAY_LIMIT,
}: AuthorListDisplayProps) => {
  if (!authors || authors.length === 0) return null;
  if (authors.length === 1) return <AuthorDisplay author={authors[0]} />;

  const shouldShowAllAuthors = !limit || authors.length <= limit;
  const displayedAuthors = authors.slice(
    0,
    shouldShowAllAuthors ? authors.length : 1
  );

  return (
    <>
      {displayedAuthors.map((author, index) => (
        <Fragment key={index}>
          {index > 0 &&
          index === displayedAuthors.length - 1 &&
          authors.length <= limit
            ? ` ${intl.formatMessage({
                id: "search.publications.thesis.and",
              })} `
            : index > 0
            ? ", "
            : ""}
          <AuthorDisplay author={author} />
        </Fragment>
      ))}
      {!shouldShowAllAuthors && authors.length > limit && (
        <Text bold as="span">
          <i> et al.</i>
        </Text>
      )}
    </>
  );
};
const ThesisAuthors = ({
  intl,
  authors,
}: {
  authors: LightPublication["authors"];
  intl: IntlShape;
}) => {
  const _authors = (authors || []).filter((author) => author.role === "author");
  const _directors = (authors || []).filter(
    (author) => author.role === "directeurthese"
  );

  return (
    <>
      <Text bold size="sm" className="fr-mb-0">
        {_authors.length > 0 && (
          <>
            {intl.formatMessage({ id: "search.publications.thesis.by" })}
            <AuthorListDisplay authors={_authors} intl={intl} limit={0} />
          </>
        )}
        {_directors.length > 0 && (
          <>
            {intl.formatMessage({ id: "search.publication.thesis.directed" })}
            <AuthorListDisplay authors={_directors} intl={intl} limit={0} />
          </>
        )}
      </Text>
    </>
  );
};

const ArticleAuthors = ({
  intl,
  authors,
}: {
  authors: LightPublication["authors"];
  intl: IntlShape;
}) => {
  return (
    <Text bold size="sm" className="fr-mb-0">
      <AuthorListDisplay authors={authors} intl={intl} />
    </Text>
  );
};
const Authors = ({
  intl,
  authors = [],
  isThesis,
}: {
  authors: LightPublication["authors"];
  intl: IntlShape;
  isThesis: boolean;
}) => {
  return isThesis ? (
    <ThesisAuthors intl={intl} authors={authors} />
  ) : (
    <ArticleAuthors intl={intl} authors={authors} />
  );
};

export default function PublicationItem({
  data: publication,
  highlight,
}: ItemProps<LightPublication>) {
  const queryClient = useQueryClient();
  const intl = useIntl();

  function prefetch(id: string) {
    if (!id) return;
    queryClient.prefetchQuery({
      queryKey: ["publication", id],
      queryFn: () => getPublicationById(id),
    });
  }
  return (
    <Fragment key={publication.id}>
      <div className="result-item">
        <BadgeGroup className="fr-mt-1v">
          <Badge size="sm" color="purple-glycine" noIcon>
            {publicationTypeMapping[publication.type] ||
              intl.formatMessage({ id: "search.publications.other" })}
          </Badge>
          {(publication?.isOa === true) && <Badge size="sm" color="green-emeraude" icon="lock-unlock-line">
            {intl.formatMessage({ id: "search.publications.openAccess" })}
          </Badge>}
        </BadgeGroup>
        <span onMouseEnter={() => prefetch(publication.id)}>
          <Link
            href={`/publications/${encode(publication.id)}`}
            className="fr-link"
          >
            {highlight?.["title.default"] ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight["title.default"],
                }}
              />
            ) : (
              publication.title?.default ||
              publication.title?.fr ||
              publication.title?.en
            )}
          </Link>
        </span>
        {publication.authors && (
          <Authors
            intl={intl}
            authors={publication.authors}
            isThesis={isThesis(publication)}
          />
        )}
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {[
              publication.source?.title,
              publication.source?.volume && `${publication.source?.volume}`,
              publication.source?.issue && `(${publication.source?.issue})`,
              publication.year,
              publication.source?.publisher,
            ]
              .filter(Boolean)
              .join(", ")}
          </i>
        </Text>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  );
}
