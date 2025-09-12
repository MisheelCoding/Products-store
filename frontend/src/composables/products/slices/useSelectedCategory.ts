import type { ProductCategory } from '@/types/products'
import { ref } from 'vue'

const _category = ref<ProductCategory | 'all'>('all')
const _loading = ref(false)
export function useSelectedCategory() {

  function selectCategory(key: ProductCategory) {
    _category.value = key
    _loading.value = true

  }
  return {
    category: _category,
    loading: _loading,
    selectCategory,
    loading,
  }
}
