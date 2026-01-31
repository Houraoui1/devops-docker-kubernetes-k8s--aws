# MERN Stack - TypeScript Edition

Stack complet MERN (MongoDB, Express, React, Node.js) avec TypeScript.

## 📦 Structure

```
mern-project/
├── server/          # Backend (Node.js + Express + TypeScript)
├── client/          # Frontend (React + TypeScript + Vite)
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- MongoDB (local ou MongoDB Atlas)

### Installation

**1. Backend (Server)**
```bash
cd server
npm install
cp .env.example .env
# Configurer .env avec MongoDB URI
npm run dev
```

**2. Frontend (Client)**
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## 🔧 Configuration

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-app
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 📚 Features

### Backend
- ✅ TypeScript
- ✅ Express + MongoDB (Mongoose)
- ✅ JWT Authentication
- ✅ Role-based Authorization
- ✅ Input Validation
- ✅ Error Handling
- ✅ Rate Limiting
- ✅ Security (Helmet, CORS)
- ✅ Models: User, Product, Order

### Frontend
- ✅ React 18 + TypeScript
- ✅ Vite (fast build)
- ✅ TailwindCSS
- ✅ React Router
- ✅ Zustand (state management)
- ✅ Axios (API calls)
- ✅ React Hook Form

## 🎯 API Endpoints

### Auth
```
POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile (auth required)
PUT    /api/users/profile (auth required)
```

### Products
```
GET    /api/products
GET    /api/products/:id
GET    /api/products/search?q=query
GET    /api/products/featured
POST   /api/products (auth required)
PUT    /api/products/:id (auth required)
DELETE /api/products/:id (auth required)
```

### Orders
```
POST   /api/orders (auth required)
GET    /api/orders/myorders (auth required)
GET    /api/orders/:id (auth required)
PUT    /api/orders/:id/pay (auth required)
PUT    /api/orders/:id/cancel (auth required)
```

## 🛠️ Scripts

### Server
```bash
npm run dev      # Développement
npm run build    # Build TypeScript
npm start        # Production
```

### Client
```bash
npm run dev      # Développement
npm run build    # Build pour production
npm run preview  # Preview du build
```

## 📝 Models

### User
- username, email, password
- firstName, lastName
- role (user/admin/moderator)
- isActive, avatar, bio

### Product
- name, description, price
- category, brand, stock
- images, sku, tags
- rating, reviewsCount
- isFeatured, discount

### Order
- user, orderItems
- shippingAddress
- paymentMethod
- taxPrice, shippingPrice, totalPrice
- isPaid, isDelivered
- status (pending/processing/shipped/delivered/cancelled)

## 🔐 Sécurité

- Password hashing (bcrypt)
- JWT tokens
- Input validation
- Rate limiting
- Helmet security headers
- CORS configured

## 📖 Usage

1. Register/Login pour obtenir JWT token
2. Token stocké dans localStorage
3. Token envoyé automatiquement avec chaque requête
4. Routes protégées nécessitent authentication
5. Admin routes nécessitent role admin

Bon développement ! 🎉
