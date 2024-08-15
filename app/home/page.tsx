'use client'; 
import React, { useRef, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MyMapComponentHome } from "@/components/MyMapComponentHome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const render = (status: Status) => {
  if (status === Status.LOADING) return <div>Loading...</div>;
  if (status === Status.FAILURE) return <div>Error loading map</div>;
  return <></>;
};

<MyMapComponentHome />


const MapWrapper: React.FC = () => {
  const supabase = createClientComponentClient();
  return (
    <Wrapper
      apiKey = {process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
      render={render}
      libraries={["places"]}
    >
      <MyMapComponentHome />
    </Wrapper>
  );
};


export default MapWrapper;

