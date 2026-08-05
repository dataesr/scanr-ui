import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus"
import { useQuery } from "@tanstack/react-query"
import { RawIntlProvider, createIntl } from "react-intl"
import { useParams } from "react-router-dom"

import { getProjectById } from "../../../api/projects/[id]"
import BaseSkeleton from "../../../components/skeleton/base-skeleton"
import PageSkeleton from "../../../components/skeleton/page-skeleton"
import getLangFieldValue from "../../../utils/lang"
import ProjectPresentation from "./components/project"

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1]
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc
}, {})

export default function Project() {
  const { locale } = useDSFRConfig()
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    throwOnError: true,
  })
  const title = getLangFieldValue(locale)(data?.label)

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            {intl.formatMessage({ id: "projects.breadcrumb.home" })}
          </Link>
          <Link href="/search/projects">
            {intl.formatMessage({ id: "projects.breadcrumb.search" })}
          </Link>
          <Link>
            {title?.slice(0, 80)}
            {title?.length > 80 ? " ..." : ""}
            {!title && <BaseSkeleton width="180px" height="1rem" />}
          </Link>
        </Breadcrumb>
        {(isLoading || !data) && <PageSkeleton />}
        {(data?.id) && <ProjectPresentation data={data} />}
      </Container>
    </RawIntlProvider>
  )
}