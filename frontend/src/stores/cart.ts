import { type Product } from './../types/products'
import { defineStore } from 'pinia'
import { useProducts } from './products'

export type CartLine = {
  productId: string
  qty: number
  priceSnapshot: number // цена в момент добавления
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
    total: (s): number =>
      parseFloat(
        Object.values(s.lines)
          .reduce((acc, l) => acc + l.qty * l.priceSnapshot, 0)
          .toFixed(2),
      ),
  },

  actions: {
    add(productId: string) {
      const productsStore = useProducts()
      const product = productsStore.byId?.[productId]
      if (!product) return

      if (this.lines[productId]) {
        this.inc(productId)
      } else {
        this.lines[productId] = {
          productId,
          priceSnapshot: product.effectivePrice?.current ?? 0,
          qty: 1,
        }
      }
    },

    inc(productId: string) {
      const line = this.lines[productId]
      if (!line) return
      line.qty++
    },

    dec(productId: string) {
      const line = this.lines[productId]
      if (!line) return
      if (line.qty > 1) line.qty--
      else this.remove(productId)
    },

    remove(productId: string) {
      delete this.lines[productId]
    },

    setQty(productId: string, qty: number) {
      if (qty <= 0) {
        this.remove(productId)
        return
      }
      const line = this.lines[productId]
      if (line) {
        // товар уже есть — просто меняем количество
        line.qty = qty
      } else {
        // товара нет — создаём новую запись с нужным qty
        const productsStore = useProducts()
        const product = productsStore.byId?.[productId]
        if (!product) return

        this.lines[productId] = {
          productId,
          qty,
          priceSnapshot: product.effectivePrice?.current ?? 0,
        }
      }
    },
  },
})
