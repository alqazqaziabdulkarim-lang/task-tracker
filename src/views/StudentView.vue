<template>
  <div class="student-view" dir="rtl">
    <header class="view-header">
      <div class="welcome-text">
        <h1>أهلاً بك، {{ authStore.userName }} 👋</h1>
        <p>اكتشف الأنشطة الطلابية المتاحة وسجل فيها الآن.</p>
      </div>
    </header>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-card">
        <span class="stat-icon">🧭</span>
        <div class="stat-info">
          <span class="stat-value">{{ activities.length }}</span>
          <span class="stat-label">نشاط متاح</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">✅</span>
        <div class="stat-info">
          <span class="stat-value">{{ registeredActivitiesCount }}</span>
          <span class="stat-label">مسجل فيها</span>
        </div>
      </div>
    </div>

    <!-- Active Activities Grid -->
    <div class="section-container">
      <h2 class="section-title">الأنشطة المتاحة</h2>
      
      <div v-if="taskStore.loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري تحميل الأنشطة...</p>
      </div>

      <div v-else-if="activities.length > 0" class="activities-grid">
        <div v-for="activity in activities" :key="activity.id" class="activity-card">
          <div class="card-badge" :class="{ 'full': activity.seats <= 0 }">
            {{ activity.seats > 0 ? `${activity.seats} مقاعد` : 'مكتمل العدد' }}
          </div>
          <div class="card-content">
            <h3>{{ activity.title }}</h3>
            <p>{{ activity.description }}</p>
            
            <div class="card-footer">
              <span class="club-tag">🎪 نادي الرياضة</span>
              <button 
                class="register-btn" 
                :disabled="isRegistered(activity) || activity.seats <= 0"
                @click="register(activity)"
              >
                {{ isRegistered(activity) ? 'تم التسجيل' : (activity.seats > 0 ? 'سجل الآن' : 'غير متاح') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>لا توجد أنشطة متاحة حالياً.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useTaskStore } from '@/stores/taskStore'

export default {
  name: 'StudentView',
  computed: {
    authStore() {
      return useAuthStore()
    },
    taskStore() {
      return useTaskStore()
    },
    activities() {
      return this.taskStore.tasks
    },
    registeredActivitiesCount() {
      return this.activities.filter(a => this.isRegistered(a)).length
    }
  },
  mounted() {
    this.taskStore.fetchTasks()
  },
  methods: {
    isRegistered(activity) {
      return activity.registeredStudents?.includes(this.authStore.user?.id)
    },
    async register(activity) {
      if (activity.seats <= 0) return
      
      try {
        // محاكاة التسجيل بتحديث النشاط
        const updatedData = {
          ...activity,
          seats: activity.seats - 1,
          registeredStudents: [...(activity.registeredStudents || []), this.authStore.user.id]
        }
        await this.taskStore.updateTask(activity.id, updatedData)
        alert('تم التسجيل في النشاط بنجاح! 🎉')
      } catch (error) {
        alert('فشل التسجيل. يرجى المحاولة لاحقاً.')
      }
    }
  }
}
</script>

<style scoped>
.student-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.view-header {
  margin-bottom: 2rem;
}

.welcome-text h1 {
  color: #1e3a8a;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  color: #64748b;
  font-size: 1.1rem;
}

.stats-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a8a;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
}

.section-title {
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.activity-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  position: relative;
}

.activity-card:hover {
  transform: translateY(-5px);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #dcfce7;
  color: #166534;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.card-badge.full {
  background: #fee2e2;
  color: #991b1b;
}

.card-content {
  padding: 2rem 1.5rem 1.5rem;
}

.card-content h3 {
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.card-content p {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  height: 3rem;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.club-tag {
  font-size: 0.85rem;
  color: #3b82f6;
  font-weight: 600;
}

.register-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}

.register-btn:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
