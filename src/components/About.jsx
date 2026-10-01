import styles from './About.module.css'

export function About() {
  return (
    <main className={styles.page}>
      <a href="/" className={styles.back}>← Back to home</a>
      <section className={styles.intro}>
        
        <h1>We Help Brands Go Beyond the Search</h1>
        <p className={styles.lead}>
          At Beyond the Search, we believe being found is only the beginning.
        </p>
        <p>
          Search is constantly evolving. From traditional search engines to AI-powered platforms,
          people are discovering brands in more ways than ever before. Our mission is to help
          businesses adapt, stand out, and build meaningful visibility wherever their customers
          are searching.
        </p>
        <p>
          We combine strategy, creativity, data, and technology to create digital experiences
          that attract the right audience and turn visibility into real growth.
        </p>
      </section>
      <section className={styles.content}>
        <div>
          <h2>More Than Rankings</h2>
          <p>
            We don’t believe success is simply about ranking #1.
          </p>
          <p>
            It’s about being visible to the right people, in the right places, at the right time
            — and giving them a reason to choose you.
          </p>
        </div>
        <div>
          <h2>Our Approach</h2>
          <p>
            Understand. Strategize. Create. Grow.
          </p>
          <p>
            We start by understanding your business, your audience, and your goals. Then we
            develop a clear strategy designed around measurable outcomes.
          </p>
          <p>
            Our approach is practical, transparent, and focused on long-term growth — not quick
            wins or empty metrics.
          </p>
        </div>
        <div>
          <h2>Why Beyond the Search?</h2>
          <p>
            Because your brand is bigger than a search result.
          </p>
          <p>
            We look at the complete picture: your visibility, your content, your audience, your
            digital presence, and the opportunities others may be missing.
          </p>
          <p>
            We go beyond the search to help brands get discovered, get trusted, and get chosen.
          </p>
        </div>
      </section>
      <section className={styles.closing}>
        <h2>Let’s Go Beyond</h2>
        <p>
          Whether you’re building a new brand, growing an established business, or looking for
          what comes next, we’re here to help you navigate the changing digital landscape.
        </p>
        <p>Your next customer is searching. Let’s make sure they find you.</p>
        <a className={styles.cta} href="/#contact">Get in touch <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  )
}
