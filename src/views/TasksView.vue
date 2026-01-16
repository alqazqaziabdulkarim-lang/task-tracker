<template>
  <div class="tasks-view">
    <!-- Page Header -->
    <header class="page-header">
      <h1>أنشطتي</h1>
      <div class="task-stats">
        <span class="stat">
          <strong>{{ taskStore.activeTasksCount }}</strong> قيد التنفيذ
        </span>
        <span class="stat">
          <strong>{{ taskStore.completedTasksCount }}</strong> مكتملة
        </span>
      </div>
    </header>

    <!-- Task Form - for creating/editing tasks -->
    <TaskForm
      :task="editingTask"
      @submit="handleFormSubmit"
      @cancel="cancelEdit"
    />

    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <button
        :class="{ active: taskStore.filter === 'all' }"
        @click="taskStore.setFilter('all')"
      >
        جميع الأنشطة
      </button>
      <button
        :class="{ active: taskStore.filter === 'active' }"
        @click="taskStore.setFilter('active')"
      >
        قيد التنفيذ
      </button>
      <button
        :class="{ active: taskStore.filter === 'completed' }"
        @click="taskStore.setFilter('completed')"
      >
        مكتملة
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="taskStore.loading" class="loading">
      جاري تحميل الأنشطة...
    </div>

    <!-- Error State -->
    <div v-else-if="taskStore.error" class="error">
      {{ taskStore.error }}
    </div>

    <!-- Task List -->
    <div v-else-if="taskStore.filteredTasks.length > 0" class="task-list">
      <TaskItem
        v-for="task in taskStore.filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggleTask"
        @edit="handleEditTask"
        @delete="handleDeleteTask"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p>{{ emptyStateMessage }}</p>
    </div>
  </div>
</template>

<script>
/**
 * TasksView - العرض الرئيسي لإدارة الأنشطة
 */
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'

export default {
  name: 'TasksView',
  
  components: {
    TaskForm,
    TaskItem
  },
  
  data() {
    return {
      editingTask: null
    }
  },
  
  computed: {
    taskStore() {
      return useTaskStore()
    },
    
    emptyStateMessage() {
      if (this.taskStore.filter === 'active') {
        return 'لا توجد أنشطة قيد التنفيذ. عمل رائع! 🎉'
      }
      if (this.taskStore.filter === 'completed') {
        return 'لا توجد أنشطة مكتملة بعد.'
      }
      return 'لا توجد أنشطة بعد. أضف نشاطك الأول أعلاه!'
    }
  },
  
  mounted() {
    this.taskStore.fetchTasks()
  },
  
  methods: {
    async handleFormSubmit(formData) {
      try {
        if (this.editingTask) {
          await this.taskStore.updateTask(this.editingTask.id, formData)
          this.editingTask = null
        } else {
          await this.taskStore.createTask(formData)
        }
      } catch (error) {
        alert('فشل في حفظ النشاط. يرجى المحاولة مرة أخرى.')
      }
    },
    
    async handleToggleTask(taskId) {
      try {
        await this.taskStore.toggleTaskCompletion(taskId)
      } catch (error) {
        alert('فشل في تحديث النشاط. يرجى المحاولة مرة أخرى.')
      }
    },
    
    handleEditTask(task) {
      this.editingTask = task
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    async handleDeleteTask(taskId) {
      if (!confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
        return
      }
      
      try {
        await this.taskStore.deleteTask(taskId)
      } catch (error) {
        alert('فشل في حذف النشاط. يرجى المحاولة مرة أخرى.')
      }
    },
    
    cancelEdit() {
      this.editingTask = null
    }
  }
}
</script>

<style scoped>
.tasks-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Page Header */
.page-header {
  margin-bottom: 2.5rem;
  text-align: right;
}

.page-header h1 {
  margin: 0 0 0.5rem;
  color: #1e3a8a;
  font-size: 2.25rem;
  font-weight: 700;
}

.task-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  color: #64748b;
  font-size: 1rem;
}

.stat strong {
  color: #3b82f6;
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

/* Filter Buttons */
.filter-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-buttons button {
  padding: 0.6rem 1.2rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.filter-buttons button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.filter-buttons button.active {
  background: #1e3a8a;
  color: white;
  border-color: #1e3a8a;
  box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2);
}

/* Task List */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* States */
.loading,
.error,
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #64748b;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.error {
  color: #ef4444;
  background: #fef2f2;
}

.empty-state p {
  font-size: 1.25rem;
  margin: 0;
}
</style>
