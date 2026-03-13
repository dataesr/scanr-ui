import {
  Breadcrumb,
  Container,
  Link,
  Notice,
  useDSFRConfig,
} from "@dataesr/dsfr-plus";
import { useQuery } from "@tanstack/react-query";
import { RawIntlProvider, createIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { getOrganizationById } from "../../../api/organizations/[id]";
import PageSkeleton from "../../../components/skeleton/page-skeleton";
import getLangFieldValue from "../../../utils/lang";
import OrganizationPresentation from "./components/organization";

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

export default function Organization() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    throwOnError: true,
  });

  // if Date.parse fails, it returns NaN and NaN compares false to everything
  // it then defaults to false if data?.endDate is undefined, null or invalid
  // it returns true only if data?.endDate is a valid date in the past
  const isClosed = Date.parse(data?.endDate) < Date.now();

  const isForeign = data?.isFrench === false;
  const breadcrumbLabel = getLangFieldValue(locale)(data?.label);

  return (
    <RawIntlProvider value={intl}>
      {isForeign && (
        <Notice closeMode="disallow" type="warning">
          {intl.formatMessage({ id: "organizations.notice.not-french" })}
        </Notice>
      )}
      {isClosed && (
        <Notice closeMode="disallow" type="warning">
          {intl.formatMessage({ id: "organizations.notice.closed" })}{" "}
          {new Date(data.endDate).toLocaleDateString()}.
        </Notice>
      )}
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "organizations.breadcrumb.home" })}
          </Link>
          <Link href="/search/organizations">
            {intl.formatMessage({ id: "organizations.breadcrumb.search" })}
          </Link>
          <Link>{breadcrumbLabel}</Link>
        </Breadcrumb>
        {(isLoading || !data?.id) && <PageSkeleton />}
        {data?.id && <OrganizationPresentation data={data} />}
      </Container>
    </RawIntlProvider>
  );
}
