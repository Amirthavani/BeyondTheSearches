import { useEffect, useState } from 'react'
import styles from './CategoryList.module.css'

const splitCategoryLabel = (label) => {
  const category = String(label || '').trim()
  const icon = category.match(/^\p{Extended_Pictographic}/u)?.[0] || '•'
  return { icon, name: category.slice(icon === '•' ? 0 : icon.length).trim() || category }
}

export function CategoryList({ onSelect, selectedCategory }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/menu?active=true&menuType=left_menu')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load categories')
        return response.json()
      })
      .then((items) => setCategories(items.filter((item) => item.is_active !== false && item.label)))
      .catch(() => setCategories([]))
  }, [])

  if (!categories.length) return null

  return (
    <section className={styles.categories} id="categories">
      <p className={styles.kicker}>Browse the directory</p>
      <h2>Find what you need.</h2>
      <div className={styles.grid}>
        {categories.map((category) => {
          const { icon, name } = splitCategoryLabel(category.label)
          return (
            <a
              className={`${styles.category} ${selectedCategory === category.label ? styles.selected : ''}`}
              href={`/list-type/${encodeURIComponent(category.label)}`}
              key={category._id || category.label}
              onClick={(event) => {
                if (!onSelect) return
                event.preventDefault()
                onSelect(category.label)
                window.requestAnimationFrame(() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
              }}
            >
              <span className={styles.icon} aria-hidden="true">{icon}</span>
              <span>{name}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
