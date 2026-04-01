import { isInDev, isInStaging } from "../utils/helpers";

const {
  VITE_API_URL: API_URL,
  VITE_API_KEY: API_KEY,
  VITE_API_KEY_BSO: API_KEY_BSO,
  VITE_TOPICS_URL: TOPICS_URL,
  VITE_TICKET_OFFICE_API_KEY: TICKET_OFFICE_API_KEY,
} = import.meta.env;

// Headers
export const headers = API_KEY ? { Authorization: `Basic ${API_KEY}` } : {};
export const headersBso = API_KEY_BSO
  ? { Authorization: `Basic ${API_KEY_BSO}` }
  : {};
export const postHeaders = { ...headers, "Content-Type": "application/json" };
export const postHeadersBso = {
  ...headersBso,
  "Content-Type": "application/json",
};
export const ticketOfficeHeaders = TICKET_OFFICE_API_KEY
  ? { Authorization: `Basic ${TICKET_OFFICE_API_KEY}` }
  : {};
export const postHeadersTicketOffice = {
  ...ticketOfficeHeaders,
  "Content-Type": "application/json",
};

const getIndexURL = (baseURL: string, path: string) => {
  const base = `${baseURL}/${path}`;
  if (isInDev() || isInStaging()) return `${base}-staging`;
  return base;
};

// Indices
export const authorsIndex = getIndexURL(API_URL, "scanr-persons");
export const clinicalTrialsIndex = getIndexURL(API_URL, "bso-clinical-trials");
export const countriesIndex = getIndexURL(API_URL, "scanr-countries");
export const localisationIndex = getIndexURL(API_URL, "scanr-localisations");
export const organizationsIndex = getIndexURL(API_URL, "scanr-organizations");
export const patentsIndex = getIndexURL(API_URL, "scanr-patents");
export const projectsIndex = getIndexURL(API_URL, "scanr-projects");
export const publicationsIndex = getIndexURL(API_URL, "scanr-publications");
export const topicsURL = TOPICS_URL ? `${TOPICS_URL}/topics` : "/topics";
