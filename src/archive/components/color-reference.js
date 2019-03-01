import React from 'react'
import styles from './color-reference.module.css'

export default ({
  reference: {
    data: { color, hexcode },
  },
}) => (
  <li className={styles.colorReference}>
    {color}
    <div className={styles.colorBox} style={{ backgroundColor: hexcode }} />
  </li>
)
