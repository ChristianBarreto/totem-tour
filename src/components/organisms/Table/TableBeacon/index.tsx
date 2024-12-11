import { useEffect, useRef, useState } from "react";
import { RedGreenLight } from "../../../atoms/RedGreenLight";

export const TableBeacon = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current?.parentElement){
      setValue(ref.current?.parentElement?.id);
    }
  }, []);

  return <RedGreenLight value={value === "true" ? true : false} ref={ref} />
}