export default function aggregationsToJSON(aggregations) {
  const yearsJSON = aggregations?.year?.buckets.sort((a, b) => a.key - b.key).map((item) => ({ [item.key]: item.doc_count }))
  const authorsJSON = aggregations?.authors?.buckets
    .sort((a, b) => a.key - b.key)
    .map((item) => ({ [item.key]: item.doc_count }))

  return {
    ...(yearsJSON && { years: yearsJSON }),
    ...(authorsJSON && { authors: authorsJSON }),
  }
}
