import Table from "../../../../components/organisms/Table";
import { getProducts } from "../../../../api/products/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";

const TableButton = ({
  onClickEvent,
}: {
  onClickEvent?: (value: string) => void,
}) => {

  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current?.parentElement && onClickEvent){
      onClickEvent(buttonRef.current?.parentElement?.className)
    }
  }

  return (
    <button className="btn btn-sm" onClick={handleClick} ref={buttonRef}>
      Edit
    </button>
  )
}

const Light = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    if (ref.current?.parentElement){
      setValue(ref.current?.parentElement?.className);
    }
  }, []);

  return <RedGreenLight value={value === "true" ? true : false} ref={ref} />
}

const Short = ({
  size = 20,
}: {
  size?: number
}) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    if (ref.current?.parentElement){
      setValue(ref.current?.parentElement?.className);
    }
  }, []);

  return <div ref={ref} className="tooltip" data-tip={value}>{value.slice(0, size)}{value && "..."}</div>
}

export default function ProductsPage() {
  const navigate = useNavigate()
  const handleClick = (productId: string) => {
    navigate(`/admin/products/${productId}`)
  }

  const tableHeader = [
    {name: "Nome", value: "name"},
    {name: "Local", value: "address", component: (<Short />)},
    {name: "Localiz.", value: "location", component: (<Short />)},
    {name: "Horário", value: "time", component: (<Short />)},
    {name: "Duração", value: "duration"},
    {name: "Nome op.", value: "operatorName", component: (<Short size={23} />)},
    {name: "Tel. op.", value: "operatorPhone"},
    {name: "Show", value: "showDisplay", component: (<Light />)},
    {name: "Disp.", value: "isAvailable", component: (<Light />)},
    {name: "Opções", value: 'id', component: (<TableButton onClickEvent={(id) => handleClick(id)} />)}
  ]

  return (
    <div>
      <p>Produtos</p>
      <Table
        tableName="Produtos"
        tableHeader={tableHeader}
        tableFetch={getProducts}
        filter={['!==', 'isTest']}
        sort="cityId"
      />

      <Table
        tableName="⚠️Produtos teste"
        tableHeader={tableHeader}
        tableFetch={getProducts}
        filter={['===', 'isTest']}
        sort="cityId"
      />

      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/products/add')}>Novo produto</button>
      </div>
    </div>
  )
}