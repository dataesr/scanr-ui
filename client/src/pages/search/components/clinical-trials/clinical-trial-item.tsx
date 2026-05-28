import { Badge, BadgeGroup, Link, Text } from "@dataesr/dsfr-plus";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useIntl } from "react-intl";

import { getClinicalTrialById } from "../../../../api/clinical-trials/[id]";
import { LightClinicalTrial } from "../../../../types/clinical-trial";
import { ItemProps } from "../../types";

const MAPPING_STATUS = {
  Completed: 'Terminé',
  Ongoing: 'En cours',
  Unknown: 'Statut non renseigné',
}

const MAPPING_SOURCES = {
  clinical_trials: 'ClinicalTrials.gov',
  ctis: 'Clinical Trials Information System',
  euctr: 'EU Clinical Trials Register',
}

export default function ClinicalTrialItem({
  data: clinicalTrial,
  highlight,
}: ItemProps<LightClinicalTrial>) {
  const intl = useIntl();
  const queryClient = useQueryClient();

  function prefetchClinicalTrial(id: string) {
    queryClient.prefetchQuery({
      queryKey: ["clinical-trial", id],
      queryFn: () => getClinicalTrialById(id),
    });
  }

  const id = clinicalTrial?.NCTId ?? clinicalTrial?.eudraCT ?? clinicalTrial?.CTIS;

  return (
    <Fragment key={id}>
      <div className="result-item" key={id}>
        <BadgeGroup className="structure-badge-list fr-mt-1v">
          <Badge size="sm" color="blue-cumulus">
            { intl.formatMessage({ id: `search.clinical-trials.${clinicalTrial?.study_type}` }) }
          </Badge>
          <Badge size="sm" color="blue-ecume">
            {intl.formatMessage({ id: 'search.clinical-trials.sponsor' })} {clinicalTrial?.lead_sponsor_type}
          </Badge>
        </BadgeGroup>
        <span onMouseEnter={() => prefetchClinicalTrial(id)}>
          <Link href={`/clinical-trials/${id}`} className="fr-link">
            {clinicalTrial.title}
          </Link>
        </span>
        <Text bold size="sm" className="fr-mb-0">
          {clinicalTrial?.lead_sponsor_normalized}
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {[
              `${clinicalTrial?.study_start_year ?? '...'} - ${clinicalTrial?.study_completion_year ?? '...'}`,
              MAPPING_STATUS?.[clinicalTrial?.status_simplified] ?? clinicalTrial?.status_simplified,
            ]
              .filter(Boolean)
              .join(", ")}
          </i>
        </Text>
        <Text size="sm" className="fr-card__detail fr-mb-0">
          <i>
            {intl.formatMessage({ id: "search.clinical-trials.sources" })}: {clinicalTrial?.all_sources.map((source) => MAPPING_SOURCES?.[source] ?? 'Source inconnue').join(", ")}
          </i>
        </Text>
        {Object.values(highlight || {}).map((value, i) => (
          <Text key={i} size="sm" className="fr-mb-0">
            <span dangerouslySetInnerHTML={{ __html: value }} />
          </Text>
        ))}
      </div>
    </Fragment>
  );
}
