// Типы
export type LinkItem = { label: string; to: string; short?: string }
export type Column = { title: string; links: LinkItem[] }
export type FooterConfig = {
  columns: Column[]
  contacts: {
    phoneRaw: string // для tel: +7...
    phoneView: string // для человекочитаемого вида
    email: string
    hours: string // Ежедневно: 10:00–22:00
  }
  socials: { name: string; short: string; href: string }[]
  payments: string[]
  legal: LinkItem[]
}

// Значения по умолчанию
export const defaultFooterConfig: FooterConfig = {
  columns: [
    {
      title: 'Каталог',
      links: [
        { to: '/products/fruits', label: 'Фрукты' },
        { to: '/products/vegetables', label: 'Овощи' },
        { to: '/products/dairy', label: 'Молочные' },
        { to: '/products/sausages', label: 'Колбасы' },
        { to: '/products/cheese', label: 'Сыр' },
        { to: '/products/sweets', label: 'Сладости' },
      ],
    },
    {
      title: 'Доставка и оплата',
      links: [
        { to: '/delivery', label: 'Условия доставки' },
        { to: '/payment', label: 'Способы оплаты' },
        { to: '/returns', label: 'Возврат и обмен' },
        { to: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'О нас',
      links: [
        { to: '/about', label: 'Наша история' },
        { to: '/farmers', label: 'Наши фермеры' },
        { to: '/quality', label: 'Качество и безопасность' },
        { to: '/blog', label: 'Блог' },
      ],
    },
  ],
  contacts: {
    phoneRaw: '+70000000000',
    phoneView: '+7 (000) 000-00-00',
    email: 'misheelcoding@gmail.com',
    hours: 'Ежедневно: 10:00–22:00',
  },
  socials: [
    { name: 'Telegram', short: 'TG', href: '#' },
    { name: 'Instagram', short: 'IG', href: '#' },
    { name: 'YouTube', short: 'YT', href: '#' },
  ],
  payments: ['Mir', 'Visa', 'Mastercard'],
  legal: [
    { label: 'Политика конфиденциальности', short: 'Политика', to: '/privacy' },
    { label: 'Пользовательское соглашение', short: 'Соглашение', to: '/terms' },
  ],
}
