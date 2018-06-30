import * as React from 'react'
// import styles from './logo.scss'
const styles = require('./logo.scss')

const Logo = ({ text = 'SW' }) => (
  <div className={styles.border}>
    <span className={styles.brand}>{text}</span>
  </div>
)

export default Logo
