import React, { useState } from 'react'
import styles from '../css/BtnTop.module.css'

const BtnTop = () => {

    const [btnHidden, setBtnHidden] = useState(true)

    window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop
        scrollTop > 500
            ? setBtnHidden(false)
            : setBtnHidden(true)
    })

    const scrollTo = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div
            className={
                btnHidden
                    ? `${styles.btnHidden}`
                    : `${styles.btnShow}`
            }
            onClick={scrollTo}
        >
            <div className={styles.btnTop} title="Ir arriba" />
        </div>
    )
}

export default BtnTop
