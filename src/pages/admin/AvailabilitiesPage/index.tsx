import { useEffect, useState } from "react";
import AvailabilityTable from "../../../components/molecules/AvailabilityTable";
import { deleteAvailabilities, getAvailabilities } from "../../../api/availabilities/api";
import dayjs from "dayjs";
import { Availabilities } from "../../../api/availabilities/types";

export default function AvailabilitiesPage() {
  const [oldAvailabilities, setOldAvailabilities] = useState<Availabilities>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOldAvailabilities = () => {
    setIsLoading(true);
    getAvailabilities({date: {lt: {str: dayjs().locale('pt-br').format('YYYY-MM-DD')}}, orderBy: "date", order: "asc"}).then((res) => {
      setOldAvailabilities(res as Availabilities);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Err", err)
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getOldAvailabilities();
  }, [])

  const handleDeleteOld = () => {
    setIsLoading(true);
    deleteAvailabilities({date: {lt: {str: dayjs().locale('pt-br').format('YYYY-MM-DD')}}, orderBy: "date", order: "asc"}).then(() => {
      getOldAvailabilities();
      setIsLoading(false);
    }).catch((err) => {
      console.log("Err", err);
      setIsLoading(false);
    });

  }

  return (
    <div>
      <p>Disponibilidades</p>
      <button
        className="btn btn-sm bg-red-400 text-white"
        disabled={(oldAvailabilities.length === 0) || isLoading}
        onClick={handleDeleteOld}
      >
        {!isLoading ? `Deletar antigas (${oldAvailabilities.length})` : "Carregando..."}
      </button>
      <AvailabilityTable filter={["!==", "isTest"]} sort="cityId" />
      <AvailabilityTable filter={["===", "isTest"]} sort="cityId" />
    </div>
  )
}