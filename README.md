A robust Task Management API built with Node.js, Express, and Sequelize (MySQL). This project implements strict business logic for task lifecycles and includes a daily summary report.

Backend LIVE url = https://task-manager-api-xbym.onrender.com/api
Fronted Live Url = https://task-manager-api-uwgu.vercel.app/

**Project Structure**
  server/: Express API, Sequelize models, and migrations.
  frontend/client: React application with Axios for API communication.

**Features & Business Rules**
   This API strictly adheres to the following logic:
   Task Creation: due_date must be today or later. Titles cannot be duplicated for the same date.
  Status Progression: Status can only move from pending → in_progress → done. Reverting or skipping steps is blocked.
  Deletion: Only tasks marked as done can be deleted (returns 403 Forbidden otherwise).
  Task List: Automatically sorted by Priority (High > Medium > Low) and then by Due Date (Ascending).
  Daily Report: Bonus endpoint to get counts per priority and status for any specific date.

  **Local Setup Instructions**
     Prerequisites
       Node.js (v18+)
       MySQL Server running locally
       
  **Frontend Configuration**
    Navigate to the /frontend/client folder.
    Create a .env file
          VITE_BACKEND_URL=https://task-manager-api-xbym.onrender.com/api
         VITE_BACKEND_LOCAL=http://localhost:5000

  **Install dependencies and start the app:**
        npm install
       npm run dev
  **Backend Configuration**
     Navigate to the server/ folder.
     Create a .env file and configure your MySQL credentials:
          PORT=5000
          DATABASE_URL=mysql://root:password@127.0.0.1:3306/railway
          FRONTEND_URL=https://task-manager-api-uwgu.vercel.app
         FRONTEND_LOCAL_URL=http://localhost:5173
  **Install dependencies and run migrations:**
       npm install
       npx sequelize-cli db:migrate
       
**Start the backend**
             npm run dev

**Deployment**
    Backend: Hosted on Render (linked to Railway MySQL).
              https://task-manager-api-xbym.onrender.com/api
   Frontend: Hosted on Vercel.
              https://task-manager-api-uwgu.vercel.app/

**Example API Requests**
    **CREATE TASKS**
           POST: /api/tasks
            {
               "title": "Complete Internship Assignment",
               "due_date": "2026-04-01",
               "priority": "high"
           }
     **LIST TASKS**
           GET: api/tasks
                   {
                      "id": 6,
                       "title": "UX design",
                       "due_date": "2026-07-12",
                       "priority": "high",
                       "status": "pending",
                   }

           
