import Table from "../../../components/organisms/Table";
import { getPoss, switchPosMode } from "../../../api/mercadopago/api";
import { useRef, useState } from "react";

const getPossDevices = async () => {
  const data = await getPoss();
  return data.devices
}

const ChangeOpMode = ({
  name,
  onClickEvent,
}: {
  name: string,
  onClickEvent?: (value: string) => void,
}) => {

  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current?.parentElement && onClickEvent){
      onClickEvent(buttonRef.current?.parentElement?.className)
    }
  }

  return (
    <button className="btn btn-sm ml-1" onClick={handleClick} ref={buttonRef}>
      {name}
    </button>
  )
}


export default function PosPage() {
  const [reload, setReload] = useState(0);

  const changeToPdv = (pos_id: string) => {
    if(pos_id) {
      switchPosMode(pos_id, {mode: 'PDV'});
      setReload(reload + 1);  
    }
  }

  const changeToStd = (pos_id: string) => {
    if(pos_id) {
      switchPosMode(pos_id, {mode: 'STANDALONE'});
      setReload(reload + 1);
    }
  }

  const tableHeader = [
    {name: "Serial", value: "id"},
    {name: "POS id", value: "pos_id"},
    {name: "Loja", value: "store_id"},
    {name: "External?", value: "external_pos_id"},
    {name: "Modo Op", value: "operating_mode"},
    {
      name: "Mudar modo op",
      value: 'id',
      component: (<>
        <ChangeOpMode name="PDV" onClickEvent={(id) => changeToPdv(id)} />
        <ChangeOpMode name="SDT" onClickEvent={(id) => changeToStd(id)} />
      </>)
    },
  ]

  return (
    <div className="">
      <p>Pontos de venda (POS)</p>
      <Table
        tableName="POS"
        tableHeader={tableHeader}
        tableFetch={getPossDevices}
      />
    </div>
  )
}