import React from 'react';
import Styles from './Styles/Search.module.css';
import Search_icon from '../../assets/icons/search.svg';
function Searchbar() {
  return (
    <div className={Styles.container}>
      <img src={Search_icon} alt='search_icon' className={Styles.Search_icon} />
      <input
        className={Styles.Search_input}
        type='text'
        placeholder='Search by Product Name'
      />
    </div>
  );
}

export default Searchbar;
