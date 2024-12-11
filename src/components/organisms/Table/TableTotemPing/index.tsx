import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { RedGreenLight } from "../../../atoms/RedGreenLight";

export const TableTotemPing = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current?.parentElement){
      setValue(ref.current?.parentElement?.className);
    }
  }, []);

  const lessThen5Minutes = dayjs().diff(dayjs(Number(value)), 'minute') < 7;

  return (
    <div ref={ref}>
      {value ? (
        <RedGreenLight value={lessThen5Minutes} outsideText={dayjs(Number(value)).format('DD/MM HH:mm')} />
      ): (
        <p>(sem dados)</p>
      )}
    </div>
  )
};