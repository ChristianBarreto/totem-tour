import { Cities, City } from "../../../api/api"

export default function CitySelect({
  cities,
  selectedCity,
  setSelectedCity,
}: {
  cities: Cities
  selectedCity: string,
  setSelectedCity: (value: string) => void,

}) {
  return (
    <div className="block md:hidden p-2 bg-orange-500">
      <label className="form-control w-full">
        <select
          className="select select-bordered w-full"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          defaultValue=""
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </label>
    </div>
  )
}