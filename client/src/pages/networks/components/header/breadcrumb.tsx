import { useIntl } from "react-intl"
import { useNetworkContext } from "../../context"
import { Breadcrumb, Link } from "@dataesr/dsfr-plus"

export default function NetworksBreadcrumb() {
  const intl = useIntl()
  const {
    integration: { integrationOptions },
  } = useNetworkContext()

  if (integrationOptions?.showBreadcrumb === false) return null

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">{intl.formatMessage({ id: "networks.top.breadcrumb.home" })}</Link>
      <Link current>{intl.formatMessage({ id: "networks.top.breadcrumb.analyze" })}</Link>
    </Breadcrumb>
  )
}
