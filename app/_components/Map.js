// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../_utils/firebase";

// const containerStyle = {
//   width: '100%',
//   height: '300px', 
// };

// const Map = () => {
//   const [userPosition, setUserPosition] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserLocation = async () => {
//       try {
//         const docRef = doc(db, "locations", "userLocation");
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           const latitude = data.latitude;
//           const longitude = data.longitude;
//           setUserPosition({ lat: latitude, lng: longitude });
//           console.log(`User's location from Firebase: Latitude: ${latitude}, Longitude: ${longitude}`);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         setLocationError(error.message);
//         console.error("Error fetching user location from Firebase:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserLocation();
//   }, []);

//   const geocodeAddress = async (address) => {
//     const geocoder = new window.google.maps.Geocoder();

//     try {
//       const response = await new Promise((resolve, reject) => {
//         geocoder.geocode({ address }, (results, status) => {
//           if (status === "OK") {
//             resolve(results[0].geometry.location);
//           } else {
//             reject(status);
//           }
//         });
//       });

//       return { lat: response.lat(), lng: response.lng() };
//     } catch (error) {
//       console.error("Error geocoding address:", error);
//       throw new Error("Error geocoding address");
//     }
//   };

//   const handleGeocode = async () => {
//     try {
//       const address = "2668 Capitol Hill Crescent NW, Calgary"; 
//       const position = await geocodeAddress(address);
//       setUserPosition(position);
//     } catch (error) {
//       setLocationError("Error geocoding address: " + error.message);
//     }
//   };

//   return (
//     <div className="">
//       {loading && <p className="text-gray-700 text-center p-4">Loading map...</p>}
//       {locationError && <p className="text-red-500 text-center p-4">Error fetching location: {locationError}</p>}
//       {userPosition && (
//         <LoadScript 
//           googleMapsApiKey="AIzaSyBeA_iNOUh8bLpdvuJ6g4OYhqofLCQvhUw"
//           onError={(error) => console.error("Error loading Google Maps script:", error)}
//           onLoad={() => console.log("Google Maps script loaded successfully")}
//         >
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={userPosition}
//             zoom={15}
//             className="rounded-lg shadow-lg h-full"
//           >
//             <Marker position={userPosition} />
//           </GoogleMap>
//         </LoadScript>
//       )}
//       <button onClick={handleGeocode} className="mt-4 p-2 bg-blue-500 text-white rounded">
//         Geocode Address
//       </button>
//     </div>
//   );
// };

// export default Map;



import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";

const containerStyle = {
  width: '100%',
  height: '300px',
};

const DEFAULT_LOCATION = { lat: 51.0646, lng: -114.0896 }; 

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const docRef = doc(db, "users", "address");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const address = data.address;
        console.log("Geocoding address:", address);
        const position = await geocodeAddress(address);
        setUserPosition(position);
      } else {
        console.log("No such document! Using default location.");
        setUserPosition(DEFAULT_LOCATION);
      }
    } catch (error) {
      setLocationError(error.message);
      console.error("Error fetching user location from Firebase:", error);
      setUserPosition(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  };

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();

    try {
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            resolve(results[0].geometry.location);
          } else {
            reject(status);
          }
        });
      });

      return { lat: response.lat(), lng: response.lng() };
    } catch (error) {
      console.error("Error geocoding address:", error);
      throw new Error("Error geocoding address");
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBeA_iNOUh8bLpdvuJ6g4OYhqofLCQvhUw",
    libraries: ["places"]
  });

  useEffect(() => {
    if (isLoaded && userPosition) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: userPosition,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: userPosition,
        map: map,
      });
    }
  }, [isLoaded, userPosition]);

  return (
    <div>
      {loading && <p className="text-gray-700 text-center p-4">Loading map...</p>}
      {locationError && <p className="text-red-500 text-center p-4">Error fetching location: {locationError}</p>}
      <div style={containerStyle}></div>
    </div>
  );
};

export default Map;
