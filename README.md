# User Management Application — MERN Stack

A full-stack User Management application built with **MongoDB, Express.js, React.js (Vite), and Node.js**.

---

## Project Structure

```
BNV Assignment/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── userController.js      # All API logic (CRUD + CSV export)
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handling
│   │   └── upload.js              # Multer file upload config
│   ├── models/
│   │   └── User.js                # Mongoose User schema
│   ├── routes/
│   │   └── userRoutes.js          # Express routes
│   ├── utils/
│   │   └── csvExporter.js         # CSV export helper
│   ├── uploads/                   # Profile image uploads (auto-created)
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── UserTable.jsx
    │   │   ├── UserForm.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── ViewDetailsCard.jsx
    │   │   ├── ConfirmDeleteModal.jsx
    │   │   └── Loader.jsx
    │   ├── pages/
    │   │   ├── UserListPage.jsx    # /users
    │   │   ├── AddUserPage.jsx     # /users/add
    │   │   ├── EditUserPage.jsx    # /users/edit/:id
    │   │   ├── ViewUserPage.jsx    # /users/view/:id
    │   │   └── NotFoundPage.jsx
    │   ├── services/
    │   │   ├── axiosInstance.js    # Axios base instance
    │   │   └── userService.js      # All user API calls
    │   ├── utils/
    │   │   ├── helpers.js          # Utility functions
    │   │   └── validationSchema.js # Yup schema
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017, or use MongoDB Atlas)
- npm v9+

---

## Installation & Setup

### 1. Backend

```bash
cd backend
npm install
```

Edit `backend/.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user_management
NODE_ENV=development
```

### 2. Frontend

```bash
cd frontend
npm install
```

Edit `frontend/.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## Run Instructions

### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The API will be available at: `http://localhost:5000`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The app will open at: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| GET    | /api/users                | Get all users (paginated)  |
| GET    | /api/users/:id            | Get single user            |
| POST   | /api/users                | Create new user            |
| PUT    | /api/users/:id            | Update user                |
| DELETE | /api/users/:id            | Delete user                |
| GET    | /api/users/export/csv     | Export all users to CSV    |

### Query Parameters for `GET /api/users`

| Param  | Type   | Default | Description                         |
|--------|--------|---------|-------------------------------------|
| page   | number | 1       | Page number                         |
| limit  | number | 10      | Items per page                      |
| search | string | ""      | Search by firstName, lastName, email|

### Example API Responses

**GET /api/users**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65ab1234...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "mobile": "9876543210",
      "gender": "Male",
      "profileImage": "/uploads/profile-1234567890.jpg",
      "status": "Active",
      "location": "Mumbai",
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    }
  ],
  "pagination": {
    "totalRecords": 25,
    "totalPages": 3,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

**POST /api/users** (success)
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... }
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## Features

- **User Listing** — Table with search, pagination, inline status toggle
- **Add User** — Form with validation (React Hook Form + Yup)
- **Edit User** — Pre-populated form with profile image update
- **View User** — Card-style detail view
- **Delete User** — Confirmation modal before deletion
- **CSV Export** — Download all users as a CSV file
- **Profile Images** — Upload and serve user profile photos
- **Toast Notifications** — Success and error feedback
- **Loading States** — Spinner while fetching data
- **Responsive Design** — Mobile and desktop friendly

---

## Tech Stack

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| Forms    | React Hook Form + Yup                       |
| HTTP     | Axios                                        |
| Toast    | react-hot-toast                             |
| Backend  | Node.js, Express.js                         |
| Database | MongoDB + Mongoose                          |
| Upload   | Multer                                      |
| Export   | json2csv                                    |
# BNV-Assignment
# BNV-Assignment
