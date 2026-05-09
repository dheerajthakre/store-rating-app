### FullStack Intern Coding Challenge
A full-stack Store Rating Platform built using React, Node.js, Express.js, and PostgreSQL.

This platform supports three different roles:
- Admin
- Normal User
- Store Owner

### Tech Stack
## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
## Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs
- express-validator

### Installation Guide
## Clone Repository
- git clone <your-repository-url>
- cd <repository-name>

## Backend Setup
- cd backend
- npm install
- Create .env File
- PORT=4000
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=your_password
- DB_NAME=your_name
- JWT_SECRET=your_secret_key

## Start Backend
- npm start
Backend runs on:
http://localhost:4000

## Frontend Setup
- cd frontend
- npm install
- Create .env File
- API_URL= http://localhost:4000/api/admin
- BASE_URL= http://localhost:4000/api
  
## Start Frontend
- npm run dev
Frontend runs on:
http://localhost:3000

## Validation Rules
## - Password Rules
- Minimum 8 characters
- Maximum 16 characters
- Must contain:
  - One uppercase letter
  - One special character
## Name Rules
- 20 to 60 characters
## Address Rules
- Maximum 400 characters
