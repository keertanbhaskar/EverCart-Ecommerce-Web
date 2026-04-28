# EverCart — Full Stack E-Commerce Web App

A complete, production-ready e-commerce application built with the MERN stack. Includes a customer-facing storefront, an admin dashboard, and a REST API backend.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Tailwind CSS |
| Admin Panel | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| Image Upload | Cloudinary + Multer |
| Payments | Cash on Delivery (Stripe & Razorpay ready) |

---

## Project Structure

```
EverCart/
├── Frontend/       # Customer storefront (React + Vite)
├── admin/          # Admin dashboard (React + Vite)
└── backend/        # REST API (Node.js + Express)
```

---

## Features

### Storefront
- Browse and filter products by category, sub-category, and price
- Product detail page with image gallery and size selector
- Shopping cart with quantity controls and persistent state
- User registration and login (JWT)
- Checkout with delivery address form
- Order history with real-time status tracking
- Responsive design — mobile friendly

### Admin Panel
- Secure admin login
- Add products with up to 4 images (uploaded to Cloudinary)
- List and delete products with search
- View and manage all orders
- Update order status (Order Placed → Packing → Shipped → Delivered)
- Order stats dashboard (total orders, revenue, delivered, pending)

### Backend API
- User auth — register, login, admin login
- Product CRUD — add, list, remove, single product
- Order management — place, list all (admin), user orders, update status
- Cart persistence — sync cart to database per user

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/keertanbhaskar/EverCart-Ecommerce-Web.git
cd EverCart-Ecommerce-Web
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
PORT=4000
```

```bash
npm run server
```

### 3. Frontend setup

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

### 4. Admin panel setup

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

---

## Environment Variables

Each app has a `.env.example` file — copy it to `.env` and fill in your values.

| File | Variable | Description |
|------|----------|-------------|
| `backend/.env` | `MONGODB_URI` | MongoDB connection string |
| `backend/.env` | `CLOUDINARY_*` | Cloudinary credentials |
| `backend/.env` | `JWT_SECRET` | Secret key for JWT signing |
| `backend/.env` | `ADMIN_EMAIL` | Admin login email |
| `backend/.env` | `ADMIN_PASSWORD` | Admin login password |
| `Frontend/.env` | `VITE_BACKEND_URL` | Backend API URL |
| `admin/.env` | `VITE_BACKEND_URL` | Backend API URL |

---

## API Endpoints

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | User login |
| POST | `/api/user/admin` | Admin login |
| POST | `/api/user/cart/add` | Add item to cart |
| POST | `/api/user/cart/update` | Update cart item |
| POST | `/api/user/cart/get` | Get user cart |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product/list` | List all products |
| POST | `/api/product/add` | Add product (admin) |
| POST | `/api/product/remove` | Remove product (admin) |
| POST | `/api/product/single` | Get single product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/place` | Place order (COD) |
| POST | `/api/order/userorders` | Get user's orders |
| POST | `/api/order/list` | List all orders (admin) |
| POST | `/api/order/status` | Update order status (admin) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run server` | Start backend with nodemon |
| `npm run dev` | Start Frontend or Admin dev server |
| `npm run build` | Build for production |

---

## License

MIT
