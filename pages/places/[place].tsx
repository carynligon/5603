import { useRouter } from "next/router";
import placesData from "../../data/places.json";
import styles from "../../styles/Place.module.css";
import Map from "../../components/Map";
import { getLatLangFromAddress } from "../../utils/maps";

export default function Home(): JSX.Element {
  const {
    query: { place: placeKey },
  } = useRouter();

  const placeObj = Array.isArray(placeKey) ? {} : placesData[placeKey];

  return (
    <div className={styles.container}>
      <Map coords={[placeObj.coords]} />
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
