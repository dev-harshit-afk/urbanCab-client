import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import React, { useState, useRef, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};
// const initialOrigin = { lat: 28.6139, lng: 77.209 }; // New Delhi
// const destination = { lat: 28.5355, lng: 77.391 }; // Noida

const MapComponent = ({
  setDistanceLeft,
  setTimeLeft,
  initialOrigin,
  destination,
}) => {
  const [directions, setDirections] = useState(null);
  const [vehiclePosition, setVehiclePosition] = useState(initialOrigin);
  const intervalRef = useRef(null);

  // Fetch directions from a given origin to destination
  const fetchDirections = (origin) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          // Extract and set distance and duration
          const leg = result.routes[0].legs[0];
          setDistanceLeft(leg.distance.text);

          setTimeLeft(leg.duration.text);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  // Initial directions fetch
  // useEffect(() => {
  //   if (window.google && window.google.maps) {
  //     fetchDirections(initialOrigin);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // Simulate live tracking (move vehicle marker towards destination)
  useEffect(() => {
    if (!directions) return;

    const path = directions.routes[0].overview_path;
    let step = 0;

    intervalRef.current = setInterval(() => {
      if (step < path.length) {
        const newPosition = {
          lat: path[step].lat(),
          lng: path[step].lng(),
        };
        setVehiclePosition(newPosition);
        fetchDirections(newPosition); // Update directions, distance, and duration
        step++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, 10000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [directions]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={vehiclePosition}
        zoom={12}
        onLoad={() => fetchDirections(initialOrigin)}
      >
        <Marker position={vehiclePosition} label="🚗" />
        <Marker position={destination} label="🏁" />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
