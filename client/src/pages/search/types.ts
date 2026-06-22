export type ItemProps<T> = {
  data: T
  highlight?: Record<string, string[]>
}

export type FilterProps = {
  filterParam?: string
  filterIds?: string[]
  forceApi?: string
  ignoreQuery?: boolean
}