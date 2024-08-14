import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './hamburger.module.css'

const SearchIcon = () => {
  return (
    <GiHamburgerMenu className={styles.hamburger}/>
  );
};

export default SearchIcon;