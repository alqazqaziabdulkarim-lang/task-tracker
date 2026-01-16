<template>
  <div class="login-container" dir="rtl">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-circle">🌟</div>
        <h1>مرحباً بك مجدداً</h1>
        <p>يرجى تسجيل الدخول للوصول إلى منصة الأنشطة</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">اسم المستخدم</label>
          <div class="input-wrapper">
            <span class="icon">👤</span>
            <input 
              v-model="username" 
              type="text" 
              id="username" 
              placeholder="أدخل اسم المستخدم"
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label for="password">كلمة المرور</label>
          <div class="input-wrapper">
            <span class="icon">🔒</span>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              placeholder="أدخل كلمة المرور"
              required
            >
          </div>
        </div>

        <div class="form-group">
          <label>الدخول كـ</label>
          <div class="role-selector">
            <button 
              type="button" 
              :class="{ active: role === 'student' }" 
              @click="role = 'student'"
            >
              <span class="role-icon">👨‍🎓</span>
              طالب
            </button>
            <button 
              type="button" 
              :class="{ active: role === 'club' }" 
              @click="role = 'club'"
            >
              <span class="role-icon">🎪</span>
              نادي
            </button>
            <button 
              type="button" 
              :class="{ active: role === 'supervisor' }" 
              @click="role = 'supervisor'"
            >
              <span class="role-icon">👔</span>
              مشرف
            </button>
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="authStore.loading">
          <span v-if="authStore.loading" class="loader"></span>
          <span v-else>تسجيل الدخول</span>
        </button>

        <p v-if="authStore.error" class="error-msg">{{ authStore.error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      role: 'student'
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.login({
          username: this.username,
          password: this.password,
          role: this.role
        })
        
        // التوجيه بناءً على الدور
        if (this.role === 'student') {
          this.$router.push('/student')
        } else if (this.role === 'club') {
          this.$router.push('/club')
        } else if (this.role === 'supervisor') {
          this.$router.push('/supervisor')
        }
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-circle {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.login-header h1 {
  color: #1e3a8a;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.login-header p {
  color: #64748b;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items:center;
}

.input-wrapper .icon {
  position: absolute;
  right: 1rem;
  color: #94a3b8;
}

.input-wrapper input {
  width: 100%;
  padding: 0.8rem 2.8rem 0.8rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.role-selector {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

.role-selector button {
  padding: 0.75rem 0.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  transition: all 0.3s ease;
}

.role-selector button.active {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #1e3a8a;
}

.role-icon {
  font-size: 1.25rem;
}

.submit-btn {
  margin-top: 1rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(30, 58, 138, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-msg {
  color: #ef4444;
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
