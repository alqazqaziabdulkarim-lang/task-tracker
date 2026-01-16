<template>
  <!-- Task Item Component - لعرض نشاط واحد -->
  <div class="task-item" :class="{ completed: task.completed }">
    <!-- Checkbox to toggle task completion -->
    <div class="task-checkbox">
      <input
        type="checkbox"
        :id="`task-${task.id}`"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
      />
      <label :for="`task-${task.id}`"></label>
    </div>

    <!-- Task content -->
    <div class="task-content">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">
        {{ task.description }}
      </p>
    </div>

    <!-- Task actions -->
    <div class="task-actions">
      <button
        class="btn-edit"
        @click="$emit('edit', task)"
        title="تعديل النشاط"
      >
        ✏️
      </button>
      <button
        class="btn-delete"
        @click="$emit('delete', task.id)"
        title="حذف النشاط"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script>
/**
 * TaskItem Component
 */
export default {
  name: 'TaskItem',
  
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  
  emits: ['toggle', 'edit', 'delete']
}
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
  background: white;
}

.task-item.completed {
  opacity: 0.6;
  background: #f1f5f9;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #94a3b8;
}

/* Checkbox styling */
.task-checkbox {
  flex-shrink: 0;
}

.task-checkbox input[type="checkbox"] {
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #1e3a8a;
}

/* Task content */
.task-content {
  flex: 1;
  min-width: 0;
  text-align: right;
}

.task-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  transition: color 0.3s ease;
}

.task-description {
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  color: #64748b;
}

/* Action buttons */
.task-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.task-actions button {
  padding: 0.6rem;
  border: none;
  background: #f8fafc;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-actions button:hover {
  background: #e2e8f0;
  transform: scale(1.1);
}

.btn-delete:hover {
  background: #fef2f2 !important;
}

.btn-edit:hover {
  background: #eff6ff !important;
}
</style>
