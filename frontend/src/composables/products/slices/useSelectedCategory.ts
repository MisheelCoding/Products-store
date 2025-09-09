import type { ProductCategory } from '@/types/products'
import { ref } from 'vue'

export function useSelectedCategory() {
  const category = ref<ProductCategory | 'all'>('all')
  const loading = ref(false)
  function selectCategory(key: ProductCategory) {
    category.value = key
    loading.value = true
  }
  return {
    category,
    selectCategory,
    loading,
  }
}
