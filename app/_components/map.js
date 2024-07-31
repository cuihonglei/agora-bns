"use client";

import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const libraries = ['places'];

const Map = ({ address, width, height }) => {

  const [location, setLocation] = useState({ lat: 51.0646, lng: -114.0896 });
  

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setLocation(data.results[0].geometry.location);
      }
    };
    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY,
    libraries,
  });

  if (loadError) return <p>Encountered error while loading Google Maps</p>;
  if (!isLoaded) return <p>Map Script is loading...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: width,
        height: height,
        borderRadius: '10px 0px 0px 10px',
      }}
      center={location}
      zoom={18}
      options={{
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'roadmap',
      }}
    />
  );
};

export default Map;
