import { postHeaders, projectsIndex } from "../../../config/api";
import { Project } from "../../../types/project";

export async function getProjectById(id: string): Promise<Project> {
  const body: any = {
    query: {
      bool: {
        filter: [{ term: { "id.keyword": id } }],
      },
    },
  };
  const res = await fetch(`${projectsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });

  const data = await res.json();
  const patent = data?.hits?.hits?.[0]?._source;
  if (!patent) throw new Error("404");
  return { ...patent, _id: data?.hits?.hits?.[0]._id };
}
