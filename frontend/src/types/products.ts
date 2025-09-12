import type { SortOption } from './products.filters'
import type { ValueOf } from './valueOf'

export type ProductCategory =
  | 'fruits'
  | 'vegetables'
  | 'sweets'
  | 'dairy'
  | 'sausages'
  | 'cheese'
  | 'all'

export const CATEGORY_TITLES = {
  cheese: 'Сыр',
  dairy: 'Молочные',
  fruits: 'Фрукты',
  sausages: 'Колбасы',
  sweets: 'Сладости',
  vegetables: 'Овощи',
  all: 'Все товары',
} as const satisfies Record<ProductCategory, string>

// значение категорий
export type CategoryTitle = ValueOf<typeof CATEGORY_TITLES>

// цена  магазина одного
export interface PriceInfo {
  current: number
  old?: number
  discountPercent?: number
}
// ключ магазина
export type StoreKey = string

type unitType = 'kg' | 'g' | 'pcs' | 'l' | 'ml' | 'pack'

//?? Продукт
export interface Product {
  _id: string
  title: string
  description?: string
  category: ProductCategory
  unit: unitType
  store: string
  quantityStep: number
  imageUrl: string
  isAvailable: boolean
  createdAt: string //**  из API приходит ISO-строка
  updatedAt: string //??** из API приходит ISO-строка
  __v?: number
  effectivePrice: PriceInfo | null
  effectiveStock: number | null // сколько доступно в выбранном магазине/регионе
  effectiveAvailability: boolean | null // доступен ли в выбранном магазине/регионе
}
// ??Продукт но для Админа с расширенной логикой
export interface ProductAdmin extends Product {
  price: Record<StoreKey, PriceInfo>
  stockByStore: Record<StoreKey, number>
  availabilityByStore: Record<StoreKey, boolean>
}

// ?? ответ листинга где сколько товаров, сколько страниц на каком все такое
export interface ProductsListResponse {
  items: Product[]
  total: number
  page: number
  totalPages: number
  storeKey: StoreKey
}
// ?? Products QUERY params

export interface ProductsQueryParams {
  q?: string
  category?: string
  limit: number
  page: number
  region?: string
  store?: string
  sort?: SortOption
}

export const UNIT_INFO = {
  kg: { label: 'кг', full: 'килограмм' },
  g: { label: 'г', full: 'грамм' },
  pcs: { label: 'шт', full: 'штука' },
  l: { label: 'л', full: 'литр' },
  ml: { label: 'мл', full: 'миллилитр' },
  pack: { label: 'упак', full: 'упаковка' },
} as const satisfies Record<string, { label: string; full: string }>
