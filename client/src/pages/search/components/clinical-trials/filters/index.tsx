import {
  Button, Container, Text
} from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

import Modal from "../../../../../components/modal"
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton"
import useSearchData from "../../../hooks/useSearchData"
import useUrl from "../../../hooks/useUrl"
import ClinicalTrialLeadSponsorTypeFilter from "./leadSponsorType"
import ClinicalTrialRorFilter from "./ror"

export default function ClinicalTrialFilters() {
  const intl = useIntl()
  const { total, search: { isFetching } } = useSearchData();
  const { api } = useUrl()

  const id = `${api}-filters`;

  return (
    <>
      <Modal id={id} size="lg" title={intl.formatMessage({ id: "search.top.filters.clinical-trials.title" })}>
        <Container fluid className="fr-my-2w">
          <ClinicalTrialRorFilter />
          <ClinicalTrialLeadSponsorTypeFilter />
          <hr className="fr-mt-3w" />
        </Container>
        <div className='fr-modal__footer fr-px-0' style={{ display: 'flex', width: '100%', alignItems: "center" }}>
          <div style={{ flexGrow: 1 }}>
            {(total && total === 10000) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage({ id: "search.top.result-more-than" })}
            </Text>) : null
            }
            {(total && total > 0) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage(
                { id: "search.top.clinical-trials.filters.result-count" },
                { count: total }
              )}
            </Text>) : <BaseSkeleton height="1.25rem" width="30%" />}
          </div>
          <Button aria-controls={id} disabled={isFetching}>
            {intl.formatMessage({ id: "search.top.filters.display" })}
          </Button>
        </div>
      </Modal>
    </>
  )
}
