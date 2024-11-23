import IconClock from "../../atoms/IconClock";
import IconXCircle from "../../atoms/IconXCircle";

type Cause = {
  code: number,
};

type PaymentErrorType = {
  cause?: Cause[],
};

const CauseDescription = (code: number) =>{
    if (code === 8) {
      return <p className=" text-center"><span className="font-bold">Motivo: </span>Informações do usuário inválidas.</p>
    } else if (code === 23) {
      return <p className=" text-center"><span className="font-bold">Motivo: </span>Erro no servidor Totem Tour.</p>
    } else if (code === 4050) {
      return <p className=" text-center"><span className="font-bold">Motivo: </span>Email do usuário inválido.</p>
    } else if (code === 4049) {
      return <p className=" text-center"><span className="font-bold">Motivo: </span>O valor da compra não é válido.</p>
    }
    return <p className=" text-center"><span className="font-bold">Motivo: </span>Erro no servidor Totem Tour.</p>
}

export default function PaymentError({
  errorData
}: {
  errorData: PaymentErrorType
}) {
  console.log("Error data:", errorData)
  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-white border md:w-100">
        <div className="card-body">
          <p className="text-xl text-red-400 mb-4 text-center">Aconteceu um erro na solicitação de pagamento:</p>
          <div className="flex justify-center">
            <IconXCircle classes={"text-red-500 size-36"} />
          </div>
          <div>
            {errorData === undefined && (<p>Motivo: Erro de conexão com o servidor.</p>)}
            {errorData?.cause?.map((cause: Cause, index: number) => (
              <div key={index}>
                {CauseDescription(cause.code)}
              </div>
            ))}
          </div>
          <p className="text-xl mb-4 text-center">Reinicie a compra e tente novamente.</p>
          <div className="flex">
            <IconClock classes="size-6 animate-bounce"/>
            <p className="text-xl mb-4 text-center"> Sua sessão será encerrada em 30 segundos.</p>
          </div>
        </div>
      </div>
    </div>


  )
}