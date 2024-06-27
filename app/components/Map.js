import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/firebase"; 

const Map = () => {
  const [userPosition, setUserPosition] = useState(null); 
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const docRef = doc(db, "locations", "userLocation"); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const latitude = data.latitude; 
          const longitude = data.longitude;
          setUserPosition([latitude, longitude]);
          console.log(`User's location from Firebase: Latitude: ${latitude}, Longitude: ${longitude}`);
          
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        setLocationError(error.message);
        console.error("Error fetching user location from Firebase:", error);
      }
    };

    fetchUserLocation();
  }, [userPosition]);
  console.log(userPosition)

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
  });

  return (
    userPosition && (
      <div>
        {locationError && <p>Error fetching location: {locationError}</p>}
        <MapContainer
          center={userPosition}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userPosition} icon={customIcon} />
        </MapContainer>
      </div>
    )
  );
};

export default Map;


``






