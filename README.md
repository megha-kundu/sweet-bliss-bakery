# Sweet Bliss Bakery

Full-stack bakery storefront built with React, Express, and MongoDB/MongoDB Atlas.

## Run locally

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your Atlas connection string (or leave the default for local MongoDB).
2. Install dependencies with `npm install`.
3. Seed the catalog with `npm run seed`.
4. Start the API with `npm run server`.
5. In another terminal, start Vite with `npm run dev`.

The Vite development server proxies `/api` requests to `http://localhost:5000`. The API includes product catalog, signup/login, and order endpoints. Passwords are hashed with bcrypt and orders are stored in MongoDB.

## Production checks

Run `npm run lint` and `npm run build` before deployment. Set `MONGODB_URI`, `JWT_SECRET`, and `PORT` in the hosting provider's environment variables.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
