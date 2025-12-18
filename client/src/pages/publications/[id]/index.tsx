import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawIntlProvider, createIntl } from "react-intl";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import { getPublicationById } from "../../../api/publications/[id]";
import These from "./components/these";
import Publication from "./components/publication";
import BaseSkeleton from "../../../components/skeleton/base-skeleton";
import PageSkeleton from "../../../components/skeleton/page-skeleton";
import getLangFieldValue from "../../../utils/lang";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});



export default function Production() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["publication", id],
    queryFn: () => getPublicationById(id),
    throwOnError: true,
  });

  const title = getLangFieldValue(locale)(data?.title);

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "publications.breadcrumb.home" })}
          </Link>
          <Link href="/search/publications">
            {intl.formatMessage({ id: "publications.breadcrumb.search" })}
          </Link>
          <Link>
            {title?.slice(0, 80)}
            {title?.length > 80 ? " ..." : ""}
            {!title && (
              <BaseSkeleton width="180px" height="1rem" />
            )}
          </Link>
        </Breadcrumb>
        {isLoading || !data ? (
          <PageSkeleton />
        ) : (data?.type === "thesis" || data?.type === "ongoing_thesis") ? (
          <These data={data} />
        ) : (
          <Publication data={data} />
        )}
      </Container>
    </RawIntlProvider>
  );
}
