import { defineStore } from 'pinia'

/**
 * Auth Store - إدارة حالة المصادقة والأدوار
 */
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'),
        loading: false,
        error: null
    }),

    getters: {
        userRole: (state) => state.user?.role || null,
        isStudent: (state) => state.user?.role === 'student',
        isClub: (state) => state.user?.role === 'club',
        isSupervisor: (state) => state.user?.role === 'supervisor',
        userName: (state) => state.user?.name || ''
    },

    actions: {
        /**
         * محاكاة عملية تسجيل الدخول
         * @param {Object} credentials - بيانات الدخول (username, password, role)
         */
        async login(credentials) {
            this.loading = true
            this.error = null

            try {
                // محاكاة تأخير الشبكة
                await new Promise(resolve => setTimeout(resolve, 800))

                // في هذا الإصدار، سنعتبر أي دخول صحيح للمحاكاة
                const mockUser = {
                    id: Math.random().toString(36).substr(2, 9),
                    username: credentials.username,
                    name: credentials.username || 'مستخدم',
                    role: credentials.role // 'student', 'club', 'supervisor'
                }

                this.user = mockUser
                this.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(mockUser))

                return mockUser
            } catch (error) {
                this.error = 'فشل تسجيل الدخول. يرجى التحقق من البيانات.'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * تسجيل الخروج
         */
        logout() {
            this.user = null
            this.isAuthenticated = false
            localStorage.removeItem('user')
        }
    }
})
