# 👓 Goggle Buy - Full Stack E-Commerce Platform

A modern, production-ready eyewear e-commerce platform built with React, Node.js, Express, and MongoDB. Complete user authentication, product management, shopping cart, order tracking, and admin dashboard.

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** December 24, 2025

## ✨ Key Features

### 🛍️ Customer Features
- ✅ **User Authentication** - Sign up, login, logout with JWT tokens
- ✅ **Session Persistence** - Automatic session restoration on page refresh
- ✅ **Product Catalog** - Browse eyeglasses, sunglasses, contact lenses, computer glasses
- ✅ **Search & Filter** - Find products by category, price, rating
- ✅ **Product Details** - View detailed information with ratings and reviews
- ✅ **Shopping Cart** - Add/remove items, manage quantities
- ✅ **Checkout** - Secure order placement with address management
- ✅ **Order Tracking** - Track past orders and real-time status
- ✅ **User Profile** - Manage account, passwords, addresses
- ✅ **Responsive Design** - Perfect on desktop, tablet, and mobile
- ✅ **Page Transitions** - Smooth animations between pages
- ✅ **Splash Screen** - Welcome screen on first visit only
- ✅ **Modal Authentication** - Login/register without navigation

### 🔐 Security Features
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT-based authentication (7-day expiry)
- ✅ Protected routes and API endpoints
- ✅ Secure token storage in localStorage
- ✅ Input validation (frontend & backend)
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ Email uniqueness validation

### 👨‍💼 Admin Features
- ✅ **Admin Dashboard** - Sales overview, statistics, analytics
- ✅ **Product Management** - Add, edit, delete products
- ✅ **Order Management** - View, filter, update order statuses
- ✅ **User Management** - View and manage customer accounts
- ✅ **Analytics** - Track sales, popular products, revenue
- ✅ **Role-based Access** - Only admins can access admin routes

### ⚡ Performance & UX Features
- ✅ **Session Persistence** - Stay logged in after page refresh
- ✅ **Loading States** - Beautiful loading indicators
- ✅ **Error Handling** - Clear, helpful error messages
- ✅ **Database Validation** - Server-side validation for data integrity
- ✅ **Code Splitting** - Fast initial load with lazy loading
- ✅ **Toast Notifications** - Real-time user feedback
- ✅ **Optimized Images** - Responsive image loading
- ✅ **Accessibility** - WCAG 2.1 compliant

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool (< 100ms)
- **Redux Toolkit** - Centralized state management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Lightweight HTTP client
- **React Icons** - Icon library
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemon** - Development auto-reload
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
gogglebuywebsite/
├── backend/                    # Node.js server
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── upload.js          # File upload handling
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   └── Order.js           # Order schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── orders.js          # Order routes
│   │   └── admin.js           # Admin routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express app setup
│   ├── seed.js                # Database seeding
│   └── package.json           # Dependencies
│
├── EyeWear/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthInitializer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Admin/
│   │   ├── redux/
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── productSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file with:**
   ```env
   PORT=8001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/eyewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   🚀 Server running at: http://localhost:8001
   ✅ MongoDB connection successful
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd EyeWear
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   ➜  Local: http://localhost:5173
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 📝 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=8001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/eyewear

# Authentication
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRY=7d

# File Upload
UPLOAD_DIR=public/uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8001/api
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `POST /api/auth/change-password` - Change password (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order details (Protected)
- `POST /api/orders` - Create order (Protected)
- `PUT /api/orders/:id` - Update order (Admin)

### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/products` - Get all products (Admin)
- `GET /api/admin/orders` - Get all orders (Admin)
- `GET /api/admin/stats` - Get analytics (Admin)

## 💻 Available Scripts

### Backend
```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔐 Authentication Flow

1. **Registration:**
   - User submits registration form
   - Frontend validates input
   - Backend validates and hashes password
   - User saved to MongoDB
   - JWT token generated and returned
   - Frontend stores token in localStorage
   - User auto-redirected to home

2. **Login:**
   - User enters email and password
   - Backend verifies credentials
   - JWT token generated
   - Token stored in localStorage
   - User redirected to home

3. **Session Persistence:**
   - On page load, AuthInitializer checks localStorage
   - If token exists, fetches user profile from `/api/auth/me`
   - Redux state updated with user data
   - User stays logged in

4. **Logout:**
   - Token removed from localStorage
   - Redux state cleared
   - Page redirects to home

## 🛒 Shopping Flow

1. **Browse Products**
   - View products by category
   - Search and filter products
   - View product details

2. **Add to Cart**
   - Click "Add to Cart" button
   - Select quantity
   - Item added to Redux cart state

3. **Checkout**
   - Review cart items
   - Enter shipping address
   - Complete order
   - Order saved to MongoDB

4. **Order Tracking**
   - View order history
   - Track order status
   - View order details

## 🎨 Customization

### Colors & Styling
Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Product Categories
Modify product categories in `EyeWear/src/data/products.js`

### Admin Features
Customize admin dashboard in `EyeWear/src/pages/Admin/`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] Browse products
- [ ] Search and filter
- [ ] Add items to cart
- [ ] Proceed to checkout
- [ ] Complete order
- [ ] View order history
- [ ] Logout and login again
- [ ] Refresh page and stay logged in
- [ ] Test admin features

### API Testing
Use curl or Postman to test endpoints:

```bash
# Register
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get current user (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8001/api/auth/me
```

## 🚨 Troubleshooting

### Backend Issues

**Port 8001 already in use:**
```bash
# Kill process using port
lsof -i :8001 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
```

**MongoDB connection failed:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB credentials

**JWT_SECRET not set:**
- Ensure .env file exists
- Check JWT_SECRET is configured
- Restart server after .env changes

### Frontend Issues

**Blank page after login:**
- Clear browser cache
- Check browser console for errors
- Verify backend is running
- Check API endpoint in `services/api.js`

**Image upload not working:**
- Check file size limits
- Verify backend `/uploads` directory exists
- Check CORS configuration

**Session not persisting:**
- Clear localStorage and try again
- Check AuthInitializer component
- Verify token expiry time

## 📦 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables on hosting platform
2. Configure MongoDB Atlas connection
3. Deploy using Git or CLI

### Frontend Deployment (Vercel/Netlify)
1. Set VITE_API_URL to production backend URL
2. Build: `npm run build`
3. Deploy dist folder

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./EyeWear/README.md)
- [API Documentation](./API_DOCS.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Code Style

- Use ESLint for JavaScript
- Follow Tailwind CSS conventions
- Use functional components in React
- Use Redux for complex state management

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Hash passwords with bcryptjs
- ✅ Validate all user input
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@gogglebuy.com or open an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Real-time inventory tracking
- [ ] Product reviews and ratings system
- [ ] Wishlist feature
- [ ] Social login (Google, Facebook)
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Recommendation engine
- [ ] Augmented reality (AR) try-on

## 🙏 Acknowledgments

- Tailwind CSS for styling
- MongoDB for database
- Vite for fast bundling
- React community for amazing tools

---

**Made with ❤️ by the Goggle Buy Team**

Last Updated: December 24, 2025
