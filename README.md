# 📝 Todo Tracker Application

A full-stack Todo Tracker application built with Node.js, Express, Sequelize, SQLite for the backend, and Next.js (App Router) for the frontend.

## 🚀 Features

- ✅ Create, Read, Update, and Delete todos
- ✅ Mark todos as completed
- ✅ Persistent storage with SQLite
- ✅ RESTful API with proper validation
- ✅ Modern UI with Tailwind CSS
- ✅ Real-time updates

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **SQLite** - Lightweight database

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## 📁 Project Structure
```
todo-tracker/
├── backend/
│   ├── config/           # Database configuration
│   ├── models/           # Sequelize models
│   ├── migrations/       # Database migrations
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
└── frontend/
    └── src/
        └── app/
            ├── components/  # React components
            └── page.js      # Main page
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

#### Backend
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run migrations
npx sequelize-cli db:migrate

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

#### Frontend
```bash
# Navigate to frontend folder (from root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Example Request Bodies

**Create Todo (POST /todos)**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Update Todo (PUT /todos/:id)**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": true
}
```

## 🎨 Design Decisions

1. **Sequelize with Migrations**: Provides database version control and easy schema management
2. **Modular Structure**: Separated routes, models, and middleware for better maintainability
3. **Error Handling**: Centralized error handling middleware for consistent API responses
4. **Validation**: Both backend (Sequelize) and frontend validation for data integrity
5. **Next.js App Router**: Modern routing with React Server Components support
6. **Component-Based Architecture**: Reusable components for better code organization
7. **Tailwind CSS**: Rapid UI development with utility classes

## ✨ Possible Improvements

1. **Authentication & Authorization**
   - Add user authentication (JWT)
   - User-specific todos
   - Role-based access control

2. **Advanced Features**
   - Todo categories/tags
   - Due dates and reminders
   - Priority levels
   - Search and filter functionality
   - Sorting options

3. **UI/UX Enhancements**
   - Drag-and-drop reordering
   - Dark mode toggle
   - Animations and transitions
   - Mobile app version

4. **Backend Improvements**
   - PostgreSQL for production
   - Caching with Redis
   - Rate limiting
   - API documentation with Swagger
   - Unit and integration tests

5. **DevOps**
   - Docker containerization
   - CI/CD pipeline
   - Environment-specific configs
   - Logging and monitoring

6. **Performance**
   - Pagination for large todo lists
   - Optimistic UI updates
   - Service workers for offline support

## 🧪 Testing

Currently, the project focuses on working functionality. Future improvements would include:
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Playwright/Cypress

## 📄 License

This project is created as a take-home test for an internship position.

## 👤 Author

Febryan Riyadi
