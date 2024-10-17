import { forwardRef } from "react"

type Props = {
  value: boolean
  insideText?: string,
  outsideText?: string,
}

type Ref = HTMLDivElement;

export const RedGreenLight = forwardRef<Ref, Props>(function RedGreenLight(props, ref) {
  return (
    <div className="p-0" ref={ref}>
      {props.value ? (
        <div className="flex">
          <div className="text-center badge badge-primary badge-md">{props.insideText}</div>
          <p>{props.outsideText}</p>
        </div>
      ) : (
        <div className="flex">
          <p className="text-center badge bg-red-500 badge-md">{props.insideText}</p>
          <p>{props.outsideText}</p>
        </div>
      )}
    </div>
  )
});