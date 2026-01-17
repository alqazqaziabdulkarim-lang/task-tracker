/**
 * مخزن الأنشطة - إدارة الحالة المركزية باستخدام Pinia
 */

import { defineStore } from 'pinia'
import api from '@/services/api'

/**
 * تعريف مخزن الأنشطة
 */
export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],           // مصفوفة جميع الأنشطة من قاعدة البيانات
        loading: false,      // هل نقوم حالياً بتحميل البيانات؟
        error: null,         // رسالة الخطأ في حال حدوث مشكلة
        filter: 'all'        // الفلتر الحالي: 'all', 'active', or 'completed'
    }),

    getters: {
        /**
         * الحصول على الأنشطة المفلترة بناءً على الفلتر الحالي
         */
        filteredTasks: (state) => {
            if (state.filter === 'active') {
                return state.tasks.filter(task => !task.completed)
            }
            if (state.filter === 'completed') {
                return state.tasks.filter(task => task.completed)
            }
            return state.tasks
        },

        activeTasksCount: (state) => {
            return state.tasks.filter(task => !task.completed).length
        },

        completedTasksCount: (state) => {
            return state.tasks.filter(task => task.completed).length
        }
    },

    actions: {
        /**
         * جلب جميع الأنشطة من الخلفية
         */
        async fetchTasks() {
            this.loading = true
            this.error = null

            try {
                const response = await api.get('/activities/')
                this.tasks = response.data.map(task => ({
                    ...task,
                    id: task.id || task._id
                }))
                console.log(`✅ تم تحميل ${this.tasks.length} نشاط من قاعدة البيانات`)
            } catch (error) {
                this.error = 'فشل في تحميل الأنشطة. يرجى التأكد من تشغيل الخادم.'
                console.error('Error fetching tasks:', error)
            } finally {
                this.loading = false
            }
        },

        /**
         * إنشاء نشاط جديد
         */
        async createTask(taskData) {
            this.loading = true
            this.error = null

            try {
                const response = await api.post('/activities/', taskData)
                const newTask = {
                    ...response.data,
                    id: response.data.id || response.data._id
                }
                this.tasks.push(newTask)
                console.log('✅ تم إنشاء النشاط:', response.data.title)
            } catch (error) {
                this.error = 'فشل في إنشاء النشاط. يرجى المحاولة مرة أخرى.'
                console.error('Error creating task:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * تحديث نشاط موجود
         */
        async updateTask(id, taskData) {
            this.loading = true
            this.error = null

            try {
                // نرسل البيانات المحدثة كاملة للخلفية
                const response = await api.put(`/activities/${id}`, taskData)

                const index = this.tasks.findIndex(task => task._id === id || task.id === id)
                if (index !== -1) {
                    this.tasks[index] = {
                        ...response.data,
                        id: response.data.id || response.data._id
                    }
                    console.log('✅ تم تحديث النشاط:', response.data.title)
                }
            } catch (error) {
                this.error = 'فشل في تحديث النشاط. يرجى المحاولة مرة أخرى.'
                console.error('Error updating task:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * تبديل حالة الإكمال
         */
        async toggleTaskCompletion(id) {
            const task = this.tasks.find(t => t._id === id || t.id === id)
            if (!task) {
                console.error('Task not found:', id)
                return
            }

            try {
                await this.updateTask(id, {
                    title: task.title,
                    description: task.description,
                    completed: !task.completed
                })
            } catch (error) {
                console.error('Error toggling task:', error)
            }
        },

        /**
         * حذف نشاط
         */
        async deleteTask(id) {
            this.loading = true
            this.error = null

            try {
                await api.delete(`/activities/${id}`)
                this.tasks = this.tasks.filter(task => task._id !== id && task.id !== id)
                console.log('✅ تم حذف النشاط')
            } catch (error) {
                this.error = 'فشل في حذف النشاط. يرجى المحاولة مرة أخرى.'
                console.error('Error deleting task:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        setFilter(filter) {
            this.filter = filter
        }
    }
})

/**
 * ============================================================================
 * HOW TO USE THIS STORE IN A COMPONENT
 * ============================================================================
 * 
 * 1. Import the store:
 *    import { useTaskStore } from '@/stores/taskStore'
 * 
 * 2. Get the store instance (in setup() or inside a method):
 *    const taskStore = useTaskStore()
 * 
 * 3. Access state:
 *    taskStore.tasks          // Get all tasks
 *    taskStore.loading        // Check if loading
 * 
 * 4. Access getters:
 *    taskStore.filteredTasks  // Get filtered tasks
 *    taskStore.activeTasksCount  // Get count
 * 
 * 5. Call actions:
 *    taskStore.fetchTasks()   // Load tasks
 *    taskStore.createTask({title: 'New task'})  // Create task
 * 
 * ============================================================================
 */
