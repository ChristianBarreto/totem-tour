import { useEffect, useRef, useState } from "react";
import { displayPrice } from "../../../../helpers";

export const TablePrice = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current?.parentElement){
      const value = ref.current?.parentElement.className
      setValue(value);
    }
  }, []);

  return <div ref={ref}>{displayPrice(Number(value))}</div>
}