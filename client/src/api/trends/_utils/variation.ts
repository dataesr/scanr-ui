export default function variation(count, sum, minYear, maxYear) {
  const currentVolume = count?.[maxYear] || 0
  const averageVolume = (sum - currentVolume) / (maxYear - minYear - 1)

  const variation = currentVolume >= averageVolume ? currentVolume / averageVolume : -averageVolume / currentVolume

  return variation
}
