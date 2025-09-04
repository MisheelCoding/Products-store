import { publicApi } from '@/scripts/api'
import { API_URLS, type ApiBaseUrl } from '@/types/baseUrl'
import type { Product } from '@/types/products'
import { type SortOption } from '@/types/products.filters'
import { ref } from 'vue'

export function useSorting(baseUrl: ApiBaseUrl = 'public') {
  const sort = ref<SortOption | null>(null)
  const fetchedProducts = ref<Product[] | []>([])
  const loading = ref(false)

  async function selectSort(el: SortOption) {
    sort.value = el

    try {
      loading.value = true
      const { data } = await publicApi.get<Product[]>(`${API_URLS[baseUrl]}/products?sort=${el}`)
      fetchedProducts.value = data
      console.log(data)
      return data
      console.log(sort)
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
    fetchedProducts,
    loading,
  }
}
