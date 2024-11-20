import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { SlideResp } from "../../../../api/slides/types";
import { addSlide, editSlide, getSlide } from "../../../../api/slides/api";

const initSlide: SlideResp = {
  id: '',
  img: '',
  description: '',
  active: false,
  order: 0,
  duration: 0,
  lastUpdated: 0,
  timestamp: 0,
};

export default function AddEditSlidePage() {
  const { id } = useParams();
  const [slide, setSlide] = useState<SlideResp>(initSlide);

  const slideRef = useRef(initSlide);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/slides/add')
  
  useEffect(() => {
    let ignore = false;
    if (isEditing) {
      getSlide(id as string).then((res) => {
        setSlide(res)
        slideRef.current = res
      }).catch((err) => {
        console.log("Err", err)
      })
    }

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setSlide(slideRef.current)
  }
 
  const handleSave = () => {
    if (isEditing && id) {
      editSlide(id, slide).then(() => {
        navigate('/admin/slides')
      })
    } else {
      addSlide(slide).then(() => {
        navigate('/admin/slides')
      })
    }

  }

  const slideChanged = (slide1: SlideResp, slide2: SlideResp) => {
    for (const i in slide1) {
      if (slide1[i as keyof SlideResp] !== slide2[i as keyof SlideResp]) {
        return true
      }
    }
    return false
  }

  const isCancelDisabled = !slideChanged(slide, slideRef.current)
  const isSaveDisabled = !slideChanged(slide, slideRef.current);
  
  return (
    <div>
      <p className="text-2xl"><span className="font-bold">Adicionar ou editar slide #:</span> {slide.description}</p>
      <p>ID: {slide.id}</p>

      <div className="flex flex-col pt-6">

      <div className="flex items-center gap-3 mr-auto ml-auto">
        <div className="avatar">
          <div className="mask rounded h-80 w-80">
            <img
              src={slide.img}
              alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </div>

        <div className="form-control pb-4">
          <label className="label cursor-pointer justify-start w-1/3">
            <input
              type="checkbox"
              className={`toggle toggle-primary`}
              checked={slide.active}
              onChange={() => setSlide({...slide, active: !slide.active})}
            />
            <span className={`label-text pl-4 mr-2`}> Slide ativo</span>
          </label>
        </div>

        <label className="form-control label-text pb-4">Ordem:
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-40"
            value={slide.order}
            onChange={(e) => setSlide({...slide, order: Number(e.target.value)})}
          />
        </label>

        <label className="form-control label-text pb-4">Duração (s):
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-40"
            value={slide.duration}
            onChange={(e) => setSlide({...slide, duration: Number(e.target.value)})}
          />
        </label>

        <label className="form-control label-text pb-4">Descrição:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={slide.description}
            onChange={(e) => setSlide({...slide, description: e.target.value})}
          />
        </label>

        <label className="form-control label-text pb-4">URL da imagem:
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={slide.img}
            onChange={(e) => setSlide({...slide, img: e.target.value})}
          />
        </label>

        <hr />
        {/* <p>Created on: {dayjs(product.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p> */}
        <p>Last updated: {dayjs(slide.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
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