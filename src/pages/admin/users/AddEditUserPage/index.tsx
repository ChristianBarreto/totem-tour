import { useEffect, useRef, useState } from "react"
import { Totem } from "../../../../api/totems/types";
import { addTotem, editTotemById, getTotemById } from "../../../../api/totems/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const initTotem = {
  id: '',
  nickName: "",
  locationDescription: '',
  responsiblePerson: '',
  posId: '',
  cityOrder: '',
  regionId: '', 
  showTestProduct: false,
  lastUpdated: '',
  timestamp: '',
}

export default function AddEditUserPage() {
  const { id } = useParams();
  const [totem, setTotem] = useState<Totem>(initTotem);

  const totemRef = useRef(initTotem);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/totems/add')
  
  useEffect(() => {
    let ignore = false;
    if (isEditing) {
      getTotemById(id as string).then((res) => {
        if (!ignore) {
          setTotem(res);
          totemRef.current = res;  
        }
      }).catch((err) => {
        console.log("Err", err)
      })
    }

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setTotem(totemRef.current)
  }
 
  const handleSave = () => {
    if (isEditing) {
      editTotemById(totem).then(() => {
        navigate('/admin/totems')
      })
    } else {
      addTotem(totem).then(() => {
        navigate('/admin/totems')
      })
    }

  }

  const totemChanged = (prod1: Totem, prod2: Totem) => {
    for (const i in prod1) {
      if (prod1[i as keyof Totem] !== prod2[i as keyof Totem]) {
        return true
      }
    }
    return false
  }

  const isCancelDisabled = !totemChanged(totem, totemRef.current)
  const isSaveDisabled = !totemChanged(totem, totemRef.current);
  
  return (
    <div>
      <p className="text-2xl"><span className="font-bold">Usuário:</span> {totem.nickName}</p>
      <p>ID: {totem.id}</p>

      <div className="flex flex-col pt-6">

        <div className="form-control pb-4">
          <label className="label cursor-pointer justify-start w-1/3">
            <input
              type="checkbox"
              className={`toggle toggle-accent ${totem.showTestProduct && "bg-red-500"}`}
              checked={totem.showTestProduct}
              onChange={() => setTotem({...totem, showTestProduct: !totem.showTestProduct})}
            />
            <span className={`label-text pl-4 ${totem.showTestProduct && "text-red-500 font-bold"}`}>Mostra produtos de teste</span>
          </label>
        </div>



        <label className="form-control label-text pb-4">Estabelecimento:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={totem.locationDescription}
            onChange={(e) => setTotem({...totem, locationDescription: e.target.value})}
          />
        </label>

        <label className="form-control label-text pb-4">Responsável:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={totem.responsiblePerson}
            onChange={(e) => setTotem({...totem, responsiblePerson: e.target.value})}
          />
        </label>

        <label className="form-control label-text pb-4">POS ID:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full bg-red-300"
            value={totem.posId}
            onChange={(e) => setTotem({...totem, posId: e.target.value})}
          />
          <p className="text-red-500 pt-1"><span className="font-bold">CUIDADO!</span> Caso este código esteja errado, a cobrança da maquininha não será feita.</p>
        </label>

        <label className="form-control label-text pb-4">Apelido do totem:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={totem.nickName}
            onChange={(e) => setTotem({...totem, nickName: e.target.value})}
          />
        </label>

        <label className="form-control label-text pb-4">Ordem das cidades mostradas:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={totem.cityOrder}
            onChange={(e) => setTotem({...totem, cityOrder: e.target.value})}
          />
        </label>


        <hr />
        {/* <p>Created on: {dayjs(product.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p> */}
        <p>Last updated: {dayjs(totem.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
      </div>

      <div className="flex justify-end">
        <button
          className="btn"
          disabled={isCancelDisabled}
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          disabled={isSaveDisabled}
          className="btn btn-primary ml-4"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}