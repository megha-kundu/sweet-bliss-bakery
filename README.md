# Sweet Bliss Bakery

A modern full-stack bakery storefront where customers can discover handcrafted sweets, create an account, and place delivery orders.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Website-c45335?style=for-the-badge)](YOUR_LIVE_WEBSITE_URL)
[![Built with React](https://img.shields.io/badge/Frontend-React-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Express-111111?style=flat-square&logo=express)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47a248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Live Demo

**Website:** [Add your deployed website link here](YOUR_LIVE_WEBSITE_URL)

**Repository:** [github.com/megha-kundu/sweet-bliss-bakery](https://github.com/megha-kundu/sweet-bliss-bakery)

> Replace `YOUR_LIVE_WEBSITE_URL` with your Render, Vercel, or Netlify URL after deployment.

## About The Project

Sweet Bliss Bakery is designed as a real online bakery experience rather than a simple product gallery. Customers can browse product categories, view real bakery photography, create an account, sign in, build a basket, and submit an order with delivery details.

The project uses a React frontend, an Express API, and MongoDB for persistent product, customer, and order data. It supports both a local MongoDB database for development and MongoDB Atlas for cloud deployment.

## Features

- Bakery-style responsive storefront for desktop and mobile
- Real product images for cakes, donuts, chocolates, cookies, cupcakes, and ice cream
- Product catalog loaded from MongoDB
- Category-based product browsing
- Customer signup and login
- Password hashing with bcryptjs
- JWT-based authentication sessions
- Login required before ordering or adding products to the basket
- Persistent basket with quantity tracking
- Checkout form for customer and delivery details
- Orders saved with products, quantities, totals, and status
- Local MongoDB and MongoDB Atlas support
- Optional database mirroring for products, users, and orders
- API health endpoint for connection monitoring
- Production build and lint scripts

## Screenshots

Add screenshots or a screen recording here to showcase the project on GitHub.

```text
screenshots/home.png
screenshots/menu.png
screenshots/checkout.png
```

## Technology Stack

### Frontend

- React 19
- React Router
- Styled Components
- Vite
- CSS3

### Backend

- Node.js
- Express 5
- Mongoose
- MongoDB
- MongoDB Atlas
- bcryptjs
- JSON Web Token

### Development Tools

- npm
- ESLint
- Git and GitHub
- Render-ready deployment configuration

## Application Flow

```mermaid
flowchart LR
    Customer[Customer] --> Storefront[React Storefront]
    Storefront --> Auth[Signup or Login]
    Storefront --> Catalog[Product Catalog API]
    Storefront --> Basket[Persistent Basket]
    Basket --> Checkout[Checkout]
    Checkout --> Orders[Express Orders API]
    Catalog --> MongoDB[(MongoDB)]
    Auth --> MongoDB
    Orders --> MongoDB
    MongoDB -. optional mirror .-> Atlas[(MongoDB Atlas)]
```

## Project Structure

```text
sweet-bliss-bakery/
├── public/                    Product images
├── server/
│   ├── index.js               Express API and database connections
│   └── seed.js                Product catalog seeder
├── src/
│   ├── Component/
│   │   ├── Home.jsx           Homepage
│   │   ├── Layout.jsx         Navigation and authentication UI
│   │   ├── ProductCatalog.jsx Product listing and actions
│   │   ├── Cart.jsx            Basket page
│   │   └── Checkout.jsx        Order checkout
│   ├── api.js                 Frontend API helpers
│   ├── App.jsx                 Application routes
│   └── index.css               Global styles
├── .env                       Local secrets, not committed
├── package.json
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 18 or newer
- npm
- Local MongoDB, or a MongoDB Atlas cluster

### Installation

```bash
git clone https://github.com/megha-kundu/sweet-bliss-bakery.git
cd sweet-bliss-bakery
npm install
```

Create a `.env` file in the project root:

```env
MONGODB_LOCAL_URI=mongodb://127.0.0.1:27017/sweet-bliss
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/bakery?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

Keep `.env` private. Never commit database credentials or JWT secrets to GitHub.

### Seed Products

```bash
npm run seed
```

This seeds the bakery catalog into local MongoDB and into the Atlas `bakery` database when a valid Atlas URI is configured.

### Start The Application

Start the API in one terminal:

```bash
npm run server
```

Start the React frontend in another terminal:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the Express API on port 5000 |
| `npm run seed` | Seed products into MongoDB databases |
| `npm run build` | Create the production frontend build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check local and Atlas connection status |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products?category=cake` | Filter products by category |
| `POST` | `/api/auth/signup` | Create a customer account |
| `POST` | `/api/auth/login` | Log in a customer |
| `POST` | `/api/orders` | Create a customer order |

## Database Collections

- `products`: product name, category, price, image, and description
- `users`: customer profile and securely hashed password
- `orders`: customer details, ordered items, total, and status

Local development uses the `sweet-bliss` database. MongoDB Atlas uses the `bakery` database when configured.

## Deployment

Deploy the frontend and backend as separate Render services.

### Frontend Static Site

```text
Build command: npm run build
Publish directory: dist
```

### Backend Web Service

```text
Build command: npm install
Start command: npm run server
```

Add these environment variables to the Render backend service:

```text
MONGODB_ATLAS_URI
JWT_SECRET
PORT
```

The `dist` folder is created by the build command and should remain in `.gitignore`.

## Environment And Security

- `.env` is ignored by Git
- `node_modules` is ignored by Git
- `dist` is ignored by Git
- Passwords are hashed before being stored
- MongoDB credentials must be added through local environment variables or Render secrets

## Roadmap

- Online payment integration
- Customer order history
- Bakery admin dashboard
- Product reviews and ratings
- Delivery tracking
- Custom cake image uploads
- Email order confirmation

## License

This project is available for educational and portfolio use.
