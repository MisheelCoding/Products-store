import { useAuthStore } from '@/stores/auth'

import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export async function restoreGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth = useAuthStore()
  if (!auth.user && !auth.isAuthenticated) {
    try {
      await auth.tryRestore()
    } catch {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
  next()
}
