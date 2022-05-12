import React from 'react'
import styles from '../css/SearchBar.module.css'

const SearchBar = ({ searchParams }) => {

  return (
    <div className={styles.containerSearchBar}>
      <input
        type="search"
        placeholder='Buscar...'
        className={styles.searchBar}
        id="searchBar"
        onKeyUp={(e) => searchParams(e)}
      />
    </div>
  )
}

export default SearchBar