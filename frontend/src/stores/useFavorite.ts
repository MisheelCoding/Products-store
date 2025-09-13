import type { Product } from '@/types/products'
import { defineStore } from 'pinia'
import api from '@/scripts/api'
const url = '/api/user/favorites'

export const useFavorite = defineStore('favorite', {
  state: () => ({
    favorites: [] as Product[],
    loading: false,
  }),
  getters: {
    favoriteCount: (s) => s.favorites.length,
    isFavorite: (s) => (productId: string) => s.favorites.some((p) => p._id === productId),
  },
  actions: {
    async fetchFavorites() {
      this.loading = true
      try {
        const { data } = await api.get<Product[]>(url)
        this.favorites = data
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async addToFavorite(product: Product) {
      if (!this.favorites.some((p) => p._id === product._id)) {
        this.favorites.push(product)
      }
      try {
        await api.post(url, { productId: product._id })
      } catch (e) {
        console.error(e)
        this.favorites = this.favorites.filter((p) => p._id !== product._id)
      }
    },
    async removeFromFavorite(productId: string) {
      const backup = [...this.favorites]
      this.favorites = this.favorites.filter((p) => p._id !== productId)
      try {
        await api.delete(url, { data: { productId } })
      } catch (e) {
        console.error(e)
        this.favorites = backup
      }
    },
  },
})
