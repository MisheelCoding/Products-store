import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

function applyDom(isDark: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', isDark)

  let meta = document.querySelector(
    'meta[name="theme-color"]:not([media])',
  ) as HTMLMetaElement | null
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', isDark ? '#0b0b0b' : '#ffffff')
}

export function useTheme() {
  // по умолчанию "light"
  const theme = ref<Theme>('light')

  onMounted(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = saved ?? 'light' // если нет сохранённой — ставим "light"
    theme.value = initial
    applyDom(initial === 'dark') // класс dark вешаем только если реально dark
  })

  function setTheme(next: Theme) {
    theme.value = next
    localStorage.setItem('theme', next)
    applyDom(next === 'dark')
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme, setTheme }
}
