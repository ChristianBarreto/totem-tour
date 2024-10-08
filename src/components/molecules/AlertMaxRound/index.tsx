import { useEffect } from "react"

export default function AlertMaxRound({
  setMaxRound
}:{
  setMaxRound: (value: boolean) => void
}) {
  useEffect(() => {
    setTimeout(() => {
      setMaxRound(false)
    }, 9000)
  }, []);

  return (
    <div
      role="alert"
      className="alert alert-info"
      onClick={() => setMaxRound(false)}
      style={{position: 'absolute', width: '420px', marginTop: '-170px', marginLeft: '40px'}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span className="text-base">Para reservar mais pessoas, adicione o mesmo passeio ao carrinho duas vezes.</span>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
      <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
      </svg>
    </div>
  )
}