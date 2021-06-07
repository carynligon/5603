import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import placesData from "../../data/places.json";
import styles from "../../styles/Place.module.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home(): JSX.Element {
  const {
    query: { place: placeKey },
  } = useRouter();
  const [latLang, setLatLang] = useState();
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapStuff = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const getLatLangFromAddress = async (address: string | string[]) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=$${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const responseJSON = await response.json();
    setLatLang(responseJSON.results[0].geometry.location);
  };

  console.log("dsfdsfsdf", placeKey);

  useEffect(() => {
    if (Array.isArray(placeKey)) {
      return;
    }
    const address = (placesData[placeKey] || {}).address;
    getLatLangFromAddress(address);
  }, [placeKey]);

  const placeObj = Array.isArray(placeKey) ? {} : placesData[placeKey];

  return (
    <div className={styles.container}>
      {mapStuff.isLoaded && latLang && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={latLang}
          options={{ mapId: "d2d3d1776848fee0" }}
          zoom={15}
        >
          <Marker position={latLang} />
        </GoogleMap>
      )}

      {placeObj && (
        <div>
          <div onClick={() => getLatLangFromAddress(placeObj.address)}>
            <h4 className={styles.placeName}>{placeObj.name}</h4>
            <span className={styles.address}>{placeObj.address}</span>
            <div>
              <p>{placeObj.price}</p>
            </div>
            <div>
              <h5>Food</h5>
              <p>{placeObj.food_rec}</p>
            </div>
            <div>
              <h5>Drink</h5>
              <p>{placeObj.drink_rec}</p>
            </div>
            <div>
              <p>
                {placeObj.reservation_recommended
                  ? "We recommend you make a reservation."
                  : "No need to make a reservation!"}
              </p>
            </div>
          </div>
          <a href={placeObj.url} target="_none">
            website
          </a>
        </div>
      )}
    </div>
  );
}
