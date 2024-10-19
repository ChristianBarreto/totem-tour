import dayjs from "dayjs";
import IconCalendar from "../../atoms/IconCalendar";
import { useRef } from "react";

import 'dayjs/locale/pt-br'
import { Availabilitiy, Availabilities } from "../../../api/api";



dayjs.locale('pt')

export default function DateSelector({
  setAvailability,
  availabilities,
  unavailableToday
}: {
  setAvailability: (date: Availabilitiy | null) => void,
  availabilities: Availabilities
  unavailableToday: boolean
}) {

  const selectRef = useRef<HTMLSelectElement>(null)

  const isDisabled = (availabilities.length === 0)

  const openSelect = () => {
    if (selectRef.current) {
      selectRef.current.focus()
      selectRef.current.click()
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const avail = {...availabilities[Number(e.target.value)]}
    setAvailability(avail)
  }

  const today = dayjs().locale('pt-br').format('YYYY-MM-DD')

  return (
    <div className="ml-5">
      <select
        className="select select-bordered border-indigo-200 select-lg bg-white ml-auto"
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
