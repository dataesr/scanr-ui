import { useCallback, useMemo, useState } from "react";

import { exportPublications } from "../../../../api/publications/export";
import useUrl from "../../hooks/useUrl";

export default function useExportData() {
  const ctx = window.location.href;
  const { currentQuery, filters } = useUrl();
  const [isLoading, setIsLoading] = useState(false);

  const exportFile = useCallback(
    async (format: "csv" | "json") => {
      setIsLoading(true);
      const data = await exportPublications({
        query: currentQuery,
        filters,
        format,
        ctx,
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `publications.${format}`);
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
    },
    [currentQuery, filters, ctx]
  );

  const values = useMemo(() => {
    return { isExporting: isLoading, exportFile };
  }, [isLoading, exportFile]);
  return values;
}
