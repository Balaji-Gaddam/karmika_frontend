// config.js

// CRA (Create React App) uses process.env.REACT_APP_* for environment variables
// This will use the Railway backend URL in production (from Vercel settings)
// and fallback to localhost when running locally.
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";