import { useState } from 'react'
import { apiFetch } from '../api'
import styles from './Account.module.css'

export function Auth({ mode }) {
  const isRegister = mode === 'register'
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (isRegister && form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      const response = await apiFetch(`/api/auth/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Unable to continue.')
        return
      }
      localStorage.setItem('listToken', result.token)
      window.location.href = '/account'
    } catch {
      setError('Unable to connect to the account service.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.account}>
      <a href="/" className={styles.back}>← Back to site</a>
      <p className={styles.kicker}>{isRegister ? 'Submit your list' : 'Your account'}</p>
      <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
      <p className={styles.authDescription}>
        {isRegister ? 'Register once to submit and manage your lists.' : 'Log in to manage your submitted lists.'}
      </p>
      <form className={styles.login} onSubmit={submit}>
        {isRegister && <label>Full name<input required autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>}
        <label>Email address<input required type="email" autoComplete="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Enter a valid email address." placeholder="jane@example.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        {isRegister && <label>Phone number<input required type="tel" autoComplete="tel" pattern="^\+?[0-9][0-9\s().-]{6,24}$" title="Enter a valid phone number with 7 to 15 digits." placeholder="+1 555 123 4567" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>}
        <label>Password<input required type="password" minLength="6" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="At least 6 characters" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        {isRegister && <label>Confirm password<input required type="password" minLength="6" autoComplete="new-password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} /></label>}
        <button type="submit" disabled={submitting}>{submitting ? 'Please wait...' : (isRegister ? 'Create account' : 'Log in')}</button>
      </form>
      {!isRegister && <p className={styles.authSwitch}><a href="/forgot-password">Forgot password?</a></p>}
      <p className={styles.authSwitch}>
        {isRegister ? <>Already registered? <a href="/login">Log in here</a></> : <>Need an account? <a href="/register">Register here</a></>}
      </p>
      {error && <p className={styles.error}>{error}</p>}
    </main>
  )
}
