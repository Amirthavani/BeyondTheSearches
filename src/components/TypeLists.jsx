import { useEffect, useState } from 'react'
import { rankLists } from '../utils/listRanking'
import styles from './TypeLists.module.css'

export function TypeLists({ type }) {
  const [lists, setLists] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/lists')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load lists')
        return response.json()
      })
      .then((items) => {
        const normalizedType = type.trim().toLowerCase()
        setLists(rankLists(items.filter((item) => {
          const itemType = item.itemType === 'other' ? item.otherItemType : item.itemType
          return itemType?.trim().toLowerCase() === normalizedType
        })))
      })
      .catch(() => setError('This category could not be loaded.'))
  }, [type])

  return (
    <main className={styles.page}>
      <a href="/" className={styles.back}>← Back to directory</a>
      <p className={styles.kicker}>Directory category</p>
      <h1>{type}</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!error && lists.length === 0 && <p className={styles.empty}>No lists have been submitted for this type yet.</p>}
      {lists.length > 0 && <div className={styles.grid}>
        {lists.map((list) => (
          <a className={styles.card} href={`/lists/${list._id}`} key={list._id}>
            <div className={styles.image}>
              {list.photos?.[0]?.url ? <img src={list.photos[0].url} alt={list.itemName} /> : <span>No photo</span>}
            </div>
            <div className={styles.cardInfo}>
              <p>{list.itemType === 'other' ? list.otherItemType : list.itemType}</p>
              <h2>{list.itemName}</h2>
              <span>{[list.address, list.location, list.phone].filter(Boolean).map((value, index) => <span key={`${list._id}-${index}`}>{index > 0 && <br />}{value}</span>)}</span>
            </div>
            <small>Submitted by {list.userId?.username || list.name} · <span className={styles.viewCount} aria-label={`${list.views || 0} views`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>
              {list.views || 0}
            </span> · <span className={styles.likeCount} aria-label={`${list.likes || 0} likes`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" /></svg>
              {list.likes || 0}
            </span></small>
          </a>
        ))}
      </div>}
    </main>
  )
}
