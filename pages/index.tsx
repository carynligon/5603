import { useRouter } from "next/router";
import placesData from "../data/places.json";

export default function Home(): JSX.Element {
  const { push } = useRouter();

  return (
    <div>
      <ul>
        {Object.keys(placesData).map((key) => {
          const place = placesData[key];
          return (
            <li>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
