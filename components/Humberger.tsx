import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './humberger.module.css'

const SearchIcon = () => {
  return (
    <GiHamburgerMenu className={styles.Hamburger}/>
  );
};

export default SearchIcon;