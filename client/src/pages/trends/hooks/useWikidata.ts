import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { WikipediaResult } from "../../../components/wiki/types"
import { useDSFRConfig } from "@dataesr/dsfr-plus"
import { getWikidataPreviews } from "../../../components/wiki/api"
import { useTrendsRankingContext } from "../context/rankingContext"
import useTrends from "./useTrends"
import useOptions from "./useOptions"

export default function useWikidata() {
  const { locale } = useDSFRConfig()
  const { sort } = useTrendsRankingContext()
  const { trends } = useTrends()
  const { currentModel } = useOptions()

  const codes =
    currentModel === "entity-fishing"
      ? trends?.pages?.flatMap((page) => page?.ranking?.[sort].map((item) => ({ code: item.id })))
      : null

  const {
    data: wikis,
    isFetching,
    error,
  } = useQuery<WikipediaResult[]>({
    queryKey: ["wikidatas", codes?.map((c) => c.code), locale],
    queryFn: () => getWikidataPreviews(codes, locale),
    enabled: !!codes?.length,
  })

  const values = useMemo(() => {
    return {
      wikis: wikis,
      isFetching: isFetching,
      error: error,
    }
  }, [wikis, isFetching, error])

  return values
}
