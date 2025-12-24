# 🚀 Goggle Buy Backend API

Express.js REST API for the Goggle Buy eyewear e-commerce platform. Handles user authentication, product management, orders, and admin operations with MongoDB database.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ User authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ MongoDB integration with Mongoose
- ✅ Protected routes with auth middleware
- ✅ Admin functionality
- ✅ Order management
- ✅ Product management
- ✅ File upload handling
- ✅ CORS enabled
- ✅ Detailed error logging
- ✅ Input validation
- ✅ Session persistence

## 🛠️ Tech Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **File Upload:** Multer
- **Middleware:** CORS, Express-json
- **Development:** Nodemon
- **Environment:** dotenv

## 📦 Installation

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Steps

1. **Navigate to backend directory:**
   ```bash
   cd gogglebuywebsite/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration) section)

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend root directory with:

```env
# Server
PORT=8001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/eyewear
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eyewear

# Authentication
JWT_SECRET=your-super-secret-key-here-change-in-production
JWT_EXPIRY=7d

# File Upload
UPLOAD_DIR=public/uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Important Notes

- **Never commit `.env` to version control** - Add to `.gitignore`
- Change `JWT_SECRET` in production to a strong random string
- MongoDB URI format: `mongodb://localhost:27017/database-name`
- CORS_ORIGIN should match your frontend URL

### MongoDB Setup

**Local MongoDB:**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Verify it's running
mongo --eval "db.adminCommand('ping')"
```

**MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Add connection string to MONGODB_URI in .env

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

**Expected Output:**
```
🔧 Configuration:
   JWT_SECRET: ✅ Set
   MongoDB URI: mongodb://localhost:27017/eyewear
   NODE_ENV: development

🔌 Connecting to MongoDB...
✅ MongoDB connection successful

🚀 ════════════════════════════════════════════════════════
   Server running at: http://localhost:8001
   API Base URL: http://localhost:8001/api
   Environment: development
════════════════════════════════════════════════════════
```

### Production Mode

```bash
npm start
```

### Testing Server Health

```bash
curl http://localhost:8001/api/health
```

**Response:**
```json
{"status": "OK", "message": "Server is running"}
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── upload.js           # File upload handling
├── models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   └── Order.js            # Order schema
├── routes/
│   ├── auth.js             # Authentication endpoints
│   ├── products.js         # Product endpoints
│   ├── orders.js           # Order endpoints
│   └── admin.js            # Admin endpoints
├── public/
│   └── uploads/            # Uploaded files
├── .env                    # Environment variables (not in repo)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── server.js               # Express app setup
├── seed.js                 # Data seeding script (optional)
├── package.json            # Dependencies
└── README.md               # This file
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:8001/api
```

### Health Check

```
GET /health
```

Returns server status.

### Authentication Routes `/api/auth`

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation Errors (400):**
- Missing required fields
- Invalid email format
- Password too short (min 6 chars)
- Password mismatch
- Email already registered

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "9876543210",
    "address": { ... }
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "_id": "507f...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "createdAt": "2025-12-24T10:00:00Z",
  "updatedAt": "2025-12-24T10:00:00Z"
}
```

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "9876543210",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

#### Change Password
```
POST /api/auth/change-password
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

### Product Routes `/api/products`

#### Get All Products
```
GET /api/products?category=eyeglasses&minPrice=1000&maxPrice=5000
```

**Query Parameters:**
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `page` - Page number (pagination)
- `limit` - Items per page

**Response (200):** Array of products

#### Get Product by ID
```
GET /api/products/:id
```

**Response (200):** Product object

#### Create Product (Admin)
```
POST /api/products
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Premium Aviator",
  "brand": "Classic",
  "price": 2999,
  "offer": 20,
  "category": "aviator",
  "description": "Classic aviator design",
  "inStock": true,
  "stock": 50
}
```

#### Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 3499
}
```

#### Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer ADMIN_TOKEN
```

### Order Routes `/api/orders`

#### Get User Orders
```
GET /api/orders
Authorization: Bearer TOKEN
```

Returns all orders for logged-in user.

#### Get Order Details
```
GET /api/orders/:id
Authorization: Bearer TOKEN
```

#### Create Order
```
POST /api/orders
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "items": [
    {
      "productId": "507f...",
      "quantity": 2,
      "price": 2999
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "totalPrice": 5998
}
```

#### Update Order (Admin)
```
PUT /api/orders/:id
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "shipped"
}
```

**Status Options:**
- pending
- processing
- shipped
- delivered
- cancelled

### Admin Routes `/api/admin`

#### Get All Users
```
GET /api/admin/users
Authorization: Bearer ADMIN_TOKEN
```

#### Get All Products
```
GET /api/admin/products
Authorization: Bearer ADMIN_TOKEN
```

#### Get All Orders
```
GET /api/admin/orders
Authorization: Bearer ADMIN_TOKEN
```

#### Get Analytics
```
GET /api/admin/stats
Authorization: Bearer ADMIN_TOKEN
```

## 📊 Database Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required, 2+ chars),
  email: String (required, unique, email format),
  password: String (required, hashed, 6-128 chars),
  confirmPassword: String (required at registration),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  brand: String,
  price: Number (required),
  offer: Number (percentage discount),
  originalPrice: Number,
  rating: Number (0-5),
  reviews: Number,
  images: [String],
  category: String,
  description: String,
  inStock: Boolean (default: true),
  stock: Number (inventory count),
  addedBy: ObjectId (User reference),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (required, User reference),
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered']),
  paymentStatus: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Middleware

### Authentication Middleware
```javascript
import { auth, adminAuth } from './middleware/auth.js';

// Protect route with user auth
router.get('/protected-route', auth, handler);

// Protect route with admin auth only
router.get('/admin-route', adminAuth, handler);
```

**How it works:**
1. Extracts JWT from `Authorization: Bearer TOKEN` header
2. Verifies token signature and expiry
3. Attaches user data to `req.user`
4. Calls next() or returns 401 Unauthorized

### File Upload Middleware
```javascript
import { upload } from './middleware/upload.js';

// Single file upload
router.post('/upload', upload.single('file'), handler);

// Multiple files
router.post('/uploads', upload.array('files', 10), handler);
```

**File size limits:** 5MB per file

## ❌ Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error message (development only)",
  "status": 400
}
```

### Common Error Codes

| Code | Error | Cause |
|------|-------|-------|
| 400  | Bad Request | Invalid input or missing fields |
| 401  | Unauthorized | Invalid token or not logged in |
| 403  | Forbidden | Admin access required |
| 404  | Not Found | Resource doesn't exist |
| 409  | Conflict | Email already registered |
| 500  | Internal Server Error | Server error |

### Example Errors

**Missing Fields (400):**
```json
{
  "message": "All fields are required"
}
```

**Invalid Email (400):**
```json
{
  "message": "Please enter a valid email address"
}
```

**Email Already Registered (409):**
```json
{
  "message": "Email already registered"
}
```

**Invalid Token (401):**
```json
{
  "message": "Invalid token"
}
```

## 🧪 Testing

### Manual Testing with curl

#### Register User
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Current User (Protected)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8001/api/auth/me
```

#### Create Product (Admin)
```bash
curl -X POST http://localhost:8001/api/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Aviator",
    "price": 2999,
    "category": "aviator"
  }'
```

### Using Postman

1. Import endpoints into Postman
2. Create environment for `BASE_URL` and `TOKEN`
3. Use pre-request script to auto-fill token
4. Test each endpoint systematically

## 🚀 Deployment

### Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set MONGODB_URI=your-mongodb-url
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Railway

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Auto-deploy on push

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t eyewear-api .
docker run -p 8001:8001 eyewear-api
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token validation on protected routes
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Rate limiting ready (middleware can be added)
- ✅ Secure password requirements
- ✅ Token expiry (7 days by default)
- ✅ Admin role verification
- ✅ Environment variables for secrets
- ✅ No sensitive data in logs

## 📈 Performance Optimization

- MongoDB indexes on frequently queried fields
- Selective field retrieval in queries
- Password field excluded from user responses by default
- Connection pooling with MongoDB
- Efficient middleware ordering

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly with curl or Postman
4. Create a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Troubleshooting

### "Port 8001 already in use"
```bash
lsof -i :8001
kill -9 <PID>
```

### "MongoDB connection failed"
- Check MongoDB is running: `ps aux | grep mongod`
- Verify MONGODB_URI in .env
- Check network connectivity to MongoDB Atlas

### "JWT_SECRET not set"
- Ensure .env file exists in backend root
- Restart server after changes
- Check .env syntax (no extra quotes or spaces)

### "CORS error: Access-Control-Allow-Origin"
- Verify CORS_ORIGIN in .env
- Check frontend URL exactly matches
- Restart backend server

### "401 Unauthorized on protected routes"
- Ensure token is being sent in Authorization header
- Check token format: `Authorization: Bearer TOKEN`
- Verify token hasn't expired
- Check JWT_SECRET matches between token generation and verification

---

**Last Updated:** December 24, 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

## 🎉 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create and configure .env
cp .env.example .env
# Edit .env with your configuration

# 3. Start MongoDB
# Local: brew services start mongodb-community
# Cloud: Use MongoDB Atlas connection string

# 4. Start server
npm run dev

# 5. Test health endpoint
curl http://localhost:8001/api/health
```

Ready to power your eyewear e-commerce platform! 👓
