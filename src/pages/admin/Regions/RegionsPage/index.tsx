import Table from "../../../../components/organisms/Table";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSlides } from "../../../../api/slides/api";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";


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
      Editar
    </button>
  )
}

const Thumb = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current?.parentElement ){
      setValue(ref.current?.parentElement?.className)
    }
  }, [])


  return (
    <div className="flex items-center gap-3" ref={ref}>
      <div className="avatar">
        <div className="mask rounded h-20 w-20">
          <img
            src={value}
            alt="Avatar Tailwind CSS Component" />
        </div>
      </div>
    </div>
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


export default function RegionsPage() {
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/slides/${id}`)
  }

  const tableHeader = [
    {name: "Imagem", value: "img", component: <Thumb />},
    {name: "Descrição", value: "description"},
    {name: "Ordem", value: "order"},
    {name: "Duração (s)",value: 'duration'},
    {name: "Ativo",value: 'active', component: <Light />},
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
      <p>Regiões</p>
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