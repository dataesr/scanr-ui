import { searchAuthors } from "../../authors/search"
import { searchPublications } from "../../publications/search"

export const TOOLS_CONFIG = [
  {
    type: "function",
    function: {
      description: "Find authors that publish the most scientific papers about a specific topic.",
      name: "get_authors",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "The topic or keyword, e.g. 'Climate change' or 'Sports'",
          },
          number: {
            type: "number",
            description: "The number of authors to find, max 10 authors",
          },
        },
        required: ["topic"],
      },
    },
  },
  {
    type: "function",
    function: {
      description: "Find the most relevant scientific publications about a specific topic.",
      name: "get_publications",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "The topic or keyword, e.g. 'climate change' or 'sports'",
          },
          number: {
            type: "number",
            description: "The number of publications to find, max 10 publications",
          },
        },
        required: ["topic"],
      },
    },
  },
]

async function get_authors({ topic, number }: { topic: string; number: number }) {
  const size = number ? Math.min(number, 10) : 5
  const data = await searchAuthors({ cursor: null, query: topic, filters: null, size: size }).then(({ data }) => data)
  const authors = data.map((author) => author._source.fullName)
  return { authors: authors }
}

async function get_publications({ topic, number }: { topic: string; number: number }) {
  const size = number ? Math.min(number, 10) : 5
  const data = await searchPublications({ cursor: null, query: topic, filters: null, size: size }).then(({ data }) => data)
  const publications = data.map((author) => author._source.title.default)
  return { publications: publications }
}

export const TOOLS_MAPPING = { get_authors: get_authors, get_publications: get_publications }
