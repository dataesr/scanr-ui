import { clinicalTrialsIndex, postHeaders } from '../../../config/api'
import { ExportArgs } from '../../../types/commons'
import { ExportClinicalTrial } from '../../../types/clinical-trial';
import csvify from '../../utils/csvify';
import { FIELDS } from '../_utils/constants';

const EXPORT_SOURCE = [
  "all_sources",
  "CTIS",
  "eudraCT",
  "id",
  "intervention_type",
  "lead_sponsor_normalized",
  "lead_sponsor_type",
  "NCTId",
  "other_ids",
  "ror",
  "status_simplified",
  "study_completion_year",
  "study_start_year",
  "study_type",
  "summary",
  "title",
]

const CSVFormatter = (data: ExportClinicalTrial[], ctx: string) => {
  const cols = [
    "all_sources",
    "CTIS",
    "eudraCT",
    "id",
    "intervention_type",
    "lead_sponsor_normalized",
    "lead_sponsor_type",
    "NCTId",
    "other_ids",
    "ror",
    "status_simplified",
    "study_completion_year",
    "study_start_year",
    "study_type",
    "summary",
    "title",
  ];
  const rows = data.map(item => [
    item?.all_sources,
    item?.CTIS,
    item?.eudraCT,
    item?.id,
    item?.intervention_type,
    item?.lead_sponsor_normalized,
    item?.lead_sponsor_type,
    item?.NCTId,
    (item?.other_ids ?? []).map((other_id) => `${other_id.type} : ${other_id.id}`).join(', '),
    item?.ror,
    item?.status_simplified,
    item?.study_completion_year,
    item?.study_start_year,
    item?.study_type,
    item?.summary,
    item?.title,
    `https://scanr.enseignementsup-recherche.gouv.fr/clinical-trials/${item.id}`,
    new Date().toISOString(),
    ctx,
  ]);
  return new Blob([csvify(rows, cols)], { type: 'text/csv' });
};
const JSONFormatter = (data: ExportClinicalTrial[]) => {
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

const exporter = (format) => format === 'csv' ? CSVFormatter : JSONFormatter;


export async function exportClinicalTrials({ query, filters, format = 'csv', ctx }: ExportArgs): Promise<Blob> {
  const body: any = {
    _source: EXPORT_SOURCE,
    size: 1000,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = filters;
  const res = await fetch(
    `${clinicalTrialsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const data: ExportClinicalTrial[] = json?.hits?.hits.map(hit => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob
}