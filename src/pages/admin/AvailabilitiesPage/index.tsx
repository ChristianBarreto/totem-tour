import { useEffect, useState } from "react";
import AvailabilityTable from "../../../components/molecules/AvailabilityTable";
import { deleteAvailabilities, getAvailabilities } from "../../../api/availabilities/api";
import dayjs from "dayjs";
import { Availabilities } from "../../../api/availabilities/types";

export default function AvailabilitiesPage() {
  const [oldAvailabilities, setOldAvailabilities] = useState<Availabilities>([]);

  const getOldAvailabilities = () => {
    getAvailabilities({date: {lt: {str: dayjs().locale('pt-br').format('YYYY-MM-DD')}}, orderBy: "date", order: "asc"}).then((res) => {
      setOldAvailabilities(res as Availabilities);
    }).catch((err) => {
      console.log("Err", err)
    });
  }

  useEffect(() => {
    getOldAvailabilities();
  }, [])

  const handleDeleteOld = () => {
    deleteAvailabilities({date: {lt: {str: dayjs().locale('pt-br').format('YYYY-MM-DD')}}, orderBy: "date", order: "asc"}).then(() => {
      getOldAvailabilities();
    }).catch((err) => {
      console.log("Err", err)
    });

  }

  return (
    <div>
      <p>Disponibilidades</p>
      <button className="btn btn-sm bg-red-400 text-white" disabled={oldAvailabilities.length === 0} onClick={handleDeleteOld}>Delete old ({oldAvailabilities.length})</button>
      <AvailabilityTable filter={["!==", "isTest"]} sort="cityId" />
      <AvailabilityTable filter={["===", "isTest"]} sort="cityId" />
    </div>
  )
}