import { publicationsIndex, postHeaders } from '../../../config/api'
import { ExportArgs } from '../../../types/commons'
import { ExportPublication } from '../../../types/publication';
import csvify from '../../utils/csvify';
import { FIELDS } from '../_utils/constants';

const EXPORT_SOURCE = [
  "id",
  "title",
  "summary",
  "authors",
  "source",
  "type",
  "isOa",
  "publicationDate",
  "submissionDate",
]

const CSVFormatter = (data: ExportPublication[], ctx: string) => {
  const cols = [
    'Identifiant',
    'Titre',
    'Résumé',
    'Nom des auteurs',
    'Editeur',
    'Revue',
    'ISSN',
    'Type',
    'isOA',
    'Date de publication',
    'Date de soumission',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ];
  const rows = data.map(item => [
    item.id,
    (item.title?.default) && item.title.default,
    (item.summary?.default) && item.summary.default,
    item.authors?.map(a => a.fullName).join(';'),
    item.source?.publisher,
    item.source?.title,
    (item.source?.journalIssns) && item.source.journalIssns.join(';'),
    item.type,
    item.isOa,
    item.publicationDate && new Date(item.publicationDate).toISOString(),
    item.submissionDate && new Date(item.submissionDate).toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr/publications/${item.id}`,
    new Date().toISOString(),
    ctx,
  ]);
  return new Blob([csvify(rows, cols)], { type: 'text/csv' });
};
const JSONFormatter = (data: ExportPublication[]) => {
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

const exporter = (format) => format === 'csv' ? CSVFormatter : JSONFormatter;


export async function exportPublications({ query, filters, format = 'csv', ctx }: ExportArgs): Promise<Blob> {
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
    `${publicationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const data: ExportPublication[] = json?.hits?.hits.map(hit => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob
}