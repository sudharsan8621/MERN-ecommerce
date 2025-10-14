# MERN E-Commerce Application

Full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

## 🚀 Features

- User authentication (JWT)
- Product catalog with search and filters
- Shopping cart and checkout
- Order management
- Wishlist functionality
- Dark mode support
- Responsive design
- Admin dashboard (coming soon)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- Redux Toolkit for state management
- React Router v6
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Git

### Clone repository
```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce

Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run seed
npm run dev


Frontend Setup
cd frontend
npm install
npm run dev



Live Demo
Frontend: [Vercel URL]
Backend: [Render URL]


Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret



Frontend (.env)
VITE_API_URL=your_backend_url


Author
Sudharsan M G