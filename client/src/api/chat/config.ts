const { VITE_MISTRAL_URL, VITE_MISTRAL_KEY } = import.meta.env
const headers = VITE_MISTRAL_KEY ? { Authorization: `Bearer ${VITE_MISTRAL_KEY}` } : {}

export const MISTRAL_HEADERS = { ...headers, "Content-Type": "application/json" }
export const MISTRAL_URL = VITE_MISTRAL_URL
export const MISTRAL_MODELS = { small: "mistral-small-latest", large: "mistral-large-latest" }
