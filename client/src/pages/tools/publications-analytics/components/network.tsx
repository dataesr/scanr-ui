import { VOSviewerOnline } from "vosviewer-online"
import useNetwork from "../hooks/useNetwork"
import { Container } from "@dataesr/dsfr-plus"



export default function Network({ model }: { model: "authors" | "structures"}) {
  const { search, currentQuery, filters } = useNetwork(model)
  const theme = document.documentElement.getAttribute("data-fr-theme")

  const data = search?.data

  if (search.isFetching) return "loading..."
  if (!data?.network) return "Erreur"

  const key = JSON.stringify({ currentQuery, filters, theme, model })
  const params = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
  }

  console.log(model, data)

  return (<Container fluid className="fr-mt-2w" style={{ height: "600px" }}>
  <VOSviewerOnline key={key} data={data} parameters={params} />
  </Container>)
}
