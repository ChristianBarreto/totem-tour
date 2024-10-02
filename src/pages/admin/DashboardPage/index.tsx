import Table from "../../../components/organisms/Table";
import { getPurchaseItens } from "../../../api";

export default function DashboardPage() {

  const tableHeader = [
    {name: "Data"},
    {name: "Produto"},
    {name: "Qtd"},
    {name: "Cidade"},
    {name: "Pagamento"},
    {name: "Cliente comm"},
    {name: "Agência comm"},
  ]

  

  return (
    <div>
      <p>Dashboard</p>
      <Table tableHeader={tableHeader} tableFetch={getPurchaseItens} />
    </div>
  )
}