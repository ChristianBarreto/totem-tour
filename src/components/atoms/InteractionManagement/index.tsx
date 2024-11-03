import { ReactNode, useEffect, useRef } from "react";
import { useCounter } from "../../../context/CounterContext";

export default function InteractionManagement({
  children
}: {
  children: ReactNode
}) {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
  const appRef = useRef()as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    appRef.current?.addEventListener("mousedown", e => {
      dispatch({type: 'res_redirectToInit'})
    });
  }, []);

  return (
    <span ref={appRef}>
      {children}
    </span>
  )
}