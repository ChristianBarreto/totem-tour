import Table from "../../../../components/organisms/Table";
import { getProducts } from "../../../../api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const TableEditButton = ({
  onClickEvent,
}: {
  onClickEvent?: (value: string) => void,
}) => {

  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current?.parentElement && onClickEvent){
      onClickEvent(buttonRef.current?.parentElement?.id)
    }
  }

  return (
    <button className="btn btn-sm" onClick={handleClick} ref={buttonRef}>
      Edit
    </button>
  )
}

export default function ProductsPage() {
  const navigate = useNavigate()
  const handleClick = (productId: string) => {
    navigate(`/admin/products/${productId}`)
  }


  const tableHeader = [
    {name: "Nome", value: "name"},
    {name: "Cidade", value: "location"},
    {name: "Mostrar Display", value: "showDisplay"},
    {name: "Disponível", value: "isAvailable"},
    {name: "Opções", value: 'id', component: (<TableEditButton onClickEvent={(id) => handleClick(id)} />)}
  ]

  return (
    <div>
      <p>Produtos</p>
      <Table
        tableName="Produtos"
        tableHeader={tableHeader}
        tableFetch={getProducts}
      />
    </div>
  )
}