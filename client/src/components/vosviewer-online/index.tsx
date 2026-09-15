import { ComponentType, lazy, ReactNode, Suspense } from "react"
import { Container, Spinner } from "@dataesr/dsfr-plus"

// vosviewer-online ships a 3.4 MB prebuilt bundle: load it only when a network is rendered
const VOSviewerOnline = lazy(() =>
  import("vosviewer-online").then((module) => ({ default: module.VOSviewerOnline as ComponentType<Record<string, unknown>> }))
)

type LazyVOSviewerOnlineProps = {
  data: unknown
  parameters?: Record<string, unknown>
  fallback?: ReactNode
  [key: string]: unknown
}

function DefaultFallback() {
  return (
    <Container fluid style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner />
    </Container>
  )
}

export default function LazyVOSviewerOnline({ fallback, ...props }: LazyVOSviewerOnlineProps) {
  return (
    <Suspense fallback={fallback ?? <DefaultFallback />}>
      <VOSviewerOnline {...props} />
    </Suspense>
  )
}
