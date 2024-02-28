import { useMemo } from "react"
import { Container, Text, Spinner } from "@dataesr/dsfr-plus"
import { VOSviewerOnline } from "vosviewer-online"
import useSearchData from "../hooks/useSearchData"

export function Graph({ currentTab }: { currentTab: string }) {
  const { search, currentQuery, currentFilters } = useSearchData(currentTab)

  const vosviewer = search?.data
  const key = useMemo(
    () => JSON.stringify({ currentTab, currentQuery, currentFilters }),
    [currentTab, currentQuery, currentFilters]
  )

  if (currentQuery === null) return <></>

  if (search.isFetching)
    return (
      <Container
        className="fr-mt-5w"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}
      >
        <Spinner />
      </Container>
    )

  if (!vosviewer?.network)
    return (
      <Container
        className="fr-mt-5w"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px" }}
      >
        <Text>No results with this query / filters...</Text>
      </Container>
    )

  const theme = document.documentElement.getAttribute("data-fr-scheme")
  const parameters = {
    attraction: 1,
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
    show_info: true,
  }

  return (
    <Container key={key} className="fr-mt-5w" style={{ height: "500px" }}>
      <VOSviewerOnline data={vosviewer} parameters={parameters} />
    </Container>
  )
}
