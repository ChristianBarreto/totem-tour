import IconXCircle from "../../atoms/IconXCircle"

const CauseDescription = (code: number) =>{
    if (code === 8) {
      return <p>Motivo: Informações do usuário inválidas.</p>
    } else if (code === 23) {
      return <p>Motivo: Erro no servidor Totem Tour.</p>
    } else if (code === 4050) {
      return <p>Motivo: Email do usuário inválido.</p>
    } else if (code === 4049) {
      return <p>Motivo: O valor da compra não é válido.</p>
    }
    return <p>Motivo: Erro no servidor Totem Tour.</p>
}

export default function PaymentError({
  errorData
}: {
  errorData: any
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
            {errorData?.cause?.map((cause: any, index: string) => (
              <div key={index}>
                {CauseDescription(cause.code)}
              </div>
            ))}
          </div>
          <p className="text-xl mb-4 text-center">Volte aos meios de pagamento e faça uma nova solicitação.</p>
        </div>
      </div>
    </div>


  )
}