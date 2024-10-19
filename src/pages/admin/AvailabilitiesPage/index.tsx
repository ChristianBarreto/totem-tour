import AvailabilityTable from "../../../components/molecules/AvailabilityTable";

export default function AvailabilitiesPage() {

  return (
    <div>
      <p>Disponibilidades</p>
      <AvailabilityTable filter={["!==", "isTest"]} sort="cityId" />
      <AvailabilityTable filter={["===", "isTest"]} sort="cityId" />
    </div>
  )
}