import Graph from "graphology"

export const ignoreIds = {
  domains: [
    "Q3526257", // Thèse d'exercice
    "Q913404", // Thèse d'exercice de médecine
    "Q669220", // Not available
    "Q37033", // w3.org
    "Q466", // www
    "Q823982", // MathML
    "Q142", // française
    "Q1000371", // personnalisation
  ],
  structures: ["200117996L"], // a2f fix: LAE-Colmar – Laboratoire agronomie et environnement - antenne colmar  TODO: fix in data
}

export const institutionsAcronyms = {
  "180089013": "CNRS",
  "180036048": "INSERM",
  "775685019": "CEA",
  "180006025": "IRD",
  "180070039": "INRAE",
  "180089047": "INRIA",
  "775665912": "CNES",
  "330715368": "IFREMER",
  "193112562": "ENAC",
  "195922846R": "BRGM",
  "775722879": "ONERA",
  "775688229": "CSTB",
  "331596270": "CIRAD",
  "202224326A": "INED",
  "385290309": "ADEME",
  "130012024": "ANSES",
  "130026149": "Univ. PSL",
  "196901920": "INSA Lyon",
  "196727671": "INSA Strasbourg",
  "193500972": "INSA Rennes",
  "193101524": "INSA Toulouse",
  "130025752": "INSA HDF",
  "267500452": "APHP",
  "261300081": "APHM",
  "197534712": "CNAM",
}

const institutionsShort = {
  "communauté d'universités et établissements": "COMUE",
  "communauté d'universités et d'établissements": "COMUE",
  "centre hospitalier régional universitaire": "CHRU",
  "centre hospitalier et universitaire": "CHU",
  "centre hospitalier universitaire": "CHU",
  "centre hospitalier régional": "CHR",
  "centre hospitalier": "CH",
  université: "Univ.",
  universite: "Univ.",
  university: "Univ.",
  institute: "Inst.",
  institut: "Inst.",
  laboratoire: "Lab.",
  laboratory: "Lab.",
  "école normale supérieure de": "ENS",
  "ecole normale superieure de": "ENS",
}

function adjustCase(match: string, replacement: string) {
  if (match === match.toUpperCase()) {
    return replacement.toUpperCase()
  } else if (match === match.toLowerCase()) {
    return replacement.toLowerCase()
  } else {
    return replacement
  }
}

export function institutionsReplaceLabel(label: string) {
  Object.entries(institutionsShort).forEach(([key, value]) => {
    const regex = new RegExp(key, "gi")
    label = label.replace(regex, (match) => adjustCase(match, value))
  })
  return label
}

export function mergeNodesFromLabel(graph: Graph, model: string) {
  if (!["domains"].includes(model)) return graph

  const labels = new Map()

  // map all labels
  graph.forEachNode((key, attrs) => {
    const label = attrs.label
    if (!labels.has(label)) labels.set(label, [])
    labels.get(label).push(key)
  })

  // console.log("labels", labels)

  labels.forEach((nodes, label) => {
    if (nodes.length <= 1) return
    console.log(label, nodes.length)

    const master = nodes[0]
    const dupes = nodes.slice(1)
    // console.log("master", master, "dupes", dupes)

    dupes.forEach((dupe) => {
      // merge nodes attributes
      const dupeAttr = graph.getNodeAttributes(dupe)

      // get weight of master/dupe link if it exist
      let masterLinkWeight = 0
      try {
        masterLinkWeight = graph.getUndirectedEdgeAttribute(master, dupe, "weight")
      } finally {
      }

      graph.updateNode(master, (attr) => ({
        label: attr.label,
        weight: attr.weight + dupeAttr.weight - masterLinkWeight,
        links: [...attr.links, ...dupeAttr.links],
        ...(attr?.maxYear || (dupeAttr?.maxYear && { maxYear: Math.max(attr?.maxYear || 0, dupeAttr?.maxYear || 0) })),
      }))

      // merge edges
      graph.forEachEdge(dupe, (_, dupeEdgeAttr, source, target) => {
        // console.log("key", key, "source", source, "target", target, "attr", dupeEdgeAttr)
        const other = source === dupe ? target : source
        if (other === master) return
        const edgeKey = master < other ? `${master}-link-${other}` : `${other}-link-${master}`
        const edgeSource = master < other ? master : other
        const edgeTarget = master < other ? other : master
        graph.updateUndirectedEdgeWithKey(edgeKey, edgeSource, edgeTarget, (attr) => ({
          weight: (attr?.weight || 0) + dupeEdgeAttr.weight,
          label: `${(attr?.weight || 0) + dupeEdgeAttr.weight} links`,
        }))
      })

      // drop dupe
      graph.dropNode(dupe)
    })
  })

  return graph
}
