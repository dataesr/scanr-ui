import { TagInput, Text } from "@dataesr/dsfr-plus"
import { FormattedMessage } from "react-intl"
import useUrl from "../../../hooks/useUrl"

export default function PublicationTagsFilter() {
  const { currentFilters, handleFilterChange, handleDeleteFilter } = useUrl()

  const key = JSON.stringify(currentFilters?.["tags.id"]?.values?.map((tag) => String(tag.value)) || {})

  const handleTagsChange = (tags: string[]) => {
    handleDeleteFilter({ field: "tags.id" }) // delete before repopulate
    tags.forEach((tag) => handleFilterChange({ field: "tags.id", value: tag }))
  }

  return (
    <>
      <Text className="fr-mb-1v" bold size="md">
        <FormattedMessage id="search.filters.publications.by-tag" />
      </Text>
      <Text className="fr-card__detail fr-mb-2w" size="sm">
        <FormattedMessage id="search.filters.publications.by-tag-description" />
      </Text>
      <TagInput
        key={key}
        label=""
        tags={currentFilters?.["tags.id"]?.values?.map((tag) => String(tag.value))}
        onTagsChange={handleTagsChange}
      />
    </>
  )
}
