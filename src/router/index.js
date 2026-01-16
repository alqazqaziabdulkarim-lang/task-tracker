import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/authStore'

/**
 * Vue Router Configuration
 * Handles navigation between different views in the application
 */
const router = createRouter({
  // Use HTML5 history mode for clean URLs (no # in URL)
  history: createWebHistory(),

  // Import routes from separate file for better organization
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  }
  // Check if role matches
  else if (to.meta.role && authStore.userRole !== to.meta.role) {
    // Redirect to correct dashboard based on role
    if (authStore.userRole === 'student') next('/student')
    else if (authStore.userRole === 'club') next('/club')
    else if (authStore.userRole === 'supervisor') next('/supervisor')
    else next('/login')
  }
  else {
    next()
  }
})

// Export router instance to be used in main.js
export default router

