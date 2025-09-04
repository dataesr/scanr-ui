import { postHeaders, patentsIndex } from "../../../config/api";
import { Patent } from "../../../types/patent";

export async function getPatentById(id: string): Promise<Patent> {
  const body: any = {
    // _source: [
    //   "id",
    //   "title",
    //   "summary",
    //   "submissionDate",
    //   "publicationDate",
    //   "grantedDate",
    //   "label.default",
    //   "authors.fullName",
    //   "patent.id",
    //   "patent.links.url",
    // ],
    query: {
      bool: {
        filter: [{ term: { id } }],
      },
    },
  };
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });

  const data = await res.json();
  const patent = data?.hits?.hits?.[0]?._source;
  if (!patent) throw new Error("404");
  return { ...patent, _id: data?.hits?.hits?.[0]._id };
}
