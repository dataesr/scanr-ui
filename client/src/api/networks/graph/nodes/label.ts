import Graph from "graphology"

export const institutionsAcronyms = {
  n2X5f: "CNRS",
  bZiTA: "INSERM",
  zYXK8: "CEA",
  Uan45: "IRD",
  t4SA4: "INRAE",
  E1Wdn: "INRIA",
  CvdQn: "CNES",
  F6Zt5: "IFREMER",
  JQKHK: "ENAC",
  "195922846R": "BRGM",
  zO154: "ONERA",
  MQpzc: "CSTB",
  "7dd3j": "CIRAD",
  "202224326A": "INED",
  "6ePuH": "ADEME",
  gFuBu: "ANSES",
  PpsCQ: "Univ. PSL",
  "8k41p": "INSA Lyon",
  ab5z5: "INSA Strasbourg",
  "3GxJ8": "INSA Rennes",
  dj88d: "INSA Toulouse",
  J3Mu2: "INSA HDF",
  H3nOd: "UTC",
  PVnB4: "UTBM",
  "8tVLr": "UTT",
  u82xd: "UTTOP",
  Py0K5: "APHP",
  dUyiC: "APHM",
  XR16q: "CNAM",
  QtZkX: "Inst. d'optique", // cours des comptes 15/06/2026
  "05hh8d621": "IBM", // cours des comptes 15/06/2026 TODO: change in patents ?
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
  "ecole normale superieure": "ENS",
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

export default function graphReplaceNodesLabels(graph: Graph, model: string) {
  // Replace institutions labels
  if (["institutions", "structures", "organizations"].includes(model)) {
    graph.updateEachNodeAttributes((node, attr) => ({
      ...attr,
      label: institutionsAcronyms?.[node] || institutionsReplaceLabel(attr.label),
    }))
  }
}
