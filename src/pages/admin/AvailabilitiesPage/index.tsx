import Table from "../../../components/organisms/Table";
import { getAdminPurchaseItens } from "../../../api";
import AvailabilityTable from "../../../components/molecules/AvailabilityTable";

export default function AvailabilitiesPage() {

  const tableHeader = [
    {name: "Data", value: "date"},
    {name: "Produto", value: "productName"},
    {name: "Qtd", value: "qty"},
    {name: "Cidade", value: "location"},
    {name: "Pagamento", value: "paymentCaptured"},
    {name: "Cliente comm", value: "customerComm"},
    {name: "Agência comm", value: "agencyComm"},
  ]

  return (
    <div>
      <p>Disponibilidades</p>
      <AvailabilityTable filter={["!==", "isTest"]}/>
      <AvailabilityTable filter={["===", "isTest"]}/>
    </div>
  )
}