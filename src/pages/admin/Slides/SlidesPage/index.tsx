import Table from "../../../../components/organisms/Table";
import { useNavigate } from "react-router-dom";
import { getSlides } from "../../../../api/slides/api";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TableThumb } from "../../../../components/organisms/Table/TableThumb";

export default function SlidesPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/slides/${id}`)
  }

  const tableHeader = [
    {name: "Imagem", value: "img", component: <TableThumb />},
    {name: "Descrição", value: "description"},
    {name: "Ordem", value: "order"},
    {name: "Duração (s)",value: 'duration'},
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
      <p>Slides</p>
      <Table
        tableName="Slides"
        tableHeader={tableHeader}
        tableFetch={getSlides}
        sort="order"
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/slides/add')}>Novo totem</button>
      </div>
    </div>
  )
}