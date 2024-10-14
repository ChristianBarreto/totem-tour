import Table from "../../../components/organisms/Table";
import { getAdminPurchaseItens } from "../../../api";

export default function DashboardPage() {

  const tableHeader = [
    {name: "Data", value: "date"},
    {name: "Produto", value: "productName"},
    {name: "Qtd", value: "qty"},
    {name: "Cliente", value: "customerName"},
    {name: "Cidade", value: "location"},
    {name: "Pagamento", value: "paymentCaptured"},
    {name: "Cliente comm", value: "customerComm"},
    {name: "Agência comm", value: "agencyComm"},
  ]

  return (
    <div className="">
      <p>Dashboard</p>
      <Table
        sort="date"
        tableName="Reservas à cumprir"
        tableHeader={tableHeader}
        tableFetch={getAdminPurchaseItens}
      />
    </div>
  )
}