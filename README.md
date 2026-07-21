# 🚀 Job Portal - MERN Stack

A full-stack Job Portal web application built using the MERN Stack that connects job seekers with recruiters. Recruiters can post jobs, manage applications, and companies, while students can browse and apply for jobs.

---

## 🌐 Live Demo

Live Link -: https://job-portal-2-1eaf.onrender.com/

---

# 📌 Features

## 👨‍🎓 Student

- User Registration & Login
- JWT Authentication
- Browse Available Jobs
- Search Jobs
- Apply for Jobs
- View Applied Jobs
- Update Profile
- Upload Resume
- Upload Profile Picture

---

## 🏢 Recruiter

- Recruiter Registration & Login
- Company Management
- Create Job Posts
- Update Job Posts
- View Applicants
- Accept/Reject Applications
- Recruiter Dashboard

---

## 🔐 Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Cookie-based Authentication
- Protected Routes
- Role-Based Access Control

---

## ☁️ Cloudinary Integration

- Resume Upload
- Profile Image Upload
- Secure Cloud Storage
- Automatic File Optimization

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Shadcn UI
- Lucide Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Multer
- Cloudinary
- bcryptjs
- Cookie Parser
- CORS

---

# 📂 Project Structure

```
Job-Portal
│
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   ├── config
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── redux
│   │   ├── utils
│   │   ├── assets
│   │   └── App.jsx
│   │
│   ├── public
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/job-portal.git
```

```bash
cd job-portal
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_secret_key

CLOUD_NAME=your_cloudinary_cloud_name

API_KEY=your_cloudinary_api_key

API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Run Frontend

```bash
npm run dev
```

---

# 🌍 Environment Variables

## Backend

| Variable | Description |
|----------|-------------|
| PORT | Backend Port |
| MONGO_URI | MongoDB Atlas Connection String |
| SECRET_KEY | JWT Secret |
| CLOUD_NAME | Cloudinary Cloud Name |
| API_KEY | Cloudinary API Key |
| API_SECRET | Cloudinary API Secret |
| CLIENT_URL | Frontend URL |

---

## Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

# 🚀 Deployment

## Frontend

Deploy on **Render Static Site**

Build Command

```bash
npm run build
```

Publish Directory

```
dist
```

---

## Backend

Deploy on **Render Web Service**

Build Command

```bash
npm install
```

Start Command

```bash
npm start
```

---

# 🔒 Authentication Flow

```
User Login
      │
      ▼
Backend verifies credentials
      │
      ▼
JWT Generated
      │
      ▼
Cookie Sent
      │
      ▼
Protected Routes
```

---

# 📸 Screenshots

## Home Page

_Add screenshot here_

## Login Page

_Add screenshot here_

## Recruiter Dashboard

_Add screenshot here_

## Student Dashboard

_Add screenshot here_

---

# 📈 Future Improvements

- Email Verification
- Forgot Password
- Google Authentication
- Admin Dashboard
- Real-Time Notifications
- Interview Scheduling
- AI Resume Screening
- Chat System
- Company Reviews
- Dark Mode

---

# 🤝 Contributing

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Aditya Ghadge**

GitHub: https://github.com/adityaghadge-ai

LinkedIn: www.linkedin.com/in/aditya-ghadge-a52648320

---

⭐ If you found this project useful, consider giving it a star on GitHub!
