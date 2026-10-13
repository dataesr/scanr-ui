import { schemasURL } from "../config/api"

export async function getSchema(index: string) {
  const res = await fetch(`${schemasURL}/${index}.json`)
  return res.json()
}
