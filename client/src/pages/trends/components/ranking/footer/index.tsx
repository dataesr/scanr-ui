import { Button, ButtonGroup, Container } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import useOptions from "../../../hooks/useOptions"
import useTrends from "../../../hooks/useTrends"

export default function TrendsTableFooter() {
  const intl = useIntl()
  const { currentPage, handlePageChange } = useOptions()
  const { trends, isFetching } = useTrends()

  const filteredPages = trends?.filteredPages || currentPage

  return (
    <Container fluid className="fr-mt-2w">
      <ButtonGroup isInlineFrom="xs" align="center">
        <Button
          variant="tertiary"
          icon="arrow-left-s-line"
          iconPosition="left"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFetching || currentPage === 1}
        >
          {intl.formatMessage({ id: "trends.ranking.page-previous" })}
        </Button>
        {currentPage > 1 && (
          <Button variant="tertiary" onClick={() => handlePageChange(1)} disabled={isFetching}>
            {1}
          </Button>
        )}
        {currentPage > 3 && (
          <Button variant="tertiary" disabled={isFetching}>
            {"..."}
          </Button>
        )}
        {currentPage > 2 && (
          <Button variant="tertiary" onClick={() => handlePageChange(currentPage - 1)} disabled={isFetching}>
            {currentPage - 1}
          </Button>
        )}
        <Button variant="secondary" disabled={isFetching}>
          {currentPage}
        </Button>
        {currentPage < filteredPages - 1 && (
          <Button variant="tertiary" onClick={() => handlePageChange(currentPage + 1)} disabled={isFetching}>
            {currentPage + 1}
          </Button>
        )}
        {currentPage < filteredPages - 2 && (
          <Button variant="tertiary" disabled={isFetching}>
            {"..."}
          </Button>
        )}
        {currentPage < filteredPages && (
          <Button variant="tertiary" onClick={() => handlePageChange(filteredPages)} disabled={isFetching}>
            {filteredPages}
          </Button>
        )}
        <Button
          variant="tertiary"
          icon="arrow-right-s-line"
          iconPosition="right"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isFetching || currentPage === filteredPages}
        >
          {intl.formatMessage({ id: "trends.ranking.page-next" })}
        </Button>
      </ButtonGroup>
    </Container>
  )
}
