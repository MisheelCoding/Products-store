import { useProducts } from '@/stores/products'
// import { API_URLS, type ApiBaseUrl } from '@/types/baseUrl'
import { type SortOption } from '@/types/products.filters'
import { ref } from 'vue'

export function useSorting() {
  const { fetchProducts } = useProducts()

  const sort = ref<SortOption | null>(null)
  const loading = ref(false)

  async function selectSort(el: SortOption) {
    sort.value = el
    loading.value = true
    try {
      await fetchProducts({
        sort: el,
        limit: 5,
        page: 1,
      })
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      loading.value = false
    }
  }
  return {
    sort,
    selectSort,
    loading,
  }
}
