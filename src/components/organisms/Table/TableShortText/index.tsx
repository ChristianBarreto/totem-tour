import { useEffect, useRef, useState } from "react";

export const TableShortText = ({
  size = 20,
}: {
  size?: number
}) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current?.parentElement){
      setValue(ref.current?.parentElement?.className);
    }
  }, []);

  return <div ref={ref} className="tooltip" data-tip={value}>{value.slice(0, size)}{value.length > size && "..."}</div>
}