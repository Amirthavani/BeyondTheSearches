# Beyond The Search

Beyond The Search is a React/Vite directory with a MongoDB-backed API for managing the public navigation menu.

## Configuration and deployment

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your hosted MongoDB connection string.
2. Set `APP_URL` to the public site URL. It is required when SMTP is configured so password-reset and event links use the deployed site.
3. Build and start the application with `npm run build` followed by `npm run server`. The API serves the built frontend, and the frontend calls `/api` and `/uploads` on the same origin.
4. For Vite development against a separately deployed API, set `API_PROXY_TARGET` to that API's public URL before running `npm run dev`.

Menu changes are stored in MongoDB and are reflected in the public header through `/api/menu?active=true`. If the API is unavailable, the site keeps the built-in default navigation links.
"# BeyondTheSearches" 
