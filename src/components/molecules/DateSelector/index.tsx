import dayjs from "dayjs";
import { useRef } from "react";

import 'dayjs/locale/pt-br'
import { Availability, Availabilities } from "../../../api/availabilities/types";



dayjs.locale('pt')

export default function DateSelector({
  setAvailability,
  availabilities,
  unavailableToday
}: {
  setAvailability: (date: Availability | null) => void,
  availabilities: Availabilities
  unavailableToday: boolean
}) {

  const selectRef = useRef<HTMLSelectElement>(null)

  const isDisabled = (availabilities.length === 0)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const avail = {...availabilities[Number(e.target.value)]}
    setAvailability(avail)
  }

  const today = dayjs().locale('pt-br').format('YYYY-MM-DD')

  return (
    <div className="mb-4">
      <select
        className="select select-bordered border-indigo-300 select-lg bg-white ml-auto w-full"
        ref={selectRef}
        disabled={isDisabled}
        onChange={(e) => handleSelect(e)}
        defaultValue={0}
      >
        {isDisabled ? (
          <option disabled value={0}>Sem datas disponíveis</option>
        ):(
          <option disabled value={0}>Selecione a data</option>
        )}
        {availabilities.map((option, index) => {
          if ((option.date === today) && unavailableToday ){
            return null
          }
          return (
            <option key={option.date} value={index}>{
              dayjs(option.date).locale('pt-br').format('DD/MM/YYYY - (dddd)')
            }</option>
          )
        })}
      </select>
    </div>


    
  )
}
