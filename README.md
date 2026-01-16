# Task Tracker - Vue.js 3 CRUD Application

A clean and modern task management application built with Vue.js 3, demonstrating best practices for CRUD operations, state management, and component architecture.

## 🎯 Learning Objectives

This project is designed to teach:
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **State Management**: Using Pinia for centralized state
- **Component Architecture**: Reusable, well-structured components
- **API Integration**: Axios for HTTP requests
- **Vue Router**: Client-side routing
- **Modern UI/UX**: Clean, responsive design

## 📁 Project Structure

```
src/
├── main.js                 # Application entry point
├── App.vue                 # Root component
├── router/
│   ├── index.js           # Router configuration
│   └── routes.js          # Route definitions
├── stores/
│   └── taskStore.js       # Pinia store for task management
├── services/
│   └── api.js             # Axios API configuration
├── components/
│   ├── TaskForm.vue       # Form for creating/editing tasks
│   └── TaskItem.vue       # Individual task display
└── views/
    └── TasksView.vue      # Main tasks page
```

## 🏗️ Architecture Explained

### 1. **Entry Point (main.js)**
- Initializes Vue application
- Registers Pinia (state management)
- Registers Vue Router (navigation)
- Mounts app to DOM

### 2. **State Management (stores/taskStore.js)**
The Pinia store centralizes all task-related data and operations:

**State:**
- `tasks`: Array of all tasks
- `loading`: Loading state for API calls
- `error`: Error messages
- `filter`: Current filter ('all', 'active', 'completed')

**Getters:**
- `filteredTasks`: Returns tasks based on current filter
- `activeTasksCount`: Count of incomplete tasks
- `completedTasksCount`: Count of completed tasks

**Actions (CRUD Operations):**
- `fetchTasks()`: **READ** - Get all tasks from API
- `createTask()`: **CREATE** - Add new task
- `updateTask()`: **UPDATE** - Modify existing task
- `deleteTask()`: **DELETE** - Remove task
- `toggleTaskCompletion()`: Toggle task status

### 3. **API Service (services/api.js)**
Axios instance with:
- Base URL configuration
- Request interceptor (for auth tokens)
- Response interceptor (for error handling)

### 4. **Components**

#### **TaskForm.vue** (Reusable Form)
- Used for both creating and editing tasks
- Props: `task` (optional, for editing)
- Events: `submit`, `cancel`
- Features: Form validation, auto-reset

#### **TaskItem.vue** (Task Display)
- Displays individual task
- Props: `task` object
- Events: `toggle`, `edit`, `delete`
- Features: Checkbox, edit/delete buttons, hover effects

#### **TasksView.vue** (Main Page)
- Orchestrates all components
- Manages editing state
- Handles all CRUD operations
- Shows loading/error/empty states

## 🔄 CRUD Operations Flow

### CREATE (Add Task)
1. User fills TaskForm
2. Form emits `submit` event with data
3. TasksView calls `taskStore.createTask()`
4. Store makes POST request via API service
5. New task added to store state
6. UI updates automatically (reactive)

### READ (Fetch Tasks)
1. Component mounts
2. Calls `taskStore.fetchTasks()`
3. Store makes GET request
4. Tasks stored in state
5. UI displays tasks via `filteredTasks` getter

### UPDATE (Edit Task)
1. User clicks edit button
2. TasksView sets `editingTask`
3. TaskForm populates with task data
4. User submits changes
5. TasksView calls `taskStore.updateTask()`
6. Store makes PUT request
7. Task updated in state
8. UI updates automatically

### DELETE (Remove Task)
1. User clicks delete button
2. Confirmation dialog appears
3. TasksView calls `taskStore.deleteTask()`
4. Store makes DELETE request
5. Task removed from state
6. UI updates automatically

## 🎨 Key Features

- ✅ Complete CRUD operations
- 📦 Centralized state management with Pinia
- 🎯 Reusable components
- 🔍 Filter tasks (All/Active/Completed)
- ✏️ Inline editing
- 🎨 Modern, clean UI
- 📱 Responsive design
- ⚡ Real-time updates
- 🔔 Error handling
- 💬 User feedback (loading states, confirmations)

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend API Setup

The app expects a backend API at `http://localhost:3000/api/tasks`

**Required Endpoints:**
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

**Task Object Structure:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false
}
```

## 📚 Code Concepts for Students

### 1. **Reactive State**
Vue automatically updates the UI when data changes. The store's state is reactive.

### 2. **Component Communication**
- **Props**: Parent → Child (data down)
- **Events**: Child → Parent (events up)

### 3. **Async/Await**
All API calls use async/await for cleaner asynchronous code.

### 4. **Error Handling**
Try-catch blocks ensure graceful error handling.

### 5. **Separation of Concerns**
- **Components**: UI and user interaction
- **Store**: Business logic and state
- **Services**: API communication

### 6. **Single Responsibility**
Each component has one clear purpose.

## 🎓 Teaching Points

### For Beginners:
1. Start with `TasksView.vue` to see the big picture
2. Understand the CRUD flow diagram above
3. Trace one operation (e.g., CREATE) through the entire stack

### For Intermediate:
1. Study the Pinia store pattern
2. Understand component composition
3. Learn about reactive state management

### For Advanced:
1. Implement additional features (search, categories)
2. Add form validation
3. Implement optimistic UI updates
4. Add unit tests

## 🛠️ Technologies Used

- **Vue.js 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and dev server
- **Pinia**: State management library
- **Vue Router**: Official router for Vue.js
- **Axios**: HTTP client for API requests

## 📝 Best Practices Demonstrated

1. ✅ Clear file organization
2. ✅ Comprehensive code comments
3. ✅ Consistent naming conventions
4. ✅ Error handling
5. ✅ Loading states
6. ✅ User feedback
7. ✅ Responsive design
8. ✅ Reusable components
9. ✅ Separation of concerns
10. ✅ Clean code principles

## 🔍 Common Questions

**Q: Why use Pinia instead of keeping state in components?**
A: Centralized state makes it easier to manage data, avoid prop drilling, and maintain consistency across components.

**Q: Why separate API service from components?**
A: Separation allows for easier testing, reusability, and changing the API implementation without touching components.

**Q: What's the benefit of the store pattern?**
A: Single source of truth, predictable state changes, easier debugging, and better code organization.

## 📖 Further Learning

- [Vue.js Official Docs](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Guide](https://router.vuejs.org/)
- [Axios Documentation](https://axios-http.com/)

## 👨‍🏫 For Instructors

This codebase is heavily commented to facilitate teaching. Each file includes:
- Purpose explanation
- Function documentation
- Inline comments for complex logic
- Clear variable names

Feel free to use this as a reference implementation for teaching Vue.js CRUD applications.

---

**Built with ❤️ for learning Vue.js**
