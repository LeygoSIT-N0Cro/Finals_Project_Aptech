export default function Login({ onLogin }) {
  function handleSubmit(e) {
    e.preventDefault()
    const username = e.target.username.value.trim()
    const password = e.target.password.value

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('auth', 'true')
      onLogin()
    } else {
      alert('Invalid username or password.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-icon">🎓</div>
        <h2 className="login-title">Student Info Management</h2>
        <p className="login-sub">Sign in to continue</p>

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
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            Sign in
          </button>
        </form>

        <p className="login-hint">
          Default: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  )
}