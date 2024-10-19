import Table from "../../../components/organisms/Table";
import { getAdminPurchaseItens } from "../../../api/purchaseitems/api";

export default function CustomerPage() {

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
      <p>Dashboard</p>
      <Table
        tableName="Vendas"
        tableHeader={tableHeader}
        tableFetch={getAdminPurchaseItens}
      />
    </div>
  )
}