<template>
  <div class="club-dashboard" dir="rtl">
    <header class="dashboard-header">
      <div class="header-info">
        <h1>لوحة تحكم النادي 🎪</h1>
        <p>إدارة أنشطة النادي وتتبع تسجيل الطلاب</p>
      </div>
      <button class="add-btn" @click="showModal = true">
        <span>➕</span> إضافة نشاط جديد
      </button>
    </header>

    <!-- Club Stats -->
    <div class="stats-grid">
      <div class="stat-item">
        <span class="val">{{ myActivities.length }}</span>
        <span class="lbl">أنشطة مفعلة</span>
      </div>
      <div class="stat-item">
        <span class="val">{{ totalRegistrations }}</span>
        <span class="lbl">إجمالي المسجلين</span>
      </div>
      <div class="stat-item">
        <span class="val">{{ totalAvailableSeats }}</span>
        <span class="lbl">مقاعد متبقية</span>
      </div>
    </div>

    <!-- Activities Table -->
    <div class="table-container">
      <table class="activities-table">
        <thead>
          <tr>
            <th>النشاط</th>
            <th>الحالة</th>
            <th>المقاعد (إجمالي/متاح)</th>
            <th>المسجلين</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in myActivities" :key="activity.id">
            <td>
              <div class="activity-info">
                <strong>{{ activity.title }}</strong>
                <span class="desc">{{ activity.description }}</span>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="activity.completed ? 'completed' : 'active'">
                {{ activity.completed ? 'منتهي' : 'نشط' }}
              </span>
            </td>
            <td>
              <div class="seats-info">
                <span class="total">{{ activity.seats + (activity.registeredStudents?.length || 0) }}</span> / 
                <span class="available" :class="{ 'none': activity.seats <= 0 }">{{ activity.seats }}</span>
              </div>
            </td>
            <td>
              <div class="student-avatars">
                {{ activity.registeredStudents?.length || 0 }} طالب
              </div>
            </td>
            <td>
              <div class="actions">
                <button class="icon-btn edit" @click="editActivity(activity)" title="تعديل">✏️</button>
                <button class="icon-btn delete" @click="deleteActivity(activity.id)" title="حذف">🗑️</button>
              </div>
            </td>
          </tr>
          <tr v-if="myActivities.length === 0">
            <td colspan="5" class="empty-row">لا توجد أنشطة مضافة حالياً. ابدأ بإضافة نشاطك الأول!</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal (Simulated for simplicity) -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ editingId ? 'تعديل نشاط' : 'إضافة نشاط جديد' }}</h2>
        <form @submit.prevent="saveActivity">
          <div class="form-group">
            <label>اسم النشاط</label>
            <input v-model="form.title" required placeholder="مثلاً: دوري كرة القدم">
          </div>
          <div class="form-group">
            <label>الوصف</label>
            <textarea v-model="form.description" rows="3" placeholder="وصف موجز للنشاط"></textarea>
          </div>
          <div class="form-group">
            <label>عدد المقاعد</label>
            <input type="number" v-model.number="form.seats" min="1" required>
          </div>
          <div class="modal-actions">
            <button type="submit" class="save-btn">{{ editingId ? 'تحديث' : 'حفظ' }}</button>
            <button type="button" class="cancel-btn" @click="closeModal">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useTaskStore } from '@/stores/taskStore'

export default {
  name: 'ClubDashboard',
  data() {
    return {
      showModal: false,
      editingId: null,
      form: {
        title: '',
        description: '',
        seats: 20
      }
    }
  },
  computed: {
    authStore() { return useAuthStore() },
    taskStore() { return useTaskStore() },
    myActivities() {
      // لعرض الأنشطة الخاصة بالنادي فقط (في المحاكاة سنعرض الكل حالياً)
      return this.taskStore.tasks
    },
    totalRegistrations() {
      return this.myActivities.reduce((sum, a) => sum + (a.registeredStudents?.length || 0), 0)
    },
    totalAvailableSeats() {
      return this.myActivities.reduce((sum, a) => sum + (a.seats || 0), 0)
    }
  },
  mounted() {
    this.taskStore.fetchTasks()
  },
  methods: {
    closeModal() {
      this.showModal = false
      this.editingId = null
      this.form = { title: '', description: '', seats: 20 }
    },
    editActivity(activity) {
      this.editingId = activity.id
      this.form = { 
        title: activity.title, 
        description: activity.description, 
        seats: activity.seats 
      }
      this.showModal = true
    },
    async saveActivity() {
      try {
        if (this.editingId) {
          await this.taskStore.updateTask(this.editingId, { 
            ...this.form,
            ownerName: this.authStore.userName 
          })
        } else {
          await this.taskStore.createTask({
            ...this.form,
            ownerClub: this.authStore.user.id,
            ownerName: this.authStore.userName,
            registeredStudents: []
          })
        }
        this.closeModal()
      } catch (error) {
        alert('حدث خطأ أثناء الحفظ')
      }
    },
    async deleteActivity(id) {
      if (confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
        await this.taskStore.deleteTask(id)
      }
    }
  }
}
</script>

<style scoped>
.club-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-info h1 {
  color: #1e3a8a;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header-info p {
  color: #64748b;
}

.add-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-btn:hover {
  background: #3b82f6;
  transform: translateY(-2px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-item {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.stat-item .val {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e3a8a;
}

.stat-item .lbl {
  color: #64748b;
  font-weight: 600;
}

.table-container {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.activities-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}

.activities-table th {
  background: #f8fafc;
  padding: 1.25rem 1.5rem;
  color: #475569;
  font-weight: 700;
  border-bottom: 1px solid #e2e8f0;
}

.activities-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.activity-info strong {
  display: block;
  color: #1e293b;
  font-size: 1.1rem;
}

.activity-info .desc {
  font-size: 0.85rem;
  color: #94a3b8;
}

.status-badge {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-badge.active { background: #dcfce7; color: #166534; }
.status-badge.completed { background: #f1f5f9; color: #475569; }

.seats-info .available { color: #166534; font-weight: 700; }
.seats-info .available.none { color: #ef4444; }

.actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: #f1f5f9;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover { transform: scale(1.1); }
.icon-btn.edit:hover { background: #eff6ff; }
.icon-btn.delete:hover { background: #fef2f2; }

.empty-row {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 25px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-content h2 { color: #1e3a8a; margin-bottom: 1.5rem; }

.form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-weight: 600; color: #334155; }
.form-group input, .form-group textarea {
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
}

.modal-actions { display: flex; gap: 1rem; margin-top: 2rem; }
.save-btn { flex: 2; background: #1e3a8a; color: white; border: none; padding: 0.8rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
.cancel-btn { flex: 1; background: #f1f5f9; color: #475569; border: none; padding: 0.8rem; border-radius: 12px; font-weight: 700; cursor: pointer; }

</style>
