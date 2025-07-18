# E-Commerce Web Application

A full-stack e-commerce web application with user and admin features, built with Node.js, Express, MongoDB, React, Redux, and Tailwind CSS.

## Features

### User Features
- User registration, login, and logout (JWT-based authentication)
- View and update user profile
- Browse products by category, search, and filter
- View detailed product information
- Add, update, and remove products from shopping cart
- View cart and checkout
- Responsive, modern UI/UX

### Admin Features
- Admin panel with dashboard
- Manage all users (view, update roles)
- Manage all products (add, update, delete)
- View all orders (if implemented)

### General
- Role-based access control (user/admin)
- Toast notifications and loading skeletons
- Cloudinary integration for product image uploads
- State management with Redux
- Context API for global state (cart, user)

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary
- **Frontend:** React, Vite, Redux, Tailwind CSS, React Router

## Project Structure
- `/server` - Express backend (API, authentication, product & user management)
- `/client` - React frontend (UI, state management, routing)

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB instance (local or cloud)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mdmonauwarulislam/E-Commerce-Web-Application
   cd E-Commerce-Web-Application
   ```

2. **Backend setup:**
   ```bash
   cd server
   npm install
   # Create a .env file with your MongoDB URI, JWT secret, and Cloudinary credentials
   npm start
   ```

3. **Frontend setup:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the app:**
   - Frontend: `http://localhost:5173` (default Vite port)
   - Backend API: `http://localhost:8080` (default Express port)

## License

MIT
