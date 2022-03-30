import React from 'react'
import styles from '../css/Footer.module.css'

export const Footer = () => {
  return (
    <div className={styles.containerBFFooter}>
    <footer>
      <div className={styles.subContainerFooter}>
        <a href="https://www.linkedin.com/in/ramiro-c-pezzone-desarrollador-web/" target="_blank" rel="noopener noreferrer" title='Ir a Linkedin'>
          <div className={styles.containerFlexFooter}>
            <p className={styles.pDelFooter}>Powered by</p>
            <div className={styles.containerImg} />
          </div>
        </a>
      </div>
    </footer>
    </div>
  )
}
