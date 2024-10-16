import { forwardRef } from "react"

type Props = {
  value: boolean
}

type Ref = HTMLDivElement;

export const RedGreenLight = forwardRef<Ref, Props>(function RedGreenLight(props, ref) {
  return (
    <div className="p-0" ref={ref}>
      {props.value ? (
        <div className="flex justify-center">
          <div className="text-center badge badge-primary badge-md"></div>
        </div>  
      ) : (
        <div className="flex justify-center">
          <p className="text-center badge bg-red-500 badge-md"></p>
        </div>
      )}
    </div>
  )
});