import Table from "../../../../components/organisms/Table";
import { getAdminPurchases } from "../../../../api/purchases/api";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TablePrice } from "../../../../components/organisms/Table/TablePrice";
import { TableDateTime } from "../../../../components/organisms/Table/TableDateTime";

export default function PurchasesPage() {
  const navigate = useNavigate();
  const handleClick = (purchaseId: string) => {
    navigate(`/admin/purchases/${purchaseId}`)
  }

  const tableHeader = [
    {name: "Data da compra", value: "timestamp", component: <TableDateTime /> },
    {name: "Valor", value: "paymentValue", component: <TablePrice />},
    {name: "Totem venda", value: "totemNickName"},
    {name: "Pagamento", value: "payementCaptured", component: <TableBeacon />},
    {name: "Msg cliente", value: "customerMsg", component: <TableBeacon />},
    {name: "Msg ops.", value: "operatorsMsg", component: <TableBeacon />},
    {name: "Msg parceiro", value: "partnerMsg", component: <TableBeacon />},
    {name: "Ops. conf.", value: "operatorsConfirmed", component: <TableBeacon />},
    {name: "Actions", value: "id", component: (<TableButton label="Editar" onClickEvent={(id) => handleClick(id)} />)},
  ]
  
  return (
    <div>
      <p>Vendas</p>
      <Table
        tableName="Vendas"
        tableHeader={tableHeader}
        tableFetch={() => getAdminPurchases({timestamp: {gt: {num: 0}}, limit: 10, orderBy: {desc: 'timestamp'}})}
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/purchases/add')}>Nova venda</button>
      </div>
    </div>
  )
}