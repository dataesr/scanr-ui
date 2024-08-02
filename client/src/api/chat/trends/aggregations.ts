export default function aggregationsToJSON(aggregations) {
  const yearsJSON = aggregations?.year?.buckets.sort((a, b) => a.key - b.key).map((item) => ({ [item.key]: item.doc_count }))

  const summariesJSON = aggregations?.year?.buckets
    .sort((a, b) => a.key - b.key)
    .map((item) => ({
      [item.key]: item.top_publication.hits.hits.map((hit, index) => ({ [index]: hit._source.summary?.default })),
    }))

  const authorsJSON = aggregations?.authors?.buckets
    .sort((a, b) => b.doc_count - a.doc_count)
    .map((item) => {
      const author = item.key.split("###")
      const name = author[1]
      const isFrench = author[2]
      return { [name]: { publications: item.doc_count, isFrench: isFrench === "FR" ? true : false } }
    })

  const affiliationsJSON = aggregations?.affiliations?.buckets
    .sort((a, b) => b.doc_count - a.doc_count)
    .map((item) => {
      const name = item.key.split("###")[1].split("|||")[0].slice(3).trim()
      return { [name]: { publications: item.doc_count } }
    })

  const typeJSON = aggregations?.productionType?.buckets
    .sort((a, b) => b.doc_count - a.doc_count)
    .map((item) => ({ [item.key]: item.doc_count }))

  const isOaJSON = aggregations?.isOa?.buckets.map((item) => ({
    [item.key ? "open_access" : "closed_access"]: item.doc_count,
  }))

  return {
    ...(yearsJSON.length && { years: yearsJSON }),
    ...(summariesJSON.length && { summaries: summariesJSON }),
    ...(authorsJSON.length && { authors: authorsJSON }),
    ...(affiliationsJSON.length && { institutions: affiliationsJSON }),
    ...(typeJSON.length && { publicationType: typeJSON }),
    ...(isOaJSON.length && { openAccess: isOaJSON }),
  }
}
