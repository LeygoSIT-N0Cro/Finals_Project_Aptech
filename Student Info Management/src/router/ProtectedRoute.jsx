// ProtectedRoute.jsx
// Guards routes that require authentication.
// Redirects unauthenticated users to the login page.

import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('auth') === 'true'

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // Otherwise render the protected page
  return children
}