import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { RegionResp } from "../../../../api/regions/types";
import { addRegionById, editRegionById, getRegionById } from "../../../../api/regions/api";

const initRegion: RegionResp = {
  id: '',
  name: '',
  lastUpdated: 0,
  timestamp: 0,
};

export default function AddEditRegionPage() {
  const { id } = useParams();
  const [region, setRegion] = useState<RegionResp>(initRegion);

  const regionRef = useRef(initRegion);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/regions/add')
  
  useEffect(() => {
    let ignore = false;
    console.log("isEditing", isEditing)
    if (isEditing) {
      getRegionById(id as string).then((res) => {
        if(!ignore) {
          setRegion(res as RegionResp);
          regionRef.current = res as RegionResp;
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
    setRegion(regionRef.current)
  }
 
  const handleSave = () => {
    if (isEditing && id) {
      editRegionById(id, region).then(() => {
        navigate('/admin/regions')
      })
    } else {
      addRegionById(region).then(() => {
        navigate('/admin/regions')
      })
    }

  }

  const regionChanged = (a: RegionResp, b: RegionResp) => {
    for (const i in a) {
      if (a[i as keyof RegionResp] !== b[i as keyof RegionResp]) {
        return true
      }
    }
    return false
  }

  const isCancelDisabled = !regionChanged(region, regionRef.current)
  const isSaveDisabled = !regionChanged(region, regionRef.current);
  
  return (
    <div>
      <p className="text-2xl"><span className="font-bold">Adicionar ou editar Região #:</span> {region.name}</p>
      <p>ID: {region.id}</p>

      <div className="flex flex-col pt-6">

        <label className="form-control label-text pb-4">Nome da região:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={region.name}
            onChange={(e) => setRegion({...region, name: e.target.value})}
          />
        </label>

        <hr />
        <p>Created on: {dayjs(region.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p>
        <p>Last updated: {dayjs(region.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
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