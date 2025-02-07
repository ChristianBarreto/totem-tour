import Table from "../../../../components/organisms/Table";
import { getTotems } from "../../../../api/totems/api";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../../../../components/organisms/Table/TableButton";


export default function UsersPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/totems/${id}`)
  }

  const tableHeader = [
    {name: "Totem", value: "nickName"},
    {name: "Estabelecimento", value: "locationDescription"},
    {name: "Responsável", value: "responsiblePerson"},
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
      <p>Usuários</p>
      {/* <Table
        tableName="Usuários"
        tableHeader={tableHeader}
        tableFetch={getTotems}
        sort="number"
      /> */}
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/users/add')}>Novo usuário</button>
      </div>
    </div>
  )
}