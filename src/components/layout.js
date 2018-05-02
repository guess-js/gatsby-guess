import React from "react"
import { Link } from "gatsby"
import styles from "./layout.module.css"

export default ({ children }) => {
  return (
    <div>
      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <Link to="/">Guess.js/Gatsby Wikipedia Demo</Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
