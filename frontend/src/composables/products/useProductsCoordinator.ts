import type { ProductsQueryParams } from '@/types/products'
import { computed, watch } from 'vue'
// **
import { useProducts } from '@/stores/products'
import { useSorting } from './slices/useSorting'
import { useSelectedCategory } from './slices/useSelectedCategory'

export function useCoordinatorFilter() {
  const { loading: sortLoading, selectSort, sort } = useSorting()
  const { category, selectCategory, loading: categoryLoading } = useSelectedCategory()
  const { fetchProducts } = useProducts()

  const loading = computed(() => sortLoading.value || categoryLoading.value)

  // fn
  const getQueryParams = () => {
    const params: ProductsQueryParams = {
      limit: 5,
      page: 1,
    }

    if (category.value !== 'all') params.category = category.value
    if (sort.value) params.sort = sort.value

    return params
  }

  const loadProducts = async () => {
    try {
      await fetchProducts(getQueryParams())
    } catch (e) {
      console.error('Error loading products:', e)
      throw e
    } finally {
      // Сбрасываем loading состояния после запроса
      sortLoading.value = false
      categoryLoading.value = false
    }
  }

  watch([category, sort], loadProducts, { deep: true })

  return {
    //states
    sort,
    category,
    loading,

    //methods
    selectSort,
    selectCategory,
    loadProducts,
    getQueryParams,
  }
}
