import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type FilterValues = {
  label?: string;
  value: string | number;
}[];
export type Filter = {
  type: "terms" | "range" | "bool";
  values: FilterValues;
  operator?: "and" | "or";
  reset?: [number | string, number | string];
};
export type Filters = {
  [key: string]: Filter;
};

export function parseSearchFiltersFromURL(
  urlFilters: string | null | undefined
): Filters {
  if (!urlFilters) return {};
  return JSON.parse(decodeURIComponent(urlFilters));
}

export function stringifySearchFiltersForURL(filters: Filters): string {
  if (!filters) return "";
  if (!Object.keys(filters).length) return "";
  return encodeURIComponent(JSON.stringify(filters));
}

function fromFilterToElasticQuery(
  field: string,
  value: (string | number | boolean)[],
  type
): Record<string, unknown> {
  if (type === "bool") {
    return {
      terms: {
        [field]: value,
      },
    };
  }
  if (type === "range") {
    return {
      [type]: {
        [field]: {
          gte: value[0],
          lte: value[1],
        },
      },
    };
  }
  return {
    [type]: {
      [`${field}.keyword`]: value,
    },
  };
}

export function filtersToElasticQuery(
  filters: Filters
): Record<string, unknown>[] {
  if (!Object.keys(filters).length) return [];
  return Object.entries(filters).flatMap(([field, filter]) => {
    if (!filter?.values?.length || !filter?.type) return [];
    if (filter.operator === "and") {
      return filter?.values?.map(({ value }) =>
        fromFilterToElasticQuery(field, [value], filter.type)
      );
    }
    return [
      fromFilterToElasticQuery(
        field,
        filter.values.map(({ value }) => value),
        filter.type
      ),
    ];
  });
}

export default function useUrl() {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentTab = searchParams.get("tab") || "1";
  const currentFilters = parseSearchFiltersFromURL(searchParams.get("filters"));
  const filters = filtersToElasticQuery(currentFilters);

  const clearFilters = useCallback(() => {
    searchParams.delete("filters");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleDeleteFilter = useCallback(
    ({ field }: { field: string }) => {
      const { [field]: currentField, ...nextFilters } = currentFilters;
      if (!currentField) return;
      if (!Object.keys(nextFilters).length) return clearFilters();
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      return setSearchParams(searchParams);
    },
    [clearFilters, currentFilters, searchParams, setSearchParams]
  );

  const handleRangeFilterChange = useCallback(
    ({ field, value }: { field: string; value?: [number, number] }) => {
      const prev = { ...currentFilters };
      if (!value) return handleDeleteFilter({ field });
      const nextFilters: Filters = {
        ...prev,
        [field]: {
          values: [{ value: value?.[0] }, { value: value?.[1] }],
          type: "range" as const,
        },
      };
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      return setSearchParams(searchParams);
    },
    [currentFilters, handleDeleteFilter, searchParams, setSearchParams]
  );

  const handleBoolFilterChange = useCallback(
    ({
      field,
      value,
      label,
      forceValue = false,
    }: {
      field: string;
      value: boolean;
      label?: string;
      forceValue?: boolean;
    }) => {
      const prev = { ...currentFilters };
      if (!value && !forceValue) return handleDeleteFilter({ field });
      const nextFilters = {
        ...prev,
        [field]: {
          values: [{ value: value.toString(), label }],
          type: "bool" as const,
        },
      };
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      return setSearchParams(searchParams);
    },
    [currentFilters, handleDeleteFilter, searchParams, setSearchParams]
  );

  const handleFilterChange = useCallback(
    ({ field, value, filterType = "terms", label = null }) => {
      if (!field || !value) return;
      const prev = { ...currentFilters };
      const filter = prev?.[field];
      if (!filter) {
        const nextFilters = {
          ...prev,
          [field]: {
            values: [{ value, label }],
            type: filterType,
            operator: "or",
          },
        };
        searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
        setSearchParams(searchParams);
        return;
      }
      const nextFilterValues = filter?.values
        ?.map((value) => value?.value)
        ?.includes(value)
        ? filter?.values?.filter((el) => el.value !== value)
        : [...filter.values, { value, label }];
      if (!nextFilterValues.length && filter?.operator !== "and") {
        return handleDeleteFilter({ field });
      }
      const nextFilters = {
        ...prev,
        [field]: { ...filter, values: nextFilterValues },
      };

      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      setSearchParams(searchParams);
    },
    [currentFilters, handleDeleteFilter, searchParams, setSearchParams]
  );

  const setOperator = useCallback(
    (field, operator = "and") => {
      const prev = { ...currentFilters };
      const filter = prev?.[field] || {};
      const nextFilters = { ...prev, [field]: { ...filter, operator } };
      searchParams.set("filters", stringifySearchFiltersForURL(nextFilters));
      setSearchParams(searchParams);
    },
    [currentFilters, searchParams, setSearchParams]
  );

  const handleQueryChange = useCallback(
    (query) => {
      searchParams.delete("filters")
      searchParams.set("q", query)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  );
  const handleTabChange = useCallback(
    (tab) => {
      searchParams.delete("filters")
      searchParams.set("tab", tab)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  );

  const values = useMemo(() => {
    return {
      handleTabChange,
      handleQueryChange,
      handleFilterChange,
      clearFilters,
      currentQuery,
      currentTab,
      currentFilters,
      filters,
      setOperator,
      handleDeleteFilter,
      handleRangeFilterChange,
      handleBoolFilterChange,
    };
  }, [
    handleTabChange,
    handleFilterChange,
    handleQueryChange,
    clearFilters,
    currentFilters,
    currentTab,
    filters,
    currentQuery,
    setOperator,
    handleDeleteFilter,
    handleRangeFilterChange,
    handleBoolFilterChange,
  ]);

  return values;
}
