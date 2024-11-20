import Table from "../../../../components/organisms/Table";
import { getTotems } from "../../../../api/totems/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";
import dayjs from "dayjs";

const TableEditButton = ({
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

const ShowTests = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current?.parentElement ){
      setValue(ref.current?.parentElement?.className)
    }
  }, [])


  return (
    <span ref={ref}>{value === "true" ? (
      <p className="font-bold text-red-500">MOSTRAR!</p>
    ): (
      <p className="">Não mostrar</p>
    )}</span>
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

  const lessThen5Minutes = dayjs().diff(dayjs(Number(value)), 'minute') < 7;

  return (
    <div ref={ref}>
      {value ? (
        <RedGreenLight value={lessThen5Minutes} outsideText={dayjs(Number(value)).format('DD/MM HH:mm')} />
      ): (
        <p>(sem dados)</p>
      )}
    </div>
  )
}


export default function TotemsPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/totems/${id}`)
  }

  const tableHeader = [
    {name: "Totem", value: "nickName"},
    {name: "Estabelecimento", value: "locationDescription"},
    {name: "Responsável", value: "responsiblePerson"},
    {
      name: "Ping",
      value: 'lastPing',
      component: <Light />
    },
    {
      name: "Mostrar testes",
      value: 'showTestProduct',
      component: (<>
        <ShowTests />
      </>)
    },
    {
      name: "Ações",
      value: 'id',
      component: (<>
        <TableEditButton onClickEvent={(id) => handleClick(id)} />
      </>)
    },
  ]

  return (
    <div className="">
      <p>Totems</p>
      <Table
        tableName="Totems"
        tableHeader={tableHeader}
        tableFetch={getTotems}
        sort="nickName"
      />
      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/totems/add')}>Novo totem</button>
      </div>
    </div>
  )
}