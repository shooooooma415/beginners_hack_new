'use client';
import React, { useRef, useEffect, useState } from "react";
import setCurrentLocationMarker from "@/components/setCurrentLocationMarker";
import createInfoWindowContent from "@/components/createInfoWindowContent";
import CurrentLocationButton from "@/components/currentLocation";
import styles from './searchbutton.module.css'
import useFetchAllComments from "./fetchAllComments";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import createImageWindowContent from "./createImageWindowContent";
import { useSearchParams } from "next/navigation";
import "./delete.css";

interface CommentLocation {
  lat: number
  lng: number
}

const MyMapComponentHome: React.FC = () => {
  const divStyle: React.CSSProperties = {
    overflowY: 'hidden', // 縦方向のスクロールを有効にする
    overflowX: 'hidden'  // 横方向のスクロールを無効にする
  };
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [url, setUrl] = useState<string[] | null>([])
  // const [userId, setUserId] = useState<string>("")
  const supabase = createClientComponentClient();

  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#E5E4E4" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#886771" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "b8b6b6" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#be859f" }],
    },
  ];

  const searchParams = useSearchParams()
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  useEffect(() => {
    if (mapRef.current) {
      // if(latitude){
      //   const fallbackLocation = { lat: Number(latitude), lng: Number(longitude) };
      //     const newMap = new google.maps.Map(mapRef.current!, {
      //       center: fallbackLocation,
      //       zoom: 13,
      //       zoomControl: false,
      //       fullscreenControl: false,
      //       streetViewControl: false,
      //       mapTypeControl: false, 
      //       mapTypeId: "roadmap",
      //     });
      //     setMap(newMap);
      //     // newMap.panTo({ lat: Number(latitude), lng: Number(longitude) })

      //     // setCurrentLocationMarker(newMap, fallbackLocation);
      // }
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
            styles: mapStyles,
          });
          setMap(newMap);
          console.log(location)
          // newMap.panTo(currentLocation!)
          // newMap.setCenter(currentLocation!);

          if (location) {
            setCurrentLocationMarker(newMap, location);
          }
          (async () => {
            const userId = await supabase.auth.getUser().then((u) => {
              if (u.data.user == null) {
                alert("ログインしてください")
                return ""
              }
              return u.data.user.id
            })
            const { data, error } = await supabase
              .from("comments")
              .select("image_name, latitude, longitude")
              .eq("user_id", userId)

            if (error) {
              console.error(error)
            }

            if (data == null) {
              console.error("")
            }

            // const locations: CommentLocation[] = data!.map((rec) => {
            //   return { lat: rec.latitude as number, lng: rec.longitude as number }
            // })

            await data!.forEach(async (rec) => {
              const marker = new google.maps.Marker({
                position: { lat: rec.latitude as number, lng: rec.longitude as number },
                map: newMap
              })
              const { data, error } = await supabase.storage.from('public-image-bucket').download(`img/${userId}/${rec.image_name}`);
              if (error) {
                console.error(error);
              }
              const url = URL.createObjectURL(data!)
              const imageWindowContent = createImageWindowContent(url, rec.image_name);
              const imageWindow = new google.maps.InfoWindow({
                content: imageWindowContent,
                pixelOffset: new google.maps.Size(0, -50),
              });

              marker.addListener("click", () => {
                imageWindow.open(newMap, marker);
              })
            })


            if(latitude){
            newMap.panTo({ lat: Number(latitude), lng: Number(longitude) })
            }

            // locations.forEach((location) => {
            //   newMap.panTo(location)
            // })
          })()

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
          console.log('error')
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