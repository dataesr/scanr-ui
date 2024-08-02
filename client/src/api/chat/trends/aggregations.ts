export default function aggregationsToJSON(publicationsAggs, projectsAggs) {
  const data = publicationsAggs?.year?.buckets
    .sort((a, b) => a.key - b.key)
    .map((item) => {
      const year = item.key
      const publicationsNumber = item.doc_count
      const projectsNumber = projectsAggs?.year?.buckets?.find(({ key }) => key === year)?.doc_count
      const openAccessPercentage = Number(
        ((item?.open_access?.buckets?.find((bucket) => bucket.key)?.doc_count || 0) / item.doc_count) * 100
      )
      const topAuthors = item?.top_authors?.buckets?.map((bucket) => {
        const author = bucket.key.split("###")
        const name = author[1]
        const isFrench = author[2]
        return { [name]: { publications: bucket.doc_count, isFrench: isFrench === "FR" ? true : false } }
      })
      const topAffiliations = item?.top_affiliations?.buckets?.map((bucket) => {
        const name = bucket.key.split("###")[1].split("|||")[0].slice(3).trim()
        return { [name]: { publications: bucket.doc_count } }
      })
      const topAbstracts = item?.top_publications?.hits?.hits?.map((hit, index) => ({
        [index]: hit._source.summary?.default,
      }))
      const topProjects = projectsAggs?.year?.buckets
        ?.find(({ key }) => key === year)
        ?.top_projects?.hits?.hits?.map((hit, index) => ({
          [index]: hit._source.description?.en,
        }))

      return {
        [year]: {
          number_of_publications: publicationsNumber,
          number_of_projects: projectsNumber,
          ...(openAccessPercentage && { open_access_percentage: `${openAccessPercentage.toFixed(1)} %` }),
          ...(topAuthors && { top_authors: topAuthors }),
          ...(topAffiliations && { top_affiliations: topAffiliations }),
          ...(topAbstracts && { top_abstracts: topAbstracts }),
          ...(topProjects && { top_projects: topProjects }),
        },
      }
    })

  console.log("DATA", data)

  return data
}
