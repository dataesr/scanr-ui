import { isInDev, isInStaging } from "../utils/helpers";

const {
  VITE_API_URL: API_URL,
  VITE_API_KEY: API_KEY,
  VITE_TOPICS_URL: TOPICS_URL,
  VITE_TICKET_OFFICE_API_KEY: TICKET_OFFICE_API_KEY,
} = import.meta.env;

// Headers
export const headers = API_KEY ? { Authorization: `Basic ${API_KEY}` } : {};
export const postHeaders = { ...headers, "Content-Type": "application/json" };
export const ticketOfficeHeaders = TICKET_OFFICE_API_KEY
  ? { Authorization: `Basic ${TICKET_OFFICE_API_KEY}` }
  : {};
export const postHeadersTicketOffice = {
  ...ticketOfficeHeaders,
  "Content-Type": "application/json",
};

const getIndexURL = (baseURL: string, path: string) => {
  const base = `${baseURL}/${path}`
  if (isInDev() || isInStaging()) return `${base}-staging`;
  return base;
};

// Indices
export const publicationsIndex = getIndexURL(API_URL, "scanr-publications");
export const authorsIndex = getIndexURL(API_URL, "scanr-persons");
export const organizationsIndex = getIndexURL(API_URL, "scanr-organizations");
export const projectsIndex = getIndexURL(API_URL, "scanr-projects");
export const patentsIndex = getIndexURL(API_URL, "scanr-patents");
export const localisationIndex = getIndexURL(API_URL, "scanr-localisations");
export const countriesIndex = getIndexURL(API_URL, "scanr-countries");
export const topicsURL = TOPICS_URL ? `${TOPICS_URL}/topics` : "/topics";
