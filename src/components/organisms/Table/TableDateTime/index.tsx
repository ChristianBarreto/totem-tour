import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export const TableDateTime = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current?.parentElement){
      const date = ref.current?.parentElement?.className;
      setValue(dayjs(Number(date)).locale('pt-br').format('DD/MM/YYYY HH:mm'));
    }
  }, []);

  return <div ref={ref}>{value}</div>
}