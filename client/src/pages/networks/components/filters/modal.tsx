import { useNetworkContext } from "../../context"
import NetworkFiltersPatentsModal from "./patents"
import NetworkFiltersProjectsModal from "./projects"
import NetworkFiltersPublicationsModal from "./publications"

const SOURCES_MAPPING = {
  publications: <NetworkFiltersPublicationsModal />,
  patents: <NetworkFiltersPatentsModal />,
  projects: <NetworkFiltersProjectsModal />,
}

export default function NetworkFiltersModal() {
  const {
    options: { currentSource },
  } = useNetworkContext()

  return SOURCES_MAPPING[currentSource]
}
