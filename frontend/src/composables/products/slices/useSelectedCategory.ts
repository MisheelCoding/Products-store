import type { ProductCategory } from '@/types/products'
import { ref } from 'vue'

export function useSelectedCategory() {
  const category = ref<ProductCategory | 'all'>('all')

  function selectCategory(key: ProductCategory) {
    category.value = key
  }
  return {
    category,
    selectCategory,
  }
}
