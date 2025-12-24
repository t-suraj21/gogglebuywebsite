# EyeWear Backend API

A complete REST API backend for the EyeWear e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with category filtering
- **Shopping Cart & Orders**: Order placement and tracking system
- **Admin Dashboard**: User and product management, order statistics
- **MongoDB Integration**: NoSQL database for scalable data storage
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Configured for frontend communication

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository and navigate to backend folder:**
   ```bash
   cd /Users/surajkumar/Desktop/p1/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env file with your configuration:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eyewear
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

## 🗄️ Database Setup

### Option 1: Local MongoDB
Make sure MongoDB is running locally on port 27017.

### Option 2: MongoDB Atlas (Cloud)
Replace `MONGODB_URI` in .env with your MongoDB Atlas connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/eyewear?retryWrites=true&w=majority
```

### Seed Sample Data
```bash
npm run seed
```

This will populate the database with sample products and users.

## 🚀 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (requires auth)
- `PUT /profile` - Update user profile (requires auth)

### Products (`/api/products`)
- `GET /` - Get all products (with filtering)
- `GET /:id` - Get single product
- `GET /category/:category` - Get products by category
- `POST /` - Add product (Admin only)
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Orders (`/api/orders`)
- `POST /` - Place new order (requires auth)
- `GET /user/:userId` - Get user orders (requires auth)
- `GET /:id` - Get single order (requires auth)
- `PUT /:id/status` - Update order status (Admin only)
- `GET /` - Get all orders (Admin only)

### Admin (`/api/admin`)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id/role` - Update user role
- `DELETE /users/:id` - Delete user
- `GET /products/stats` - Get product statistics
- `GET /orders/stats` - Get order statistics
- `GET /dashboard` - Get dashboard data

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## 📦 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   └── Order.js             # Order schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product routes
│   ├── orders.js            # Order routes
│   └── admin.js             # Admin routes
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── seed.js                  # Database seeding script
└── server.js                # Main server file
```

## 📝 Sample Request/Response

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Place Order
```bash
POST http://localhost:5000/api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "name": "Premium Classic Aviator",
      "price": 2499,
      "quantity": 2,
      "image": "/Image/1.jpeg"
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "payment": {
    "method": "card",
    "lastFourDigits": "4242"
  },
  "subtotal": 4998,
  "tax": 499.8,
  "shipping": 0,
  "total": 5497.8
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify firewall settings for port 27017

### CORS Errors
- Verify frontend URL is in CORS whitelist in server.js
- Check frontend making requests to correct backend URL

### JWT Errors
- Ensure token is properly formatted in Authorization header
- Check token expiration (default 7 days)
- Verify JWT_SECRET is same in .env

## 🔄 Development

To add new features:

1. Create new route file in `routes/`
2. Create corresponding models in `models/`
3. Add authentication middleware if needed
4. Update server.js to include new routes
5. Test with frontend

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Support

For issues and questions, please refer to the main project repository.
