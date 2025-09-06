import { publicApi } from '@/scripts/api'
import type { Product, ProductsListResponse, ProductsQueryParams, StoreKey } from '@/types/products'
import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false as boolean,
    page: 1,
    limit: 5,
    storeKey: 'default' as StoreKey, // магазин id
    total: 0, // сколько items пришло
    totalPages: 0, // общее колл стр
    hasMore: true, // есть еще товаров
    isFetchingMore: false, // загрузить еще
  }),
  actions: {
    //***  загрузка первых продуктов
    async fetchProducts(params: ProductsQueryParams) {
      this.loading = true
      const finalParams = {
        ...params,
        page: params.page ?? this.page,
        limit: params.limit ?? this.limit,
      }
      try {
        const { data } = await publicApi.get<ProductsListResponse>(`api/products`, {
          params: finalParams,
        })

        this.products = data.items
        this.total = data.total
        this.totalPages = data.totalPages
        this.storeKey = data.storeKey
        this.page = data.page
        this.hasMore = data.page < data.totalPages
        if (params.limit !== undefined) this.limit = params.limit
      } catch (e) {
        console.log(e)
        this.loading = false
        throw e
      } finally {
        this.loading = false
      }
    },
    //***  загрузка следущой партий
    async fetchMoreProducts() {
      if (this.isFetchingMore && !this.hasMore && this.loading) return // выходим сразу если

      this.isFetchingMore = true
      const nextPage = this.page + 1

      try {
        const { data } = await publicApi.get<ProductsListResponse>('api/products', {
          params: {
            page: nextPage,
            limit: this.limit,
          },
        })

        this.products = [...this.products, ...data.items]
        this.page = data.page
        this.hasMore = data.page < data.totalPages
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  },
})
