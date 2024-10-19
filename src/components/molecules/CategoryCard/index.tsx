import { City } from "../../../api/api"
import styles from './CategoryCard.module.css';

export default function CategoryCard({
  city,
  selectedCity,
  setSelectedCity,
}: {
  city: City
  selectedCity: string,
  setSelectedCity: (id: string) => void,
}) {
  let active = false;

  if (city.id === selectedCity) {
    active = true;
  }

  return (
    <li onClick={() => setSelectedCity(city.id)} className={`${active && styles.active}`}><a>
      <div className="card card-compact bg-base-100 w-65 shadow-xl">
        <figure>
          <img
            src={city.imgUrl}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{city.name}</h2>
        </div>
      </div>
    </a></li>
  )
}