export type SortByType = 'none' | 'name' | 'height' | 'weight'

export interface SortOptions {
  id: number
  label: string
  type: SortByType
}