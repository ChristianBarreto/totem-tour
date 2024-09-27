import { ReactNode, useEffect, useRef } from "react";

export default function InteractionManagement({
  children
}: {
  children: ReactNode
}) {
  const appRef = useRef()as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    
    const timer = setTimeout(() => {
      console.log("Time is over")
      if (typeof window !== 'undefined') {
        if (!(window.location.href === ('http://localhost:3000/totem' || 'https://totem-tour.web.app/totem'))) {
          console.log("redirect")
          window.location.href = `${window.location.href}totem`;
        }
      }
    }, 2000);

    appRef.current?.addEventListener("mousedown", e => {
      clearTimeout(timer)
    });

  }, []);

  return (
    <div ref={appRef}>
      {children}
    </div>
  )
}