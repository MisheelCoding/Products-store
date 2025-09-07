import { computed, ref } from 'vue'
import axios from 'axios'
import { CATEGORY_TITLES, type CategoryTitle, type ProductCategory } from '@/types/products'

type CategoryCard = {
  id: ProductCategory
  title: CategoryTitle
  image: string
  link: string
}
//?? переменные
const categories = ref<CategoryCard[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const fetchedAt = ref<number | null>(null) // отметка времени последней загрузки
let inFlight: Promise<void> | null = null

//
const images = import.meta.glob('@/assets/img/optimized/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function mapToCard(list: ProductCategory[]): CategoryCard[] {
  return list.map((c) => {
    const key = Object.keys(images).find((k) => k.endsWith(`${c}.webp`))
    return {
      id: c,
      title: CATEGORY_TITLES[c],
      image: key ? images[key] : '',
      link: `/category/${c}`,
    }
  })
}

export function useCategories(ttls = 5 * 60 * 1000) {
  //5минуты
  const isFresh = computed(() => {
    if (!fetchedAt.value) return false
    return Date.now() - fetchedAt.value < ttls
  })

  async function ensure() {
    if (categories.value.length && isFresh.value) return

    if (inFlight) return inFlight

    loading.value = true
    error.value = null

    inFlight = axios
      .get<{ categories: ProductCategory[] }>(
        'http://localhost:5007/api/public/products/categories',
      )
      .then(({ data }) => {
        categories.value = mapToCard(data.categories)
        fetchedAt.value = Date.now()
      })
      .catch((err) => {
        error.value = axios.isAxiosError(err)
          ? (err.response?.data?.message ?? err.message)
          : err instanceof Error
            ? err.message
            : String(err)
      })
      .finally(() => {
        loading.value = false
        inFlight = null
      })
    return inFlight
    // принудительное обновление
  }

  async function refresh() {
    fetchedAt.value = null
    return ensure()
  }
  return { refresh, ensure, categories, isFresh, error, loading }
}
