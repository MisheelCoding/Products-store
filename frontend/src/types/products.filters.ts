export const SORT_OPTIONS = {
  price_asc: 'По возрастанию цены', // От дешевых к дорогим
  price_desc: 'По убыванию цены', // От дорогих к дешевым
  title_asc: 'A-Z по названию', // От А к Я (алфавитный порядок - это ВОЗРАСТАНИЕ)
  title_desc: 'Z-A по названию', // От Я к А (обратный алфавитный - это УБЫВАНИЕ)
  created_at_asc: 'Сначала старые', // От старых к новым (возрастание даты)
  created_at_desc: 'Сначала новые', // От новых к старым (убывание даты)
} as const

export type SortOption = (keyof typeof SORT_OPTIONS)[number]
