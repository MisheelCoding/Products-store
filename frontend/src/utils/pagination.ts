// src/utils/pagination.ts
export function getPagination(
  current: number, // текущая страница (1-based)
  total: number, // общее количество страниц
  visible: number, // сколько числовых страниц показываем в целом (включая первую и последнюю)
): (number | string)[] {
  if (visible < 3) {
    // минимум: первая, последняя и хотя бы одна внутренняя страница
    throw new Error('visible must be at least 3')
  }

  const pages: (number | string)[] = []

  // Если всего страниц меньше либо равно видимых  просто выводим все номера.
  if (total <= visible) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  // Резервируем 2 слота под первую и последнюю страницу
  const middleCount = visible - 2 // сколько чисел может быть между 1 и total
  const half = Math.floor(middleCount / 2)

  // Ориентируем "окно" из middleCount страниц так, чтобы current был в центре (по возможности)
  let left = current - half // левый край окна (потенциально < 2)
  let right = left + middleCount - 1 // правый край окна

  // Если сдвинулись слишком влево  выровнять к началу (включая 2..)
  if (left < 2) {
    left = 2
    right = left + middleCount - 1
  }

  // Если сдвинулись слишком вправо  выровнять к концу (до total-1)
  if (right > total - 1) {
    right = total - 1
    left = right - middleCount + 1
  }

  // Собираем финальный массив:
  pages.push(1) // первая страница всегда показываем
  if (left > 2) pages.push('...') // если между 1 и left есть разрыв  показываем "..."

  for (let i = left; i <= right; i++) pages.push(i) // блок "окна" вокруг current

  if (right < total - 1) pages.push('...') // если есть разрыв перед последней  "..."

  pages.push(total) // последняя страница всегда показываем

  return pages
}
