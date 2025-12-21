# Agan Sewa - Service Management System

A full-stack web application for managing branches, services, staff, inquiries, reviews, and gallery for a multi-branch organization. The system supports role-based access control with Admin, Manager, and Staff roles.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication with HTTP-only cookies
  - Role-based access control (Admin, Manager, Staff)
  - Secure password hashing with bcrypt

- **Branch Management**
  - Manage provinces, districts, and branches
  - Hierarchical location structure

- **Service Management**
  - Create, update, and delete services
  - Service images upload
  - Branch-specific services

- **Staff Management**
  - Add, edit, and delete staff members
  - Staff profile images
  - Branch assignment

- **Site Management**
  - Customer inquiries
  - Reviews and ratings
  - Gallery management with multiple images
  - Trusted customers showcase

- **File Upload**
  - Image uploads for services, staff, gallery, and customers
  - Organized file structure in uploads directory

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Agan
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=Angan_sewa

# JWT Configuration
SECRET_KEY=""
TOKEN_EXPIRY=7d

# Server Configuration
PORT=3000
```

### 3. Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE Angan_sewa;
```

2. Run the schema file:
```bash
mysql -u your username -p Angan_sewa < backend/schema/table.sql
```

Or execute the SQL commands from `backend/schema/table.sql` in your MySQL client.

### 4. Frontend Setup

```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Backend

```bash
cd backend
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

The backend server will run on `http://localhost:3000` (or the PORT specified in .env)

### Frontend

```bash
cd frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` (Vite default port)

## 📁 Project Structure

```
Agan/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controller/
│   │   ├── auth.controller.js # Authentication controllers
│   │   ├── branch.controller.js
│   │   ├── service.controller.js
│   │   ├── site.controller.js
│   │   └── staff.controller.js
│   ├── middleware/
│   │   ├── Islogin.js         # Authentication middleware
│   │   ├── IsAdmin.js         # Admin authorization middleware
│   │   └── globalErrorHandler.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── branch.route.js
│   │   ├── service.route.js
│   │   ├── site.route.js
│   │   └── staff.route.js
│   ├── schema/
│   │   └── table.sql          # Database schema
│   ├── uploads/               # Uploaded files
│   │   ├── customers/
│   │   ├── gallery/
│   │   ├── manager/
│   │   ├── service/
│   │   └── staff/
│   ├── utils/
│   │   ├── multerHandler.js   # File upload configuration
│   │   └── removeImg.js       # Image cleanup utility
│   └── index.js               # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   │   ├── features/      # Redux slices
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/login` - User login
  - Body: `{ email, password }`
  - Returns: JWT token in HTTP-only cookie

- `POST /api/auth/logout` - User logout (requires authentication)
  - Middleware: `islogin`

- `POST /api/auth/add-manager` - Add manager (Admin only)
  - Middleware: `islogin`, `isAdmin`
  - Body: Form data with image file
  - Fields: `manager_name`, `manager_email`, `manager_phone`, `password`, `role`, `branch_id`, `image`

- `GET /api/auth/get-manager` - Get all managers (Admin only)
  - Middleware: `islogin`, `isAdmin`

- `DELETE /api/auth/delete-manager/:id` - Delete manager (Admin only)
  - Middleware: `islogin`, `isAdmin`

- `PATCH /api/auth/edit-manager/:id` - Edit manager (Admin only)
  - Middleware: `islogin`, `isAdmin`

### Branch Management (`/api/branch`)

- `POST /api/branch/add-province` - Add province (Admin only)
- `GET /api/branch/get-province` - Get all provinces (Public)
- `DELETE /api/branch/delete-province/:id` - Delete province (Admin only)

- `POST /api/branch/add-district` - Add district (Admin only)
- `GET /api/branch/get-district` - Get districts by province (Public)
- `DELETE /api/branch/delete-district/:id` - Delete district (Admin only)

- `POST /api/branch/add-branch` - Add branch (Admin only)
- `GET /api/branch/get-branch` - Get all branches (Public)
- `DELETE /api/branch/delete-branch/:id` - Delete branch (Admin only)
- `PATCH /api/branch/edit-branch/:id` - Update branch (Admin only)

### Service Management (`/api/services`)

- `POST /api/services/add-service` - Add service (Admin only)
  - Middleware: `islogin`, `isAdmin`
  - Body: Form data with `image` file
  - Fields: `name`, `description`, `branch_id`

- `GET /api/services/get-service` - Get all services (Public)

- `DELETE /api/services/delete-service/:id` - Delete service (Admin only)
  - Middleware: `islogin`, `isAdmin`

- `PATCH /api/services/update-service/:id` - Update service (Admin only)
  - Middleware: `islogin`, `isAdmin`

### Site Management (`/api/site`)

#### Inquiries
- `POST /api/site/add-inquiry` - Add inquiry (Public)
- `GET /api/site/get-inquiry` - Get inquiries (Authenticated)

#### Reviews
- `POST /api/site/add-review` - Add review (Public)
- `GET /api/site/get-review` - Get reviews (Public)
- `DELETE /api/site/delete-review/:id` - Delete review (Admin only)

#### Gallery
- `POST /api/site/add-gallery` - Add gallery (Admin only)
  - Middleware: `islogin`, `isAdmin`
  - Body: Form data with multiple `image` files (up to 30)
  - Fields: `title`, `location`, `date`, `branch_id`, `staff_id`

- `GET /api/site/get-gallery` - Get gallery (Public)
- `DELETE /api/site/delete-gallery/:id` - Delete gallery (Admin only)

#### Trusted Customers
- `POST /api/site/add-trustedcustomers` - Add trusted customer (Admin only)
  - Middleware: `islogin`, `isAdmin`
  - Body: Form data with `image` file
- `GET /api/site/get-trustedCustomers` - Get trusted customers (Public)

### Staff Management (`/api/staff`)

- `POST /api/staff/add-staff` - Add staff (Authenticated)
  - Middleware: `islogin`
  - Body: Form data with `image` file
  - Fields: `branch_id`, `name`, `email`, `phone`, `address`, `password`, `role`

- `GET /api/staff/get-staff` - Get staff (Authenticated)
  - Middleware: `islogin`

- `DELETE /api/staff/delete-staff/:id` - Delete staff (Admin only)
  - Middleware: `islogin`, `isAdmin`

- `PATCH /api/staff/edit-staff/:id` - Edit staff (Authenticated)
  - Middleware: `islogin`

## 🔐 Authentication & Authorization

### Middleware

- **`islogin`**: Verifies JWT token from HTTP-only cookie
  - Attaches user info to `req.user`
  - User object contains: `id`, `email`, `role`, `branch_id`

- **`isAdmin`**: Checks if user role is "admin"
  - Must be used after `islogin` middleware

### Role-Based Access

- **Admin**: Full access to all endpoints
- **Manager**: Access to their branch's data
- **Staff**: Limited access based on branch assignment

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mysql2` - MySQL client
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `multer` - File upload handling
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `redux` / `@reduxjs/toolkit` - State management
- `tailwindcss` - CSS framework
- `vite` - Build tool

## 📝 Notes

- File uploads are stored in the `backend/uploads/` directory
- JWT tokens are stored in HTTP-only cookies for security
- Passwords are hashed using bcrypt
- The database schema supports hierarchical location structure (Province → District → Branch)
- Image cleanup is handled automatically on failed uploads

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check `.env` file has correct database credentials
- Ensure database `Angan_sewa` exists

### Authentication Issues
- Verify `SECRET_KEY` is set in `.env`
- Check cookie settings in browser
- Ensure token hasn't expired

### File Upload Issues
- Check `uploads/` directory exists and has write permissions
- Verify multer configuration matches expected field names

## 📄 License

ISC

## 👤 Author

Ashim Poudel

---

For more information or issues, please contact the development team.

