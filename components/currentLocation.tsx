// components/currentLocation.tsx
import React from "react";
import styles from './currentLocation.module.css'
import { FaLocationArrow } from "react-icons/fa";

interface CurrentLocationProps {
  map: google.maps.Map | null;
  currentLocation: google.maps.LatLngLiteral | null;
}

const CurrentLocationButton: React.FC<CurrentLocationProps> = ({ map, currentLocation }) => {
  const handleClick = () => {
    if (map && currentLocation) {
      map.setCenter(currentLocation);
    } else {
      console.error("Map or current location is not set.");
    }
  };

  return (
    <FaLocationArrow className={styles.currentLocationButton} onClick={handleClick}/>
  );
};

export default CurrentLocationButton;


