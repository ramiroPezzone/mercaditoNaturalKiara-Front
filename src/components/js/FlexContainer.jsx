import React from 'react'
import styles from '../css/FlexContainer.module.css'

export const FlexContainer = (props) => {
  return (
    <div className={styles.flexContainer}>
        {props.children}
    </div>
  )
}
