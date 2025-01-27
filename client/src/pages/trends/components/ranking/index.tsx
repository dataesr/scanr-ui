import { useEffect } from "react"
import { useIntl } from "react-intl"
import { useInView } from "react-intersection-observer"
import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import useTrends from "../../hooks/useTrends"
import { TrendsRankingContext, useTrendsRankingContext } from "../../context/rankingContext"
import useOptions from "../../hooks/useOptions"
import TrendsRankingItem from "./item"
import TrendsRankingHeader from "./header"
import BaseSkeleton from "../../../../components/skeleton/base-skeleton"

const itemsPerScroll = 10
const scrollPerPage = 3
const scrollYTop = 200

function TrendsRankingItems() {
  const intl = useIntl()
  const [ref, inView] = useInView()
  const { sort, startsWith } = useTrendsRankingContext()
  const { currentPage, handlePageChange } = useOptions()
  const { trends, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, error } = useTrends()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const navigateToPage = (page: number) => {
    handlePageChange(page)
    window.scrollTo(0, scrollYTop)
  }

  if (isFetching && !isFetchingNextPage) return <BaseSkeleton height="500px" />
  if (!trends?.pages || error) return <div>no data</div>

  const shouldChangePage = trends.pageParams.length >= scrollPerPage
  const totalPages = Math.ceil((trends?.pages?.[0]?.total || 0) / (itemsPerScroll * scrollPerPage))

  return (
    <>
      <div className="fr-accordions-group">
        {trends.pages.map((page) =>
          page.ranking?.[sort]
            .filter((item) => item.label.toLowerCase().includes(startsWith))
            ?.map((item, index) => <TrendsRankingItem key={index} item={item} />)
        )}
      </div>
      {isFetchingNextPage && <BaseSkeleton height="300px" />}
      {!isFetchingNextPage && !shouldChangePage && hasNextPage && <div ref={ref} />}
      {!isFetchingNextPage && shouldChangePage && (
        <Container fluid className="fr-mt-2w">
          <ButtonGroup isInlineFrom="xs" align="center">
            <Button
              variant="tertiary"
              icon="arrow-left-s-line"
              iconPosition="left"
              onClick={() => navigateToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {intl.formatMessage({ id: "trends.ranking.page-previous" })}
            </Button>
            {currentPage > 1 && (
              <Button variant="tertiary" onClick={() => navigateToPage(1)}>
                {1}
              </Button>
            )}
            {currentPage > 3 && <Button variant="tertiary">{"..."}</Button>}
            {currentPage > 2 && (
              <Button variant="tertiary" onClick={() => navigateToPage(currentPage - 1)}>
                {currentPage - 1}
              </Button>
            )}
            <Button variant="secondary">{currentPage}</Button>
            {currentPage < totalPages - 1 && (
              <Button variant="tertiary" onClick={() => navigateToPage(currentPage + 1)}>
                {currentPage + 1}
              </Button>
            )}
            {currentPage < totalPages - 2 && <Button variant="tertiary">{"..."}</Button>}
            {currentPage < totalPages && (
              <Button variant="tertiary" onClick={() => navigateToPage(totalPages)}>
                {totalPages}
              </Button>
            )}
            <Button
              variant="tertiary"
              icon="arrow-right-s-line"
              iconPosition="right"
              onClick={() => navigateToPage(currentPage + 1)}
              disabled={!hasNextPage}
            >
              {intl.formatMessage({ id: "trends.ranking.page-next" })}
            </Button>
          </ButtonGroup>
        </Container>
      )}
    </>
  )
}

export default function TrendsRanking() {
  return (
    <Container>
      <TrendsRankingContext>
        <Container fluid className="fr-card">
          <TrendsRankingHeader />
          <TrendsRankingItems />
        </Container>
      </TrendsRankingContext>
    </Container>
  )
}
