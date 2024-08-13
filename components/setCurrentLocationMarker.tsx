export default function setCurrentLocationMarker(map: google.maps.Map, position: google.maps.LatLngLiteral) {
  new google.maps.Circle({
    strokeColor: "#115EC3",
    strokeOpacity: 0.2,
    strokeWeight: 1,
    fillColor: "#115EC3",
    fillOpacity: 0.2,
    map,
    center: position,
    radius: 100,
  });

  new google.maps.Marker({
    position,
    map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "#115EC3",
      fillOpacity: 1,
      strokeColor: "white",
      strokeWeight: 2,
      scale: 7,
    },
  });
}
