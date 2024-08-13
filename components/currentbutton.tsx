import React from 'react';
import { FaLocationArrow } from "react-icons/fa";
import styles from './currentLocation.module.css'

const SearchIcon = () => {
  return (
    <FaLocationArrow className={styles.currentLocationButton} />
  );
};

export default SearchIcon;