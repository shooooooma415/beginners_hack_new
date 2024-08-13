'use client';
import React, { useRef, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MyMapComponentHome } from "@/components/MyMapComponentHome";

const render = (status: Status) => {
  if (status === Status.LOADING) return <div>Loading...</div>;
  if (status === Status.FAILURE) return <div>Error loading map</div>;
  return <></>;
};

<MyMapComponentHome />


const MapWrapper: React.FC = () => {
  return (
    <Wrapper
      apiKey="AIzaSyBXGiM07CN4VN57L3QmdNVc4FTbJ_kKdbI"
      render={render}
      libraries={["places"]}
    >
      <MyMapComponentHome />
    </Wrapper>
  );
};


export default MapWrapper;

