'use client';
import React, { useRef, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import setCurrentLocationMarker from "@/components/setCurrentLocationMarker";
import createInfoWindowContent from "@/components/createInfoWindowContent";
import CurrentLocationButton from "@/components/currentLocation";

const render = (status: Status) => {
  if (status === Status.LOADING) return <div>Loading...</div>;
  if (status === Status.FAILURE) return <div>Error loading map</div>;
  return null;
};

const MyMapComponent: React.FC = () => {
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
            mapTypeId: "roadmap",
          });
          setMap(newMap);

          if (location) {
            setCurrentLocationMarker(newMap, location);
          }

          const input = document.getElementById("pac-input") as HTMLInputElement;
          const searchBox = new google.maps.places.SearchBox(input);
          newMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          newMap.addListener("bounds_changed", () => {
            searchBox.setBounds(newMap.getBounds() as google.maps.LatLngBounds);
          });

          let markers: google.maps.Marker[] = [];

          searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (!places || places.length === 0) {
              return;
            }

            markers.forEach((marker) => marker.setMap(null));
            markers = [];

            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
              if (!place.geometry || !place.geometry.location) return;

              const icon = {
                url: place.icon!,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
              };

              const marker = new google.maps.Marker({
                map: newMap,
                icon,
                title: place.name,
                position: place.geometry.location,
              });

              const infoWindow = new google.maps.InfoWindow({
                content: createInfoWindowContent(),
                pixelOffset: new google.maps.Size(0, -50),
              });

              marker.addListener("click", () => {
                infoWindow.open(newMap, marker);
              });

              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            newMap.fitBounds(bounds);
          });

          newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
            const latLng = event.latLng;
            const confirmPin = window.confirm("ここにピンを指しますか？");
            if (confirmPin) {
              const newMarker = new google.maps.Marker({
                position: latLng,
                map: newMap,
              });

              const infoWindow = new google.maps.InfoWindow({
                content: createInfoWindowContent(),
                pixelOffset: new google.maps.Size(0, -50),
              });

              newMarker.addListener("click", () => {
                infoWindow.open(newMap, newMarker);
              });
            }
          });
        },
        (error) => {
          console.error("Error retrieving location: ", error);
          const fallbackLocation = { lat: -33.8688, lng: 151.2195 };
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
    <div>
      <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
      <div ref={mapRef} className="min-h-screen w-screen" />
      <CurrentLocationButton map={map} currentLocation={currentLocation} />
    </div>
  );
};

const MapWrapper: React.FC = () => {
  return (
    <Wrapper
      apiKey="AIzaSyBXGiM07CN4VN57L3QmdNVc4FTbJ_kKdbI"
      render={render}
      libraries={["places"]}
    >
      <MyMapComponent />
    </Wrapper>
  );
};

export default MapWrapper;
