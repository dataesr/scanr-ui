const fieldsMapping = {
  topic: ["subfield", "field", "domain"],
  subfield: ["field", "domain"],
  field: ["domain"],
  domain: [],
}

type OpenAlexRow = Record<string, string | number>
type OpenAlexTable = Record<string, OpenAlexRow>

let openAlexData: Promise<Array<OpenAlexRow>> | undefined
const openAlexTables: Record<string, OpenAlexTable> = {}

// The mapping table is only needed on the trends page: load it on demand, once
function openAlexLoadData() {
  if (!openAlexData) openAlexData = import("./openalex_topic_mapping_table.json").then((module) => module.default)
  return openAlexData
}

async function openAlexGetTable(indexField: string) {
  if (!openAlexTables[indexField]) {
    const data = await openAlexLoadData()
    openAlexTables[indexField] = data.reduce<OpenAlexTable>((acc, row) => {
      acc[String(row[indexField])] = row
      return acc
    }, {})
  }
  return openAlexTables[indexField]
}

export default async function openAlexGetData(field: string, value: string | number) {
  const openAlexTable = await openAlexGetTable(`${field}_name`)
  const allData = openAlexTable[value]
  const fields = fieldsMapping[field]

  if (!allData) return {}

  const data = {
    ...fields.reduce((acc, field: string) => {
      acc[field] = {
        label: allData[`${field}_name`],
        id: allData[`${field}_id`],
      }
      return acc
    }, {}),
  }

  return data
}
