import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "../hooks/useViewportSize";
import placesData from "../data/places.json";
import Map from "../components/Map";
import styles from "../styles/ListPage.module.css";

export default function Home(): JSX.Element {
  const [currentIndex, updateIndex] = useState(0);
  const { push } = useRouter();
  const { width: viewportWidth } = useWindowSize();

  const coords = Object.entries(placesData).map(([_, place]) => place.coords);

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map
          coords={coords}
          currentIndex={currentIndex}
          updateIndex={updateIndex}
        />
      </div>
      <div>
        {currentIndex > 0 && (
          <button onClick={() => updateIndex(currentIndex - 1)}>
            previous
          </button>
        )}
        <button onClick={() => updateIndex(currentIndex + 1)}>next</button>
      </div>
      <ul
        className={styles.list}
        style={{ transform: `translateX(-${viewportWidth * currentIndex}px)` }}
      >
        {Object.keys(placesData).map((key) => {
          const place = placesData[key];
          return (
            <li style={{ minWidth: viewportWidth }}>
              <div onClick={() => push(`/places/${key}`)}>
                <h4>{place.name}</h4>
                <p>{place.genre}</p>
                <div>
                  <p>{place.price}</p>
                </div>
              </div>
              <a href={place.url} target="_none">
                website
              </a>
              {/* <img className={styles.img} src={place.img} /> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
