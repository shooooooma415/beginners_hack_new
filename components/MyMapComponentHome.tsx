'use client';
import React, { useRef, useEffect, useState } from "react";
import setCurrentLocationMarker from "@/components/setCurrentLocationMarker";
import createInfoWindowContent from "@/components/createInfoWindowContent";
import CurrentLocationButton from "@/components/currentLocation";
import styles from './searchbutton.module.css'

const MyMapComponentHome: React.FC = () => {
  const divStyle: React.CSSProperties = {
    overflowY: 'hidden', // 縦方向のスクロールを有効にする
    overflowX: 'hidden'  // 横方向のスクロールを無効にする
  };
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);

          const newMap = new google.maps.Map(mapRef.current!, {
            center: location,
            zoom: 13,
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false, // これで航空写真などの切り替えボタンを非表示にする
            mapTypeId: "roadmap",
          });
          setMap(newMap);

          if (location) {
            setCurrentLocationMarker(newMap, location);
          }

          const input = document.getElementById("pac-input") as HTMLInputElement;
          const searchBox = new google.maps.places.SearchBox(input);

          newMap.addListener("bounds_changed", () => {
            searchBox.setBounds(newMap.getBounds() as google.maps.LatLngBounds);
          });

          // 検索ボックスで場所を検索したときのリスナー
          searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (!places || places.length === 0) {
              return;
            }

            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
              if (!place.geometry || !place.geometry.location) return;

              // マーカーを作成せずに、場所のビューポートにマップをフィットさせる
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });

            newMap.fitBounds(bounds);
          });
        },
        (error) => {
          console.error("Error retrieving location: ", error);
          const fallbackLocation = { lat: 35.32325, lng: 136.13382 };
          const newMap = new google.maps.Map(mapRef.current!, {
            center: fallbackLocation,
            zoom: 13,
            mapTypeId: "roadmap",
          });
          setMap(newMap);

          setCurrentLocationMarker(newMap, fallbackLocation);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, [mapRef]);

  return (
    <div style={divStyle}>
      <input id="pac-input" className={styles.controls} type="text" placeholder="Search" />
      <div ref={mapRef} className="min-h-screen w-screen" />
      <CurrentLocationButton map={map} currentLocation={currentLocation} />
    </div>
  );
};

export { MyMapComponentHome };
