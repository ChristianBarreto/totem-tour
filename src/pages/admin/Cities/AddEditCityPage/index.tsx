import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CityResp } from "../../../../api/cities/types";
import { addCity, editCityById, getCityById } from "../../../../api/cities/api";
import { RegionsResp } from "../../../../api/regions/types";
import { getRegions } from "../../../../api/regions/api";

const initCity: CityResp = {
  id: '',
  imgUrl: '',
  name: '',
  active: false,
  regionId: '',
  regionName: '',
  lastUpdated: 0,
  timestamp: 0,
};

export default function AddEditCityPage() {
  const { id } = useParams();
  const [city, setCity] = useState<CityResp>(initCity);
  const [regions, setRegions] = useState<RegionsResp>([]);

  const cityRef = useRef(initCity);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/cities/add')
  
  useEffect(() => {
    let ignore = false;
    if (isEditing) {
      getCityById(id as string).then((res) => {
        if(!ignore) {
          setCity(res as CityResp);
          cityRef.current = res;
        }
      }).catch((err) => {
        console.log("Err", err)
      })
      getRegions().then((res) => {
        setRegions(res);
      }).catch((err) => {
        console.log("Err", err)
      });
    } else {
      getRegions().then((res) => {
        setRegions(res);
      }).catch((err) => {
        console.log("Err", err)
      });
    }

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setCity(cityRef.current)
  }
 
  const handleSave = () => {
    if (isEditing && id) {
      editCityById(id, city).then(() => {
        navigate('/admin/cities')
      })
    } else {
      addCity(city).then(() => {
        navigate('/admin/cities')
      })
    }

  }

  const cityChanged = (a: CityResp, b: CityResp) => {
    for (const i in a) {
      if (a[i as keyof CityResp] !== b[i as keyof CityResp]) {
        return true
      }
    }
    return false
  };

  const isCancelDisabled = !cityChanged(city, cityRef.current)
  const isSaveDisabled = !cityChanged(city, cityRef.current);
  
  return (
    <div>
      <p className="text-2xl"><span className="font-bold">Adicionar ou editar cidade #:</span> {city.name}</p>
      <p>ID: {city.id}</p>

      <div className="flex flex-col pt-6">

      <div className="flex items-center gap-3 mr-auto ml-auto">
        <div className="avatar">
          <div className="mask rounded h-80 w-80">
            <img
              src={city.imgUrl}
              alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </div>

        <div className="form-control pb-4">
          <label className="label cursor-pointer justify-start w-1/3">
            <input
              type="checkbox"
              className={`toggle toggle-primary`}
              checked={city.active}
              onChange={() => setCity({...city, active: !city.active})}
            />
            <span className={`label-text pl-4 mr-2`}> Cidade ativa</span>
          </label>
        </div>

        <label className="form-control label-text pb-4">Nome:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={city.name}
            onChange={(e) => setCity({...city, name: e.target.value})}
          />
        </label>

        <label className="form-control label-text pb-4">URL da imagem:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={city.imgUrl}
            onChange={(e) => setCity({...city, imgUrl: e.target.value})}
          />
        </label>

        <label className="form-control w-full pb-4">
          <span className="label-text">Região:</span>
          <select
            className="select select-bordered w-full"
            onChange={(e) => setCity({...city, regionId: e.target.value})}
            value={city.regionId}
            defaultValue=""
          >
            <option value="" disabled>Escolha a região que esta cidade faz parte</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </label>

        <hr />
        <p>Created on: {dayjs(city.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p>
        <p>Last updated: {dayjs(city.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
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