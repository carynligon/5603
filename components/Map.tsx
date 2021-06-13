import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export interface MapProps {
  coords: {
    y: string;
    x: string;
  }[];
}

const Map = ({ coords, currentIndex, updateIndex }): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  console.log(coords);

  return (
    <div>
      {isLoaded && coords && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords[0]}
          options={{ mapId: "d2d3d1776848fee0" }}
          zoom={12}
        >
          {coords.map((coord, i) => {
            return (
              <Marker
                onClick={() => updateIndex(i)}
                opacity={i === currentIndex ? 1 : 0.5}
                position={coord}
                key={`place-marker-${coords.lat}`}
              />
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
