import { VOSviewerOnline } from "vosviewer-online"
import Error204 from "../errors/error204"
import { useNetworkContext } from "../../context"
import NetworkSpinner from "../spinner"

export default function NetworkGraph() {
  const {
    search,
    key,
    options: { focusItem },
  } = useNetworkContext()
  const theme = document.documentElement.getAttribute("data-fr-theme")

  if (search.isFetching && !search.data) return <NetworkSpinner />
  if (!search.data?.network) return <Error204 />

  const params = {
    largest_component: false,
    dark_ui: theme === "dark",
    simple_ui: false,
    show_item: focusItem,
  }

  return <VOSviewerOnline key={key} data={search.data} parameters={params} />
}
