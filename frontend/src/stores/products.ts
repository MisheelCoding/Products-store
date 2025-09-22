import { API_ENDPOINTS } from './../types/baseUrl'
import { publicApi } from '@/scripts/api'
import { API_URLS } from '@/types/baseUrl'
import type { Product, ProductsListResponse, ProductsQueryParams, StoreKey } from '@/types/products'
import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    byId: {} as Record<string, Product>,
    loading: false as boolean,
    page: 1,
    limit: 5,
    storeKey: 'default' as StoreKey, // магазин id
    total: 0, // сколько items пришло
    totalPages: 0, // общее колл стр
    hasMore: true, // есть еще товаров
    isFetchingMore: false, // загрузить еще
    lastParams: {} as ProductsQueryParams,
  }),
  actions: {
    //***  загрузка первых продуктов
    async fetchProducts(params: ProductsQueryParams = { page: 1, limit: 5 }) {
      if (this.loading) return //выходим если делаем запрос

      this.loading = true
      this.lastParams = params
      const finalParams = {
        ...params,
        page: params.page ?? this.page,
        limit: params.limit ?? this.limit,
      }

      try {
        const { data } = await publicApi.get<ProductsListResponse>(
          `${API_URLS.public}${API_ENDPOINTS.products}`,
          {
            params: finalParams,
          },
        )

        this.products = data.items
        this.byId = data.items.reduce(
          (acc, product) => {
            acc[product._id] = product
            return acc
          },
          {} as Record<string, Product>,
        )

        this.total = data.total
        this.totalPages = data.totalPages
        this.storeKey = data.storeKey
        this.page = data.page
        this.hasMore = data.page < data.totalPages
        if (params.limit !== undefined) this.limit = params.limit
        // console.log(this.byId)
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
      if (this.isFetchingMore || !this.hasMore || this.loading) return // выходим сразу если

      this.isFetchingMore = true
      const nextPage = this.page + 1
      const params = { ...this.lastParams, page: nextPage, limit: this.limit }

      try {
        const { data } = await publicApi.get<ProductsListResponse>(
          `${API_URLS.public}${API_ENDPOINTS.products}`,
          {
            params,
          },
        )
        data.items.forEach((product) => {
          this.byId[product._id] = product
        })
        this.products = [...this.products, ...data.items]
        this.page = data.page
        this.hasMore = data.page < data.totalPages
      } catch (e) {
        console.log(e)
        throw e
      } finally {
        this.isFetchingMore = false
      }
    },
  },
})
