<template>
  <div id="app" dir="rtl">
    <!-- Navigation Header -->
    <header class="app-header">
      <div class="container">
        <h1 class="app-title" @click="$router.push('/')" style="cursor: pointer">🌟 الأنشطة الطلابية</h1>
        
        <nav v-if="authStore.isAuthenticated" class="app-nav">
          <router-link v-if="authStore.isStudent" to="/student" class="nav-link">تصفح الأنشطة</router-link>
          <router-link v-if="authStore.isClub" to="/club" class="nav-link">لوحة التحكم</router-link>
          <router-link v-if="authStore.isSupervisor" to="/supervisor" class="nav-link">الإشراف</router-link>
          
          <div class="user-menu">
            <span class="user-btn">👤 {{ authStore.userName }}</span>
            <button @click="handleLogout" class="logout-btn">خروج</button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>منصة إدارة الأنشطة الطلابية &copy; 2026</p>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'App',
  computed: {
    authStore() {
      return useAuthStore()
    }
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>


<style>
/* Import Cairo font for Arabic */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Cairo', sans-serif;
  background: #f0f4f8;
  color: #1a202c;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.app-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.app-header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.app-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 600;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: #fbbf24;
  color: #1e3a8a;
  box-shadow: 0 4px 10px rgba(251, 191, 36, 0.3);
}

/* Main Content */
.app-main {
  flex: 1;
  padding: 3rem 0;
}

/* Footer */
.app-footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}

.app-footer p {
  margin: 0;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* User Menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.5rem 0.3rem 1rem;
  border-radius: 12px;
}

.user-btn {
  font-weight: 600;
  font-size: 0.9rem;
}

.logout-btn {
  background: #fbbf24;
  color: #1e3a8a;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #f59e0b;
  transform: scale(1.05);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

