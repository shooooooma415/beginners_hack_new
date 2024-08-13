// components/currentLocation.tsx
import React from "react";

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
    <button id="current-location-button" onClick={handleClick}>
      現在地に移動
    </button>
  );
};

export default CurrentLocationButton;
