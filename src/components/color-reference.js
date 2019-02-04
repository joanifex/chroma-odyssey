import React from 'react'
import styles from './color-reference.module.css'

export default ({
  reference: {
    data: { Color, hexcode },
  },
}) => (
  <li className={styles.colorReference}>
    {Color}
    <div className={styles.colorBox} style={{ backgroundColor: hexcode }} />
  </li>
)
