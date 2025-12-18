
export function encode(value: string): string {
  if (!value) return value;
  return value.replace(/\//g, "%2F");
}

export const publicationTypeMapping = {
  book: "ouvrage",
  "book-chapter": "chapitre d'ouvrage",
  "book-part": "chapitre d'ouvrage",
  "book-section": "chapitre d'ouvrage",
  "book-track": "chapitre d'ouvrage",
  component: "autre",
  dataset: "autre",
  "journal-article": "article de journal",
  "journal-issue": "autre",
  lecture: "autre",
  map: "autre",
  mem: "autre",
  monograph: "ouvrage",
  multimedia: "autre",
  other: "autre",
  patent: "autre",
  "peer-review": "autre",
  "posted-content": "autre",
  poster: "autre",
  presconf: "autre",
  proceedings: "communication",
  "proceedings-article": "comunication",
  "proceedings-series": "comunication",
  "reference-book": "autre",
  "reference-entry": "autre",
  report: "autre",
  "report-series": "autre",
  software: "autre",
  standard: "autre",
  thesis: "these",
  these: "these",
  video: "autre",
  "ongoing_thesis": "thèse en cours"
};
