import { useQuery } from "@tanstack/react-query";
import { useDSFRConfig, Text, Badge, Link, Row } from "@dataesr/dsfr-plus";
import './styles.scss';
import { getWikidataPreviews } from "./api";
import { WikipediaResult } from "./types";
import { createIntl } from 'react-intl';
import BaseSkeleton from "../skeleton/base-skeleton";
import { Fragment } from "react/jsx-runtime";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

export default function Wiki({ wikis }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const codes = wikis?.map((w) => w.code);

  const { data, isError, isLoading } = useQuery<WikipediaResult[]>({
    queryKey: ["wikidatas", codes, locale],
    queryFn: () => getWikidataPreviews(wikis, locale),
    enabled: !!codes?.length,
  });

  if (!codes?.length || isError) return (
    <div className="fr-badge-group">
      {wikis?.map((w) => (
        <Badge key={w.code} size="sm">{w?.label?.default}</Badge>
      ))}
    </div>
  );
  if (isLoading) return (
    <Row className="fr-badge-group">
      {wikis?.map((w) => (
        <BaseSkeleton key={w.code} className="fr-badge" height="1.5rem" width="70px" />
      ))}
    </Row>
  );

  return (
    <div className="fr-badge-group">
      {data?.map((w) => (
        <Fragment key={w.code}>
          <Badge className="pointer" color={"purple-glycine"} aria-describedby={w.code} key={w.code} size="sm">{w?.label?.default}</Badge>
          <span className="fr-tooltip fr-placement" id={w.code} role="tooltip" aria-hidden="true">
            <div className="fr-p-2w">
              <Badge size="sm" color="info" className="fr-mt-2w fr-mb-1w">Concept wikipédia</Badge>
              <div className="wiki-text">
                <Text bold size="lg">
                  {w?.title}
                </Text>
                <Text size="sm">
                  {w?.extract}
                </Text>
              </div>
              {w?.image && (
                <img style={{ objectFit: "cover" }} width="100%" height="100px" src={w.image} aria-hidden />
              )}
              <hr className="fr-my-3w" />
              <Link href={`/search/publications?q="${w?.label?.default}"`}>
                {intl.formatMessage({ id: "wikipedia.search" })}
              </Link>
              <br className="fr-my-1w" />
              <Link href={w.url} target="_blank">
                {intl.formatMessage({ id: "wikipedia.visit" })}
              </Link>
            </div>
          </span>
        </Fragment>
      ))}
    </div>

  );

}
