import { ReactNode } from "react";

export default function TouchInput({
  value,
  name,
  type,
  placeholder,
  icon,
  setSelectedInput,
}:{
  value: string,
  name: string,
  type: string
  placeholder?: string,
  icon?: ReactNode,
  setSelectedInput: (value: string) => void,
}) {

  return (
    <div className="">
      <div 
        className={`
          input input-bordered flex items-center w-full mb-2
        `}
      >
        {icon}
        <input
          type={type}
          className="grow"
          placeholder={placeholder}
          required
          name={name}
          value={value}
          // ref={ref}
          onFocus={() => setSelectedInput(name)}
        />
      </div>
    </div>

  )
}