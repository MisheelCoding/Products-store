import { type User } from '@/types/auth'
import {
  banStatusClass,
  banStatusText,
  verifiedClass,
} from '@/components/panel/admin/users/lib/userStatus'
import { type TableColumn } from '@/components/panel/admin/users/lib/tableTypes'
import { formatDateTime } from '@/utils/date'

export const tableData: TableColumn<User>[] = [
  { key: 'username', label: 'Имя' },
  { key: 'email', label: 'Email', hiddenMobile: true },
  { key: 'phone', label: 'Телефон', hiddenMobile: true },
  {
    key: 'roles',
    label: 'Роли',
    render: (u) => u.roles.join(', '),
  },
  {
    key: 'verified',
    label: 'Верификация',
    hiddenMobile: true,
    render: (u) => (u.verified ? 'Подтвержден' : 'Неподтвержден'),
    className: (u) => verifiedClass(u),
  },
  {
    key: 'isBanned',
    label: 'Статус',
    hiddenMobile: true,
    render: (u) => banStatusText(u),
    className: (u) => banStatusClass(u),
  },
  {
    key: 'createdAt',
    label: 'Создан',
    hiddenMobile: true,
    render: (u) => formatDateTime(u.createdAt, false),
  },
]
