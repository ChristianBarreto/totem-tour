import Table from "../../../../components/organisms/Table";
import { getAdminPurchases } from "../../../../api/purchases/api";
import { useEffect, useRef, useState } from "react";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


const DateTime = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current?.parentElement){
      const date = ref.current?.parentElement.className
      setValue(dayjs(Number(date)).locale('pt-br').format('DD/MM/YYYY HH:mm'));
    }
  }, []);

  return <div ref={ref}>{value}</div>
}

const Value = () => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current?.parentElement){
      const value = ref.current?.parentElement.className
      setValue(value);
    }
  }, []);

  return <div ref={ref}>R${value},00</div>
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
      Ver
    </button>
  )
}

export default function PurchasesPage() {
  const navigate = useNavigate()
  const handleClick = (purchaseId: string) => {
    navigate(`/admin/purchases/${purchaseId}`)
  }
  const tableHeader = [
    {name: "Data da compra", value: "timestamp", component: <DateTime /> },
    {name: "Valor", value: "paymentValue", component: <Value />},
    {name: "Pagamento", value: "payementCaptured", component: <Light />},
    {name: "Msg cliente", value: "customerMsg", component: <Light />},
    {name: "Msg op.", value: "operatorMsg", component: <Light />},
    // {name: "Msg parceiro", value: "customerComm", component: <Light />},
    {name: "Totem venda", value: "totemId"},
    {name: "Actions", value: "id", component: (<TableButton onClickEvent={(id) => handleClick(id)} />)},
  ]

  return (
    <div>
      <p>Compras</p>
      <Table
        tableName="Vendas"
        tableHeader={tableHeader}
        tableFetch={getAdminPurchases}
      />
    </div>
  )
}