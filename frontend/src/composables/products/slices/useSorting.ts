// import { useProducts } from '@/stores/products'

import { type SortOption } from '@/types/products.filters'
import { ref } from 'vue'

export function useSorting() {
  // const { fetchProducts } = useProducts()

  const sort = ref<SortOption | null>(null)
  const loading = ref(false)

  async function selectSort(el: SortOption) {
    sort.value = el
    loading.value = true
  }
  return {
    sort,
    selectSort,
    loading,
  }
}
