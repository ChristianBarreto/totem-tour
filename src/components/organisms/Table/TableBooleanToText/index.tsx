import { useEffect, useRef, useState } from "react";

export const TableBooleanToText = ({
  textTrue,
  textFalse,
}: {
  textTrue?: string,
  textFalse?: string,
}) => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current?.parentElement ){
      setValue(ref.current?.parentElement?.className)
    }
  }, [])

  return (
    <span ref={ref}>{value === "true" ? (
      <p className="font-bold text-red-500">{textTrue ? textTrue : "Verdadeiro"}</p>
    ): (
      <p className="">{textFalse ? textFalse : "Falso"}</p>
    )}</span>
  )
}