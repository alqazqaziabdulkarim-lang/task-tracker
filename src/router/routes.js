import LoginView from '@/views/LoginView.vue'
import StudentView from '@/views/StudentView.vue'
import ClubDashboard from '@/views/ClubDashboard.vue'
import SupervisorView from '@/views/SupervisorView.vue'
import { useAuthStore } from '@/stores/authStore'

/**
 * Application Routes
 * Define all the routes (pages) in the application
 */
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/student',
    name: 'student',
    component: StudentView,
    meta: { requiresAuth: true, role: 'student' }
  },
  {
    path: '/club',
    name: 'club',
    component: ClubDashboard,
    meta: { requiresAuth: true, role: 'club' }
  },
  {
    path: '/supervisor',
    name: 'supervisor',
    component: SupervisorView,
    meta: { requiresAuth: true, role: 'supervisor' }
  },
  // 404 Not Found - catch all undefined routes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

export default routes;

