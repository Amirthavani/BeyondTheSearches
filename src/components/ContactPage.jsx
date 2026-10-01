import { useState } from 'react'
import styles from './ContactPage.module.css'

const initialForm = { name: '', mobile: '', email: '', message: '' }

export function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send your message.')
      setForm(initialForm)
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className={styles.page}>
      <a href="/" className={styles.back}>← Back to home</a>
      <section className={styles.contact}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Get in touch</p>
          <h1>Let’s talk about what comes next.</h1>
          <p>Have a question, an idea, or a brand ready to go beyond the search? Send us a message and we’ll be in touch.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name<input required name="name" value={form.name} onChange={updateForm} placeholder="Your name" /></label>
          <label>Mobile<input required name="mobile" type="tel" pattern="^\+?[0-9][0-9\s().-]{6,24}$" title="Enter a valid mobile number with 7 to 15 digits." value={form.mobile} onChange={updateForm} placeholder="+1 555 123 4567" /></label>
          <label>Email<input required name="email" type="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Enter a valid email address." value={form.email} onChange={updateForm} placeholder="you@example.com" /></label>
          <label>Message<textarea required name="message" rows="7" value={form.message} onChange={updateForm} placeholder="How can we help?" /></label>
          <button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <span aria-hidden="true">↗</span></button>
          {status.message && <p className={status.type === 'success' ? styles.success : styles.error}>{status.message}</p>}
        </form>
      </section>
    </main>
  )
}
