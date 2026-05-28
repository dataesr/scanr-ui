import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"
import { RawIntlProvider, createIntl } from "react-intl"
import { useParams } from "react-router-dom"

import { getClinicalTrialById } from "../../../api/clinical-trials/[id]"
import BaseSkeleton from "../../../components/skeleton/base-skeleton"
import PageSkeleton from "../../../components/skeleton/page-skeleton"
import ClinicalTrial from "./components/clinical-trial"

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {})

export default function ClinicalTrialPage() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ["clinical-trial", id],
    queryFn: () => getClinicalTrialById(id),
    throwOnError: true,
  })

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "clinical-trials.breadcrumb.home" })}
          </Link>
          <Link href="/search/clinical-trials">
            {intl.formatMessage({ id: "clinical-trials.breadcrumb.search" })}
          </Link>
          <Link>
            {data?.title?.slice(0, 80)}
            {data?.title?.length > 80 ? " ..." : ""}
            {!data?.title && (
              <BaseSkeleton width="180px" height="1rem" />
            )}
          </Link>
        </Breadcrumb>
        {isLoading || !data ? (
          <PageSkeleton />
        ) : (
          <ClinicalTrial data={data} />
        )}
      </Container>
    </RawIntlProvider>
  );
}
