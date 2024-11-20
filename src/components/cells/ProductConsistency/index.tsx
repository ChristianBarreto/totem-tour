import { RedGreenLight } from "../../atoms/RedGreenLight";

export default function ProductConsistency({
  canBeDisplayed,
  canBeAvailable,
}: {
  canBeDisplayed: boolean,
  canBeAvailable: boolean,
}) {

  return (
    <div className="flex justify-around p-4 border-solid border-red-500 rounded">
      <div>
        <RedGreenLight value={canBeDisplayed} outsideText={canBeDisplayed ? "Pode ser mostrado no display." : "Não pode ser mostrado no display."} />
        <p className="text-sm">(mensagem se indisponível, imagem, nome, descrição e cidade)</p>
      </div>
      <div>
        <RedGreenLight value={canBeAvailable} outsideText={canBeAvailable ? "Pode ser dispinibilizado." : "Não pode ser disponibilizado."} />
        <p className="text-sm">(detalhes, local, localização, horário, duração, msg alinhamento, capacidade, preços e info operador)</p>
      </div>      
    </div>
  )
}