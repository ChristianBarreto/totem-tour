import Table from "../../../../components/organisms/Table";
import { useNavigate } from "react-router-dom";
import { getRegions } from "../../../../api/regions/api";
import { TableButton } from "../../../../components/organisms/Table/TableButton";

export default function RegionsPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/regions/${id}`)
  }

  const tableHeader = [
    {name: "Nome", value: "name"},
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
      <p>Regiões</p>
      <Table
        tableName="Slides"
        tableHeader={tableHeader}
        tableFetch={getRegions}
        sort="order"
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/regions/add')}>Nova região</button>
      </div>
    </div>
  )
}