export type TableColumn<T> = {
  key: keyof T
  label: string
  hiddenMobile?: boolean
  render?: (row: T) => string | number | boolean | null
  className?: (row: T) => string | undefined
}
