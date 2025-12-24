# 👁️ Goggle Buy - Frontend Application

A modern, responsive e-commerce platform for eyewear built with React, Redux Toolkit, and Tailwind CSS. Features real-time authentication, product browsing, shopping cart management, and order tracking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Components](#components)
- [Pages](#pages)
- [State Management](#state-management)
- [Styling](#styling)
- [Authentication Flow](#authentication-flow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ Persistent sessions with automatic restoration
- ✅ Profile management and address settings
- ✅ Password change functionality
- ✅ Browse eyewear products by category
- ✅ Product search and filtering
- ✅ Product details with ratings and reviews
- ✅ Add to cart and wishlist
- ✅ Checkout process
- ✅ Order tracking and history
- ✅ Responsive design (mobile, tablet, desktop)

### Admin Features
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ User management
- ✅ Order management
- ✅ Sales analytics

### UI/UX Features
- ✅ Splash screen (first visit only)
- ✅ Smooth page transitions
- ✅ Loading states with spinner
- ✅ Toast notifications
- ✅ Modal-based authentication
- ✅ Product popup previews
- ✅ Animations and transitions
- ✅ Dark mode ready

## 🛠️ Tech Stack

**Frontend:**
- React 18.x - UI library
- Vite - Fast build tool
- Redux Toolkit - State management
- Tailwind CSS - Utility-first styling
- React Router v6 - Routing
- Axios - HTTP client
- React Icons - Icon library
- React Hot Toast - Notifications

**Build & Dev:**
- Vite - Build tool and dev server
- ESLint - Code linting
- PostCSS - CSS processing
- Tailwind CSS - CSS framework

**Deployment:**
- Vercel - Hosting platform
- Environment variables for configuration

## 📦 Installation

### Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/gogglebuywebsite.git
   cd gogglebuywebsite/EyeWear
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables:**
   ```
   VITE_API_URL=http://localhost:8001/api
   VITE_APP_NAME=Goggle Buy
   VITE_JWT_EXPIRY=7d
   ```

## 📁 Project Structure

```
EyeWear/
├── src/
│   ├── components/              # Reusable components
│   │   ├── AdminMenu.jsx
│   │   ├── AdminMenuWrapper.jsx
│   │   ├── AuthModal.jsx        # Login/Register modal
│   │   ├── AuthInitializer.jsx  # Session restoration
│   │   ├── FilterSidebar.jsx
│   │   ├── Loader.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx   # Auth protected routes
│   │   ├── RatingStars.jsx
│   │   └── PageTransition.jsx
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Eyeglasses.jsx
│   │   ├── Sunglasses.jsx
│   │   ├── ComputerGlasses.jsx
│   │   ├── ContactLenses.jsx
│   │   ├── KidsGlasses.jsx
│   │   ├── HalfRimFrames.jsx
│   │   ├── RimlessFrames.jsx
│   │   ├── Deals.jsx
│   │   └── Admin/               # Admin pages
│   │       ├── Dashboard.jsx
│   │       ├── Products.jsx
│   │       ├── Users.jsx
│   │       ├── Orders.jsx
│   │       ├── EditHome.jsx
│   │       └── EditLinks.jsx
│   ├── redux/                   # State management
│   │   ├── store.js            # Redux store
│   │   ├── authSlice.js        # Auth state
│   │   ├── cartSlice.js        # Cart state
│   │   ├── productSlice.js     # Product state
│   │   └── hooks.js            # Custom hooks
│   ├── services/                # API services
│   │   └── api.js              # Axios instance & API calls
│   ├── utils/                   # Utility functions
│   │   └── authCheck.js        # Auth helpers
│   ├── data/                    # Static data
│   │   └── products.js
│   ├── assets/                  # Images, fonts
│   ├── splash/                  # Splash screen
│   │   └── SplashScreen.jsx
│   ├── App.jsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global CSS
├── public/                      # Static files
│   ├── Image/                   # Product images
│   └── videos/
├── .env.local                   # Environment config
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── package.json                # Dependencies
├── index.html                  # HTML template
└── README.md                   # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8001/api

# App Configuration
VITE_APP_NAME=Goggle Buy
VITE_JWT_EXPIRY=7d

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
```

### For Production:

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Goggle Buy
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output directory: `dist/`

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 🎯 Components Overview

### AuthInitializer
**Purpose:** Initialize user authentication state on app load

**Features:**
- Checks localStorage for JWT token
- Restores user session from token
- Shows loading spinner during initialization
- Prevents flash of unauthenticated content

```jsx
import AuthInitializer from './components/AuthInitializer';

<AuthInitializer>
  <Routes>
    {/* Your routes */}
  </Routes>
</AuthInitializer>
```

### AuthModal
**Purpose:** Modal dialog for login and registration

**Props:**
```javascript
{
  isOpen: boolean,
  onClose: function,
  initialTab: 'login' | 'register'
}
```

### ProtectedRoute
**Purpose:** Wrap routes that require authentication

**Features:**
- Shows AuthModal instead of redirecting
- Seamless authentication flow
- Prevents unauthorized access

```jsx
<ProtectedRoute>
  <CheckoutPage />
</ProtectedRoute>
```

### FilterSidebar
**Purpose:** Product filtering by category and price

**Features:**
- Category selection
- Price range filtering
- Real-time updates

### ProductCard
**Purpose:** Display product in grid/list format

**Props:**
```javascript
{
  product: Product,
  onAddToCart: function,
  onQuickView: function
}
```

## 📄 Pages

### Home Page
- Featured products carousel
- Product categories
- Search functionality
- Special deals banner
- Responsive grid layout

### Product Listing Pages
- Eyeglasses, Sunglasses, Computer Glasses, Contact Lenses, Kids Glasses, Half-Rim Frames, Rimless Frames
- **Features:** Filter sidebar, sorting, pagination, grid view

### Product Details
- Product images gallery
- Price and offer details
- Customer ratings and reviews
- Add to cart / Buy now buttons
- Similar products section

### Cart Page
- View all cart items
- Update quantities
- Remove items
- Apply coupon codes
- Proceed to checkout

### Checkout
- Shipping address selection
- Payment method selection
- Order summary
- Order placement
- Success confirmation

### Profile Page
- User information display
- Edit profile form
- Address management
- Password change
- Account settings

### Orders Page
- Order history list
- Order details
- Order tracking
- Return/Cancel options

### Admin Dashboard
- Sales analytics
- User management
- Product management
- Order management
- System settings

## 🔄 State Management

Using Redux Toolkit with async thunks for API calls:

### authSlice
```javascript
// State
{
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false
}

// Actions
registerUser(payload)
loginUser(payload)
logout()
fetchUserProfile()
updateUserProfile(payload)
changePassword(payload)
clearError()
clearSuccess()
```

### cartSlice
```javascript
// State
{
  items: [],
  totalPrice: 0,
  totalItems: 0,
  shippingAddress: null
}

// Actions
addToCart(product)
removeFromCart(productId)
updateQuantity(productId, quantity)
clearCart()
setShippingAddress(address)
```

### productSlice
```javascript
// State
{
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: null,
    priceRange: [0, 10000]
  }
}

// Actions
fetchProducts()
filterProducts(filters)
searchProducts(query)
setSelectedProduct(product)
```

## 🎨 Styling

### Tailwind CSS

- Utility-first CSS framework
- Responsive design with breakpoints (sm, md, lg, xl, 2xl)
- Predefined color palette
- Custom configuration in `tailwind.config.js`

### Custom CSS

Global styles in `index.css` and component-specific styles in `App.css`

### Responsive Breakpoints

```javascript
// Mobile First
sm: 640px   // Tablets
md: 768px   // Small laptops
lg: 1024px  // Desktops
xl: 1280px  // Large screens
2xl: 1536px // Extra large screens
```

## 🔐 Authentication Flow

### Registration Flow
1. User fills registration form
2. Frontend validates input
3. Submits to `/api/auth/register`
4. Backend hashes password and saves to MongoDB
5. JWT token returned and stored in localStorage
6. AuthInitializer restores session on next visit
7. User redirected to home page

### Login Flow
1. User enters email and password
2. Submits to `/api/auth/login`
3. Backend validates credentials
4. JWT token returned and stored in localStorage
5. Session restored automatically
6. User redirected to previous page or home

### Session Persistence
1. App loads, AuthInitializer component mounts
2. Checks localStorage for JWT token
3. If token exists, calls `/api/auth/me`
4. Backend validates token and returns user data
5. Redux state updated with user information
6. User remains logged in across page refreshes

### Logout
1. User clicks logout
2. Redux clears user state
3. localStorage token removed
4. User redirected to home page
5. ProtectedRoute shows AuthModal on protected page access

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register new account with valid data
- [ ] Register with invalid email format
- [ ] Register with password mismatch
- [ ] Login with correct credentials
- [ ] Login with incorrect password
- [ ] Session persists after page refresh
- [ ] Logout clears session
- [ ] Protected routes show auth modal

#### Shopping
- [ ] Browse products by category
- [ ] Search for products
- [ ] Filter products by price
- [ ] View product details
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] Proceed to checkout
- [ ] Place order
- [ ] View order history

#### Profile
- [ ] View user profile
- [ ] Edit profile information
- [ ] Update shipping address
- [ ] Change password
- [ ] View saved addresses

#### Admin
- [ ] Access admin dashboard
- [ ] Add new product
- [ ] Edit product
- [ ] Delete product
- [ ] View all users
- [ ] View all orders
- [ ] Update order status

### Testing with Browser DevTools

1. **Check localStorage:**
   ```javascript
   // In browser console
   localStorage.getItem('token')
   localStorage.getItem('user')
   ```

2. **Check Redux state:**
   - Install Redux DevTools extension
   - Monitor state changes in real-time

3. **Check Network tab:**
   - Verify API requests
   - Check response status codes
   - Verify headers (Authorization token)

## 🚀 Deployment

### Deploy to Vercel

1. **Connect GitHub repository:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard:**
   - VITE_API_URL = your-backend-url

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Connect repository to Netlify**

3. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set environment variables in Netlify dashboard**

### GitHub Pages (Static hosting)

```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 📊 Performance Optimization

- ✅ Code splitting with React Router
- ✅ Lazy loading of routes
- ✅ Image optimization
- ✅ CSS purging with Tailwind
- ✅ Minification and bundling with Vite
- ✅ Caching strategies
- ✅ Redux memoization

## 🔒 Security Practices

- ✅ JWT tokens stored in localStorage
- ✅ Password validation on frontend and backend
- ✅ Environment variables for sensitive data
- ✅ No password stored in state
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Protected API calls with auth header

## 🐛 Troubleshooting

### "Cannot GET /api/..."
**Problem:** Backend API not running or wrong URL

**Solution:**
```bash
# Make sure backend is running
cd backend
npm start

# Check VITE_API_URL in .env.local
# Default: http://localhost:8001/api
```

### "Token is invalid or expired"
**Problem:** JWT token expired or tampered with

**Solution:**
- Login again to get new token
- Clear browser localStorage: `localStorage.clear()`

### "CORS error: Access-Control-Allow-Origin"
**Problem:** Frontend and backend have mismatched origins

**Solution:**
- Check backend CORS configuration
- Ensure VITE_API_URL matches backend origin
- Restart both frontend and backend

### "Blank page on load"
**Problem:** JavaScript error or build issue

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### "Products not loading"
**Problem:** API endpoint not responding

**Solution:**
- Check backend health: `curl http://localhost:8001/api/health`
- Check browser network tab for API errors
- Verify database connection in backend logs

### "Build fails with TypeScript errors"
**Problem:** Type checking issues

**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# Fix TypeScript issues in src files
# Or disable type checking temporarily in tsconfig.json
```

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint

# Package management
npm install          # Install dependencies
npm update           # Update dependencies
npm outdated         # Check outdated packages

# Git
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@gogglebuy.com
- Documentation: https://docs.gogglebuy.com

---

**Last Updated:** December 24, 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

## 🎉 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
echo 'VITE_API_URL=http://localhost:8001/api' > .env.local

# 3. Start backend (in another terminal)
cd ../backend && npm start

# 4. Start frontend dev server
npm run dev

# 5. Open browser and visit http://localhost:5173
```

Enjoy building amazing eyewear experiences! 👓
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
