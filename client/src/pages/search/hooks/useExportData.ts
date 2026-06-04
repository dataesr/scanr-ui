import { useCallback, useMemo, useState } from "react";
import { exportAuthors } from "../../../api/authors/export";
import { exportClinicalTrials } from "../../../api/clinical-trials/export";
import {
  exportOrganizations,
  exportOrganizationsForHe,
} from "../../../api/organizations/export";
import { exportPatents } from "../../../api/patents/export";
import { exportProjects } from "../../../api/projects/export";
import { exportPublications } from "../../../api/publications/export";
import useUrl from "./useUrl";

const API_MAPPING = {
  authors: exportAuthors,
  'clinical-trials': exportClinicalTrials,
  he: exportOrganizationsForHe,
  organizations: exportOrganizations,
  patents: exportPatents,
  projects: exportProjects,
  publications: exportPublications,
};

export default function useExportData() {
  const ctx = window.location.href;
  const { api, currentQuery, filters } = useUrl()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const exportFile = useCallback(
    async (format: "csv" | "json") => {
      const exportFn = API_MAPPING?.[api]
      if (exportFn) {
        setIsLoading(true);
        const data = await exportFn({
          query: currentQuery,
          filters,
          format,
          ctx,
        });
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${api}.${format}`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
      } else {
        setIsError(true)
      }
    },
    [api, currentQuery, filters, ctx]
  );

  const values = useMemo(() => {
    return { exportFile, isError, isExporting: isLoading };
  }, [exportFile, isError, isLoading]);
  return values;
}
