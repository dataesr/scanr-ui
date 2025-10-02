import { Aggregation, ElasticBuckets } from "../../types/commons";

export const createCompleteYearSeries = (yearData: any[]): Aggregation[] => {
  if (yearData.length === 0) return [];

  const yearDataConverted = yearData
    .map(item => ({ ...item, value: parseInt(item.value, 10) }))
    .filter(item => item.value <= new Date().getFullYear());

	const sorted = [...yearDataConverted].sort((a, b) => a.value - b.value);
	const result: Aggregation[] = [];

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
				label: year,
				count: 0,
				normalizedCount: 0,
			});
		}

		result.push(current);
	}

  return result;
};


export const processYearAggregations = (buckets: ElasticBuckets): Aggregation[] => {
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
