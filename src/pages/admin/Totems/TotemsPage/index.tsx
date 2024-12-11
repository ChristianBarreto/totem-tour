import Table from "../../../../components/organisms/Table";
import { getTotems } from "../../../../api/totems/api";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableTotemPing } from "../../../../components/organisms/Table/TableTotemPing";
import { TableBooleanToText } from "../../../../components/organisms/Table/TableBooleanToText";

export default function TotemsPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/totems/${id}`)
  }

  const tableHeader = [
    {name: "Totem", value: "nickName"},
    {name: "Estabelecimento", value: "locationDescription"},
    {name: "Responsável", value: "responsiblePerson"},
    {name: "Região", value: "regionName"},
    {
      name: "Ping",
      value: 'lastPing',
      component: <TableTotemPing />
    },
    {
      name: "Mostrar testes",
      value: 'showTestProduct',
      component: (<>
        <TableBooleanToText textTrue="MOSTRAR!" textFalse="Não mostrar"/>
      </>)
    },
    {
      name: "Ações",
      value: 'id',
      component: (<>
        <TableButton label="Editar" onClickEvent={(id) => handleClick(id)} />
      </>)
    },
  ]

  return (
    <div className="">
      <p>Totems</p>
      <Table
        tableName="Totems"
        tableHeader={tableHeader}
        tableFetch={() => getTotems({params: {orderBy: {name: "asc"}}})}
        sort="nickName"
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/totems/add')}>Novo totem</button>
      </div>
    </div>
  )
}