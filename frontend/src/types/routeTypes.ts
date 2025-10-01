import type { UserRoles } from '@/types/auth'
import type { RouteRecordRaw } from 'vue-router'

type AppRouteMeta = Partial<{
  requiresAuth: boolean
  guest: boolean
  title: string
  roles: UserRoles[]
}>

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta?: AppRouteMeta
}
