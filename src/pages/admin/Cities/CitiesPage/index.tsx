import Table from "../../../../components/organisms/Table";
import { useNavigate } from "react-router-dom";
import { getCities } from "../../../../api/cities/api";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TableThumb } from "../../../../components/organisms/Table/TableThumb";

export default function CitiesPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/cities/${id}`)
  }

  const tableHeader = [
    {name: "Imagem", value: "imgUrl", component: <TableThumb />},
    {name: "Nome", value: "name"},
    {name: "Região", value: "regionName"},
    {name: "Ativo",value: 'active', component: <TableBeacon />},
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
      <p>Cidades</p>
      <Table
        tableName="Slides"
        tableHeader={tableHeader}
        tableFetch={getCities}
        sort="order"
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/cities/add')}>Nova cidade</button>
      </div>
    </div>
  )
}