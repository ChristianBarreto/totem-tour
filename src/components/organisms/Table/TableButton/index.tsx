import { useRef } from "react"

export const TableButton = ({
  label,
  onClickEvent,
}: {
  label: string,
  onClickEvent?: (value: string) => void,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current?.parentElement && onClickEvent){
      onClickEvent(buttonRef.current?.parentElement?.className)
    }
  }

  return (
    <button className="btn btn-sm" onClick={handleClick} ref={buttonRef}>
      {label}
    </button>
  )
}