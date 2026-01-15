import { useIntl } from "react-intl"
import { Accordion, Container, Row, Toggle } from "@dataesr/dsfr-plus"
import useNetworksIntegration from "../../../../networks/hooks/useIntegration"
import useTrendsIntegration from "../../../../trends/hooks/useIntegration"

const useIntegration = {
  networks: useNetworksIntegration,
  trends: useTrendsIntegration,
}

type StudioCreateOptionsArgs = {
  tool: string
  setOption: (name: string, value: string) => void
}
export default function StudioCreateOptions({ tool, setOption }: StudioCreateOptionsArgs) {
  const intl = useIntl()
  const noOptions = tool === "networks" ? "showGraphOnly" : "showTrendsOnly"
  const { integrationOptions } = useIntegration[tool]()

  return (
    <Accordion className="fr-mb-2w" title={intl.formatMessage({ id: "studio.create.options.label" })}>
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.${noOptions}`,
        })}
        checked={integrationOptions?.[noOptions]}
        onChange={(event) => setOption(noOptions, String(event.target.checked))}
      />
      <hr />
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.showHeader`,
        })}
        checked={integrationOptions?.showHeader}
        onChange={(event) => setOption("showHeader", String(event.target.checked))}
        disabled={integrationOptions?.[noOptions]}
      />
      <hr />
      <Toggle
        label={intl.formatMessage({
          id: `studio.options.${tool}.showOptionsBar`,
        })}
        checked={integrationOptions?.showOptionsBar}
        onChange={(event) => setOption("showOptionsBar", String(event.target.checked))}
        disabled={integrationOptions?.[noOptions]}
      />
      <Row horizontalAlign="left">
        {Object.entries(integrationOptions)
          .filter(([key]) =>
            [
              "showSearchBar",
              "showSelectModel",
              "showSelectSource",
              "showFilters",
              "showParameters",
              "showExports",
            ].includes(key)
          )
          .map(([key, value]) => (
            <Container fluid key={key} style={{ width: "300px" }}>
              <Toggle
                key={key}
                label={intl.formatMessage({ id: `studio.options.${tool}.${key}` })}
                checked={value as boolean}
                onChange={(event) => setOption(key, String(event.target.checked))}
                disabled={integrationOptions?.[noOptions] || !integrationOptions?.showOptionsBar}
              />
            </Container>
          ))}
      </Row>
      {tool === "networks" && (
        <Container fluid>
          <hr />
          <Row horizontalAlign="left">
            <Container fluid style={{ width: "300px" }}>
              <Toggle
                label={intl.formatMessage({ id: `studio.options.networks.forceClusters` })}
                checked={integrationOptions?.clusters}
                onChange={(event) => setOption("clusters", String(event.target.checked))}
                disabled={integrationOptions?.[noOptions]}
              />
            </Container>
            {Object.entries(integrationOptions)
              .filter(([key]) => ["showClustersAnalytics"].includes(key))
              .map(([key, value]) => (
                <Container fluid key={key} style={{ width: "300px" }}>
                  <Toggle
                    key={key}
                    label={intl.formatMessage({ id: `studio.options.networks.${key}` })}
                    checked={value as boolean}
                    onChange={(event) => setOption(key, String(event.target.checked))}
                    disabled={integrationOptions?.[noOptions]}
                  />
                </Container>
              ))}
          </Row>
        </Container>
      )}
    </Accordion>
  )
}
