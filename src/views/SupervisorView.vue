<template>
  <div class="supervisor-view" dir="rtl">
    <header class="header">
      <h1>لوحة إشراف الأنشطة 👔</h1>
      <p>نظرة عامة على كافة الأنشطة الطلابية والأندية</p>
    </header>

    <div class="summary-cards">
      <div class="card">
        <h3>إجمالي الأنشطة</h3>
        <p class="number">{{ taskStore.tasks.length }}</p>
      </div>
      <div class="card">
        <h3>إجمالي المسجلين</h3>
        <p class="number">{{ totalStudents }}</p>
      </div>
      <div class="card">
        <h3>الأندية النشطة</h3>
        <p class="number">5</p>
      </div>
    </div>

    <div class="content-section">
      <h2>متابعة الأنشطة</h2>
      <div class="list">
        <div v-for="task in taskStore.tasks" :key="task.id" class="item">
          <div class="info">
            <strong>{{ task.title }}</strong>
            <span>نادي: {{ task.ownerClub || 'عام' }}</span>
          </div>
          <div class="status">
            <span>{{ task.registeredStudents?.length || 0 }} مشارك</span>
            <div class="progress-bar">
              <div class="fill" :style="{ width: calculatePercent(task) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/stores/taskStore'

export default {
  name: 'SupervisorView',
  computed: {
    taskStore() { return useTaskStore() },
    totalStudents() {
      return this.taskStore.tasks.reduce((sum, t) => sum + (t.registeredStudents?.length || 0), 0)
    }
  },
  mounted() {
    this.taskStore.fetchTasks()
  },
  methods: {
    calculatePercent(task) {
      const total = (task.seats || 0) + (task.registeredStudents?.length || 0)
      if (total === 0) return 0
      return ((task.registeredStudents?.length || 0) / total) * 100
    }
  }
}
</script>

<style scoped>
.supervisor-view { max-width: 1000px; margin: 0 auto; padding: 2rem; }
.header { margin-bottom: 2rem; }
.header h1 { color: #1e3a8a; }
.summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
.card { background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center; }
.card h3 { color: #64748b; font-size: 1rem; }
.card .number { font-size: 2.5rem; font-weight: 800; color: #1e3a8a; }

.content-section { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.content-section h2 { margin-bottom: 1.5rem; color: #1e3a8a; }
.list { display: flex; flex-direction: column; gap: 1rem; }
.item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f1f5f9; }
.info { display: flex; flex-direction: column; }
.info strong { font-size: 1.1rem; }
.info span { color: #94a3b8; font-size: 0.9rem; }

.progress-bar { width: 150px; height: 8px; background: #e2e8f0; border-radius: 4px; margin-top: 5px; }
.fill { height: 100%; background: #3b82f6; border-radius: 4px; }
</style>
