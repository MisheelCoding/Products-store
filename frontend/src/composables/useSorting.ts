import { SortOption } from './../types/products.filters'
import { publicApi } from '@/scripts/api'
import { useProducts } from '@/stores/products'
import { API_URLS, type ApiBaseUrl } from '@/types/baseUrl'
import type { Product } from '@/types/products'
import { type SortOption } from '@/types/products.filters'
import { ref } from 'vue'
const { fetchMoreProducts } = useProducts()

export function useSorting() {
  const sort = ref<SortOption | null>(null)
  const fetchedProducts = ref<Product[] | []>([])
  const loading = ref(false)

  async function selectSort(el: SortOption) {
    sort.value = el
    fetchMoreProducts({ sort })
    try {
      loading.value = true
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
