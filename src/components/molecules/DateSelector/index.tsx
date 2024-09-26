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

    <div className="join">
      <select
        className={`join-item border w-52 text-start pl-4 disabled:bg-indigo-200`}
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
      <button
        className="btn bg-indigo-600 hover:bg-indigo-400 join-item text-base-100 disabled:bg-indigo-200"
        onClick={openSelect}
        disabled={isDisabled}
      >
        <IconCalendar/>
      </button>
    </div>


    
  )
}
