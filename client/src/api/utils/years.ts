import { Aggregation } from "../../types/commons";

export const fillWithMissingYears = (acc, cur) => {
  if (acc.length === 0) return [cur];
  const last = acc[acc.length - 1];
  const missingYearsCount = cur.value - last.value - 1;
  if (!missingYearsCount) {
    return [...acc, cur];
  }
  const filler = Array.from({ length: missingYearsCount }, (_, i) => ({
    value: last.value + i + 1,
    label: last.value + i + 1,
    count: 0,
    normalizedCount: 0,
  }));
  return [
    ...acc,
    ...filler,
    cur
  ];
}

interface YearData {
	value: number;
	label: string;
	count: number;
	normalizedCount?: number;
}

export const createCompleteYearSeries = (yearData: Aggregation[]): Aggregation[] => {
  if (yearData.length === 0) return [];

  const yearDataConverted = yearData.map(item => ({ ...item, value: parseInt(item.value, 10) }));

	const sorted = [...yearDataConverted].sort((a, b) => a.value - b.value);
	const result: YearData[] = [];

	for (let i = 0; i < sorted.length; i++) {
		if (i === 0) {
			result.push(sorted[i]);
			continue;
		}

		const previous = sorted[i - 1];
		const current = sorted[i];

		// Fill gaps between previous and current
		for (let year = previous.value + 1; year < current.value; year++) {
			result.push({
				value: year,
				label: year.toString(),
				count: 0,
				normalizedCount: 0,
			});
		}

		result.push(current);
	}

  const returnedArray = result.map(item => ({ ...item, value: item.value.toString() })) as Aggregation[];
  return returnedArray;
};


export const processYearAggregations = (buckets): Aggregation[] => {
	if (!buckets?.length) return [];

	// Calculate normalization factor
	const NORMALIZATION_FACTOR = 100;
	const maxCount = Math.max(...buckets.map(bucket => bucket.doc_count));

	// Transform buckets to our format
	const yearData: Aggregation[] = buckets.map(bucket => ({
		value: bucket.key,
		label: bucket.key,
		count: bucket.doc_count as number,
		normalizedCount: (bucket.doc_count * NORMALIZATION_FACTOR) / maxCount,
	}));

	// Fill missing years
	return createCompleteYearSeries(yearData);
};
