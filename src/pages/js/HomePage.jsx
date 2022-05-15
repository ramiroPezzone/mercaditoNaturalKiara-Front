import { useEffect } from 'react'
import styles from '../css/HomePage.module.css'

export const HomePage = () => {
  useEffect(() => {
    document.title = `Mercadito Natural Kiara`;
  });

  return (
    <>
      <div className={styles.containerHomePage}>
        <div className={styles.logoHomePage} />
        <p style={{ margin: "0", padding: "0" }}>Santa Fe - Argentina</p>
        <a href="https://www.instagram.com/mercadito_natural_kiara/" className={styles.enlaceInstagram} target="_blank" rel="noopener noreferrer" title='Ir a instagram'>
          <div className={styles.containerLogoInstagram} />
          Mercadito natural Kiara
        </a>
        <a href="https://api.whatsapp.com/send/?phone=5493424293143" className={styles.enlaceWhatsapp} target="_blank" rel="noopener noreferrer" title='Ir a instagram'>
          <div className={styles.containerLogoWhatsapp} />
          342 4 293 143
        </a>
      </div>
    </>
  )
}
