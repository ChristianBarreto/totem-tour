import { useEffect, useRef, useState } from "react";

export const TableThumb = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current?.parentElement ){
      setValue(ref.current?.parentElement?.className)
    }
  }, [])


  return (
    <div className="flex items-center gap-3" ref={ref}>
      <div className="avatar">
        <div className="mask rounded h-20 w-20">
          <img
            src={value}
            alt="Avatar Tailwind CSS Component" />
        </div>
      </div>
    </div>
  )
}