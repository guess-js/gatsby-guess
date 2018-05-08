import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import styles from "./layout.module.css"

export default ({ children }) => {
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>Guess.js/Gatsby Wikipedia</title>
        <meta
          name="description"
          content="Guess.js/Gatsby site demoing ML/Analytics driven prefetching"
        />
      </Helmet>
      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <Link to="/">Guess.js/Gatsby Wikipedia</Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
