import { TagInput, Text } from "@dataesr/dsfr-plus"
import { FormattedMessage } from "react-intl"
import useUrl from "../../../hooks/useUrl"
import OperatorButton from "../../../../../components/operator-button"
import IconLink from "../../../../../components/icon-link"

export default function PublicationVariationsFilter() {
  const { currentFilters, handleFilterChange, setOperator } = useUrl()

  const key = "bso_local_affiliations"
  const filter = currentFilters?.[key]
  const operator = filter?.operator || "or"

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-mb-1v" bold size="md">
            <FormattedMessage id="search.filters.publications.by-variations" />
          </Text>
          <Text className="fr-card__detail fr-mb-2w" size="sm">
            <FormattedMessage id="search.filters.publications.by-variations-description" />
            <IconLink
              className="fr-ml-1w"
              target="_blank"
              href="https://barometredelascienceouverte.esr.gouv.fr/declinaisons/comment-realiser-bso-local?expanded=0"
              icon="question-line"
            />
          </Text>
        </div>
        <OperatorButton
          operator={operator}
          setOperator={(operator) => setOperator(key, operator === "and" ? "and" : "or")}
        />
      </div>
      <TagInput
        key={key}
        label=""
        tags={currentFilters?.[key]?.values?.map((tag) => String(tag.value))}
        onTagsChange={(tags) => tags.forEach((tag) => handleFilterChange({ field: key, value: tag }))}
      />
    </>
  )
}
