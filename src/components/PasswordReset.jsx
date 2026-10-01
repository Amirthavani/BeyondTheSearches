import { useState } from 'react'
import { apiFetch } from '../api'
import styles from './Account.module.css'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setSubmitting(true)
    try {
      const response = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send reset instructions.')
      setMessage(result.message)
    } catch (reason) {
      setError(reason.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.account}>
      <a href="/login" className={styles.back}>← Back to login</a>
      <p className={styles.kicker}>Account recovery</p>
      <h1>Forgot your password?</h1>
      <p className={styles.authDescription}>Enter your email and we’ll send you a secure password reset link.</p>
      <form className={styles.login} onSubmit={submit}>
        <label>Email address<input required type="email" autoComplete="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Enter a valid email address." value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send reset link'}</button>
      </form>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </main>
  )
}

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const token = new URLSearchParams(window.location.search).get('token') || ''

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      const response = await apiFetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to reset password.')
      setMessage(result.message)
    } catch (reason) {
      setError(reason.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.account}>
      <a href="/login" className={styles.back}>← Back to login</a>
      <p className={styles.kicker}>Account recovery</p>
      <h1>Choose a new password</h1>
      <form className={styles.login} onSubmit={submit}>
        <label>New password<input required type="password" minLength="6" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        <label>Confirm password<input required type="password" minLength="6" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
        <button type="submit" disabled={submitting || !token}>{submitting ? 'Saving...' : 'Reset password'}</button>
      </form>
      {message && <p className={styles.success}>{message} <a href="/login">Log in</a></p>}
      {error && <p className={styles.error}>{error}</p>}
    </main>
  )
}
