<template>
  <!-- Task Form Component - لإنشاء وتعديل الأنشطة -->
  <div class="task-form">
    <h3>{{ isEditing ? 'تعديل النشاط' : 'إضافة نشاط جديد' }}</h3>
    
    <form @submit.prevent="handleSubmit">
      <!-- Activity Title Input -->
      <div class="form-group">
        <label for="task-title">اسم النشاط *</label>
        <input
          id="task-title"
          v-model="formData.title"
          type="text"
          placeholder="أدخل اسم النشاط..."
          required
        />
      </div>

      <!-- Activity Description Input -->
      <div class="form-group">
        <label for="task-description">وصف النشاط</label>
        <textarea
          id="task-description"
          v-model="formData.description"
          placeholder="أدخل وصفاً للنشاط (اختياري)..."
          rows="3"
        ></textarea>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="submit" class="btn-primary" id="add-task">
          {{ isEditing ? 'تحديث النشاط' : 'إضافة نشاط' }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          class="btn-secondary"
          @click="handleCancel"
        >
          إلغاء
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * TaskForm Component
 */
export default {
  name: 'TaskForm',
  
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  
  emits: ['submit', 'cancel'],
  
  data() {
    return {
      formData: {
        title: '',
        description: '',
        completed: false
      }
    }
  },
  
  computed: {
    isEditing() {
      return this.task !== null
    }
  },
  
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.formData = {
            title: newTask.title || '',
            description: newTask.description || '',
            completed: newTask.completed || false
          }
        } else {
          this.resetForm()
        }
      }
    }
  },
  
  methods: {
    handleSubmit() {
      if (!this.formData.title.trim()) {
        alert('يرجى إدخال اسم النشاط')
        return
      }
      
      this.$emit('submit', { ...this.formData })
      
      if (!this.isEditing) {
        this.resetForm()
      }
    },
    
    handleCancel() {
      this.$emit('cancel')
      this.resetForm()
    },
    
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        completed: false
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2.5rem;
}

.task-form h3 {
  margin: 0 0 1.5rem;
  color: #1e3a8a;
  font-size: 1.5rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.6rem;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #1e3a8a;
  color: white;
  flex: 1;
}

.btn-primary:hover {
  background: #1e40af;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.btn-secondary {
  background: #e2e8f0;
  color: #475569;
}

.btn-secondary:hover {
  background: #cbd5e1;
}
</style>
