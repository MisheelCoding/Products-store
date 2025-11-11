import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function globalGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const auth = useAuthStore()

  // ***  проверка логина где надо
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
  }

  // ***  проверка только для гостей
  if (to.meta.guest && auth.isAuthenticated) {
    return next({ name: 'profile' })
  }

  // ***  проверка ролей
  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    // const hasRole = auth.checkRole(to.meta.roles)
    const hasRole = to.meta.roles.some((role) => auth.checkRole(role))
    if (!hasRole) {
      console.log(`У вас нет прав: ${to.meta.roles.join(', ')}`)
      return next({ name: 'Error403' })
    }
  }

  next()
}
