import { Button, Row, Title } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useSearchParams } from "react-router-dom"
import useUrl, { stringifySearchFiltersForURL } from "../../hooks/useUrl"
import { LightAuthor } from "../../../../types/author"
import { ObjectModel } from "../../../../types/commons"

const SOURCES = new Set(["publications", "patents", "projects", "authors"])

export default function NavigateToNetwork({ currentList }: { currentList: ObjectModel[] }) {
  const intl = useIntl()
  const { api } = useUrl()
  const [searchParams] = useSearchParams()

  if (!SOURCES.has(api)) return null

  searchParams.set("source", api)
  let url = `/networks?${searchParams.toString()}`

  // For authors: use publications as source and filters by author id
  if (api === "authors") {
    const authors = currentList?.map((data: LightAuthor) => ({ value: data.id, label: data.fullName }))
    if (authors?.length) {
      searchParams.set("source", "publications")
      searchParams.set("model", "authors")
      searchParams.set(
        "filters",
        stringifySearchFiltersForURL({
          "authors.person": { type: "terms", values: authors },
        }),
      )
      url = `/networks?${searchParams.toString()}`
    }
  }

  return (
    <>
      <Row className="fr-mb-3w">
        <Title as="h2" className="fr-text--md fr-text--bold fr-m-0">
          {intl.formatMessage({ id: "search.navigate-to-network.label" })}
        </Title>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-1w">
          {intl.formatMessage({ id: "search.navigate-to-network.desc" })}
        </p>
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <Button size="sm" as="a" variant="text" icon="arrow-right-line" iconPosition="right" href={url}>
            {intl.formatMessage({ id: "search.navigate-to-network.button" })}
          </Button>
        </div>
      </Row>
    </>
  )
}
