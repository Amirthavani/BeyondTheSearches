import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CategoryList } from './components/CategoryList'
import { Contact } from './components/Contact'
import { ContactPage } from './components/ContactPage'
import { Admin } from './components/Admin'
import { ListDetail } from './components/ListDetail'
import { Account } from './components/Account'
import { Auth } from './components/Auth'
import { TypeLists } from './components/TypeLists'
import { Directory } from './components/Directory'
import { About } from './components/About'
import { VisitorPreferences } from './components/VisitorPreferences'
import { ForgotPassword, ResetPassword } from './components/PasswordReset'
import styles from './App.module.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [preferences, setPreferences] = useState(() => {
    if (sessionStorage.getItem('editingVisitorPreferences') === 'true') return null
    try {
      return JSON.parse(localStorage.getItem('visitorPreferences') || 'null')
    } catch {
      return null
    }
  })
  const completePreferences = (nextPreferences) => {
    sessionStorage.removeItem('editingVisitorPreferences')
    setPreferences(nextPreferences)
  }
  const listMatch = window.location.pathname.match(/^\/lists\/([^/]+)$/)
  const typeMatch = window.location.pathname.match(/^\/list-type\/([^/]+)$/)
  let page
  if (listMatch) page = <ListDetail id={listMatch[1]} />
  else if (typeMatch) page = <TypeLists type={decodeURIComponent(typeMatch[1])} />
  else if (window.location.pathname === '/directory') page = <Directory />
  else if (window.location.pathname === '/about') page = <About />
  else if (window.location.pathname === '/contact') page = <ContactPage />
  else if (window.location.pathname === '/account') page = <Account />
  else if (window.location.pathname === '/register') page = <Auth mode="register" />
  else if (window.location.pathname === '/login') page = <Auth mode="login" />
  else if (window.location.pathname === '/forgot-password') page = <ForgotPassword />
  else if (window.location.pathname === '/reset-password') page = <ResetPassword />
  else if (window.location.pathname === '/admin' || window.location.hash === '#admin') page = <Admin />
  else {
    page = (
      <>
        <main>
          <Hero />
          <CategoryList onSelect={setSelectedCategory} selectedCategory={selectedCategory} />
          <Directory embedded selectedCategory={selectedCategory} onClearCategory={setSelectedCategory} />
          <Contact />
        </main>
      </>
    )
  }

  if (!preferences) return <VisitorPreferences onComplete={completePreferences} />
  return <div className={styles.app}><Header />{page}</div>
}

export default App
