import dayjs from "dayjs";
import IconCalendar from "../../atoms/IconCalendar";
import { useRef } from "react";

import 'dayjs/locale/pt-br'
import { Availabilitiy, Availabilities } from "../../../api";



dayjs.locale('pt')

export default function DateSelector({
  setAvailability,
  availabilities,
}: {
  setAvailability: (date: Availabilitiy | null) => void,
  availabilities: Availabilities
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
        {availabilities.map((option, index) => (
          <option key={option.date} value={index}>{
            dayjs(option.date).locale('pt-br').format('dddd, DD/MM/YYYY')
          }</option>
        ))}
      </select>
    </div>


    
  )
}
