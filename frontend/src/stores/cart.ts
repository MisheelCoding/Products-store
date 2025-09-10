import { type Product } from './../types/products'
import { defineStore } from 'pinia'
import { useProducts } from './products'

export type CartLine = {
  productId: string
  qty: number
  priceSnapshot: number // цена момент добавлениее
}

type CartState = {
  lines: Record<string, CartLine>
}
type CartItemView = {
  line: CartLine
  product?: Product
  subtotal: number
}

export const useCart = defineStore('cart', {
  state: (): CartState => ({
    lines: {},
  }),
  getters: {
    items: (s) => Object.values(s.lines),
    itemsWithProducts: (s): CartItemView[] => {
      const productsStore = useProducts()
      return Object.values(s.lines).map((line) => {
        const product = productsStore.byId?.[line.productId]
        const subtotal = +(line.qty * line.priceSnapshot).toFixed(2)
        return { line, product, subtotal }
      })
    },
  },
})
