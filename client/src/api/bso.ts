const urlBsoLocals = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/locals.json"
const urlOpenAlex = "https://raw.githubusercontent.com/dataesr/bso-ui/main/src/config/openalex.json"

let cachedData = null
let cacheTime = 0
let refreshPromise = null

const CACHE_TTL = 60 * 60 * 1000

// use cache
export async function getBsoLocals(): Promise<Record<string, Record<string, unknown>>> {
  const now = Date.now()

  if (cachedData && now - cacheTime < CACHE_TTL) {
    return cachedData
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const bsoLocals = await fetch(urlBsoLocals).then((response) => (response.ok ? response.json() : {}))
      const bsoOpenAlex = await fetch(urlOpenAlex).then((response) => (response.ok ? response.json() : {}))

      cachedData = { ...bsoLocals, ...bsoOpenAlex }
      cacheTime = Date.now()

      return cachedData
    })().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

// initialize cached data
await getBsoLocals()
