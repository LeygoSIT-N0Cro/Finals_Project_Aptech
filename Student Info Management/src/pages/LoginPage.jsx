// LoginPage.jsx
// Displays the login screen. Validates hardcoded credentials
// and redirects to the dashboard on success.
import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin123'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const username = e.target.username.value.trim()
    const password = e.target.password.value

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem('auth', 'true')
      navigate('/students')
    } else {
      setError('Invalid username or password. Please try again.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Brand header — matches the main app topbar */}
        <div className="login-brand">
          <div className="brand-icon">🎓</div>
          <div>
            <div className="brand-name">Student Info Management</div>
            <div className="brand-sub">Academic Records System</div>
          </div>
        </div>

        <div className="login-heading">Welcome back</div>
        <div className="login-sub">Sign in to access your dashboard</div>

        {/* Error message */}
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="pw-wrap">
              <input
                className="form-input"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                style={{ paddingRight: '48px' }}
                required
              />
              <span
                className="pw-toggle"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? 'hide' : 'show'}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}>
            Sign in
          </button>
        </form>

        <div className="login-hint">
          Default: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  )
}