'use client';
import React, { useRef, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MyMapComponent } from "@/components/MyMapComponent";

// const render = (status: Status) => {
//   if (status === Status.LOADING) return <div>Loading...</div>;
//   if (status === Status.FAILURE) return <div>Error loading map</div>;
//   return null;
// };

const render = (status: Status) => {
  return <h1>{status}</h1>
}

<MyMapComponent />


const MapWrapper: React.FC = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
      render={render}
      libraries={["places"]}
    >
      <MyMapComponent />
    </Wrapper>
  );
};


export default MapWrapper;

