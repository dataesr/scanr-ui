import {
  Button, Container, Text,
} from "@dataesr/dsfr-plus";
import { useIntl } from "react-intl";
import useSearchData from "../../../hooks/useSearchData";
import Modal from "../../../../../components/modal";
import BaseSkeleton from "../../../../../components/skeleton/base-skeleton";
import useUrl from "../../../hooks/useUrl";
import OrganizationKindFilter from "./kind";
import OrganizationLevelFilter from "./level";
import OrganizationSupervisorsFilter from "./supervisors";
import OrganizationFunderFilter from "./funders";
import OrganizationAgreementsFilter from "./agreements";
import OrganizationAwardsFilter from "./awards";
import OrganizationRegionsFilter from "./regions";



export default function OrganizationFilters() {
  const intl = useIntl()
  const { total, search: { isFetching } } = useSearchData();
  const { api } = useUrl()

  const id = `${api}-filters`;

  return (
    <>
      <Modal
        footer={(
          <div style={{ display: 'flex', width: '100%', alignItems: "center" }}>
            <div style={{ flexGrow: 1 }}>
              {(total && total === 10000) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
                {intl.formatMessage({ id: "search.top.result-more-than" })}
              </Text>) : null
              }
              {(total && total > 0) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
                {intl.formatMessage(
                  { id: "search.top.organizations.filters.result-count" },
                  { count: total }
                )}
              </Text>) : <BaseSkeleton height="1.25rem" width="30%" />}
            </div>
            <Button aria-controls={id} disabled={isFetching}>
              {intl.formatMessage({ id: "search.top.filters.display" })}
            </Button>
          </div>
        )}
        id={id}
        size="xl"
        title={intl.formatMessage({ id: "search.filters.organizations.title" })}
      >
        <Container fluid className="fr-my-2w filter-list">
          <OrganizationRegionsFilter />
          <hr className="fr-mt-3w" />
          <OrganizationKindFilter />
          <hr className="fr-mt-3w" />
          <OrganizationLevelFilter />
          <hr className="fr-mt-3w" />
          <OrganizationSupervisorsFilter />
          <hr className="fr-mt-3w" />
          <OrganizationFunderFilter />
          <hr className="fr-mt-3w" />
          <OrganizationAgreementsFilter />
          <hr className="fr-mt-3w" />
          <OrganizationAwardsFilter />
          <hr className="fr-mt-3w" />
        </Container>
      </Modal>
    </>
  )
}
