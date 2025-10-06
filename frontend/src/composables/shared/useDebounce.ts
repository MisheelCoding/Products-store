// import { ref, watch, onUnmounted, type WatchSource } from 'vue'

// interface DebounceOptions {
//   delay?: number
//   maxWait?: number
//   leading?: boolean
//   trailing?: boolean
// }

// export function useDebounce<T>(value: WatchSource<T>, options: DebounceOptions = {}) {
//   const { delay = 300, maxWait, leading = false, trailing = true } = options

//   const debouncedValue = ref<T>(value as unknown as T)
//   let timeoutId: ReturnType<typeof setTimeout> | null = null
//   let maxTimeoutId: ReturnType<typeof setTimeout> | null = null
//   let isLeadingCalled = false

//   const cancel = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId)
//       timeoutId = null
//     }
//     if (maxTimeoutId) {
//       clearTimeout(maxTimeoutId)
//       maxTimeoutId = null
//     }
//     isLeadingCalled = false
//   }

//   const flush = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId)
//       timeoutId = null
//     }
//     debouncedValue.value = value as unknown as T
//   }

//   const debounce = (newValue: T) => {
//     // Leading edge (вызов в начале)
//     if (leading && !isLeadingCalled) {
//       debouncedValue.value = newValue
//       isLeadingCalled = true
//     }

//     // Максимальное время ожидания
//     if (maxWait && !maxTimeoutId) {
//       maxTimeoutId = setTimeout(() => {
//         if (trailing) {
//           debouncedValue.value = newValue
//         }
//         cancel()
//       }, maxWait)
//     }

//     // Очищаем предыдущий таймаут
//     if (timeoutId) {
//       clearTimeout(timeoutId)
//     }

//     // Trailing edge (вызов в конце)
//     if (trailing) {
//       timeoutId = setTimeout(() => {
//         debouncedValue.value = newValue
//         cancel()
//       }, delay)
//     }
//   }

//   watch(
//     value,
//     (newValue) => {
//       debounce(newValue)
//     },
//     { immediate: true },
//   )

//   onUnmounted(() => {
//     cancel()
//   })

//   return {
//     value: debouncedValue,
//     cancel,
//     flush,
//   }
// }
