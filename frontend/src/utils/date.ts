export const formatDateTime = (isoString: string | undefined, withTime: boolean = true) => {
  if (!isoString) return '-'

  const date = new Date(isoString)

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  })
}
