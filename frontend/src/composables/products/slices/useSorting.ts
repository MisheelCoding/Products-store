// import { useProducts } from '@/stores/products'

import { type SortOption } from '@/types/products.filters'
import { ref } from 'vue'

const _sort = ref<SortOption | null>(null)
const _loading = ref(false)
export function useSorting() {
  // const { fetchProducts } = useProducts()

  async function selectSort(el: SortOption) {
    _sort.value = el
    _loading.value = true

  }
  return {
    sort: _sort,
    loading: _loading,
    selectSort,
  }
}
