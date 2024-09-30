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

  console.log(errorData)

  return (
    <div>
      <p>Aconteceu um erro na solicitação de pagamento:</p>
      {errorData === undefined && (<p>Motivo: Erro de conexão com o servidor.</p>)}
      {errorData?.cause?.map((cause: any) => (
        <div>
          {CauseDescription(cause.code)}
        </div>
      ))}
    </div>
  )
}