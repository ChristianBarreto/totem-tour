import { useEffect, useRef, useState } from "react"
import { addProduct, Cities, editProductById, getCities, getProductById, Product } from "../../../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const initProduct = {
  cityId: '',
  companyComm: 0,
  description: '',
  details: '',
  id: '',
  imgUrl: '',
  maxPaxDay: 0,
  maxPerRound: 0,
  minPriceDescription: '',
  minTotalPrice: 0,
  name: '',
  netPrice: 0,
  partnerComm: 0,
  pricePerPerson: 0,
  priority: 0,
  time: '',
  showDisplay: false,
  isAvailable: false,
  notAvailableMessage: '',
  isTest: false,
  address: '',
}

export default function AddEditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(initProduct);
  const [cities, setCities] = useState<Cities>([]);
  const [tab, setTab] = useState(0);

  const productRef = useRef(initProduct);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/products/add')
  
  useEffect(() => {
    let ignore = false;

    getProductById(id).then((res) => {
      if (res && !ignore) {
        setProduct(res)
        productRef.current = res;
      }
    })

    getCities().then((res) => {
      if (res) {
        setCities(res)
      }
    })

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setProduct(productRef.current)
  }
 
  const handleSave = () => {
    if (isEditing) {
      editProductById(product.id, product).then((res) => {
        navigate('/admin/products')
      })
    } else {
      addProduct( product).then((res) => {
        navigate('/admin/products')
      })
    }

  }

  const productChanged = (prod1: Product, prod2: Product) => {
    for (let i in prod1) {
      if (prod1[i as keyof Product] !== prod2[i as keyof Product]) {
        return true
      }
    }
    return false
  }

  const isCancelDisabled = !productChanged(product, productRef.current)
  const isSaveDisabled = !productChanged(product, productRef.current);
  
  return (
    <div>
      <p className="text-2xl"><span className="font-bold">Adicionar ou editar produto:</span> {product.name}</p>
      <p>ID: {product.id}</p>

      <div role="tablist" className="tabs tabs-boxed mt-4">
        <p role="tab" className={`tab ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)}>Display</p>
        <p role="tab" className={`tab ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Características</p>
        <p role="tab" className={`tab ${tab === 2 && "tab-active"}`} onClick={() => setTab(2)}>Passageiros</p>
        <p role="tab" className={`tab ${tab === 3 && "tab-active"}`} onClick={() => setTab(3)}>Preços</p>
      </div>

      <div className="flex flex-col pt-6">
        {tab === 0 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Display:</p>
            </div>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={product.showDisplay}
                  onChange={() => setProduct({...product, showDisplay: !product.showDisplay})}
                />
                <span className="label-text pl-4">Mostrar no display</span>
              </label>
            </div>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={product.isAvailable}
                  onChange={() => setProduct({...product, isAvailable: !product.isAvailable})}
                />
                <span className="label-text pl-4">Tem disponibilidade</span>
              </label>
            </div>

            <label className="form-control label-text pb-4">Mensagem se indisponível:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.notAvailableMessage}
                onChange={(e) => setProduct({...product, notAvailableMessage: e.target.value})}
              />
            </label>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={product.isTest}
                  onChange={() => setProduct({...product, isTest: !product.isTest})}
                />
                <span className="label-text pl-4">É produto de teste?</span>
              </label>
            </div>

            <label className="form-control label-text pb-4">Prioridade:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-16"
                value={product.priority}
                onChange={(e) => setProduct({...product, priority: Number(e.target.value) })}
              />
            </label>
          </>
        )}

        {tab === 1 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Características:</p>
            </div>

            <label className="form-control label-text pb-4">URL da imagem:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.imgUrl}
                onChange={(e) => setProduct({...product, imgUrl: e.target.value})}
              />
            </label>

            <label className="form-control label-text pb-4">Nome do produto:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
              />
            </label>

            <label className="form-control pb-4">
              <div className="label">
                <span className="label-text">Descrição</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-14"
                placeholder="Bio"
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
              ></textarea>
            </label>

            <label className="form-control pb-4">
              <div className="label">
                <span className="label-text">Detalhes:</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-80"
                placeholder="Detalhes"
                value={product.details}
                onChange={(e) => setProduct({...product, details: e.target.value})}
              ></textarea>
            </label>

            <label className="form-control w-full pb-4">
              <span className="label-text">Cidade:</span>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setProduct({...product, cityId: e.target.value})}
                value={product.cityId}
                defaultValue=""
              >
                <option value="" disabled>Escolha a cidade</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </label>

            <label className="form-control pb-4">
              <div className="label">
                <span className="label-text">Endereço:</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-40"
                placeholder="Endereço"
                value={product.address}
                onChange={(e) => setProduct({...product, address: e.target.value})}
              ></textarea>
            </label>

            <label className="form-control label-text pb-4">Horário:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.time}
                onChange={(e) => setProduct({...product, time: e.target.value})}
              />
            </label>

          </>

        )}

        {tab === 2 && (
          <>
            <div className="form-control w-full">
              <p className="font-bold pb-2">Passageiros:</p>
            </div>

            <label className="form-control label-text pb-4">Capacidade máxima (total de pessoas em todos os veículos):
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.maxPaxDay}
                onChange={(e) => setProduct({...product, maxPaxDay: Number(e.target.value) })}
              />
            </label>

            <label className="form-control label-text pb-4">Qty máxima em cada item do carrinho:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.maxPerRound}
                onChange={(e) => setProduct({...product, maxPerRound: Number(e.target.value) })}
              />
            </label>
          </>
        )}
        
        {tab === 3 && (
          <>
            <div className="form-control w-full">
              <p className="font-bold pb-2">Preços:</p>
            </div>

            <label className="form-control label-text pb-4">Preço neto:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.netPrice}
                onChange={(e) => setProduct({...product, netPrice: Number(e.target.value) })}
              />
            </label>

            <label className="form-control label-text pb-4">Preço por pessoa:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.pricePerPerson}
                onChange={(e) => setProduct({...product, pricePerPerson: Number(e.target.value) })}
              />
            </label>

            <label className="form-control label-text pb-4">Preço mínimo:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.minTotalPrice}
                onChange={(e) => setProduct({...product, minTotalPrice: Number(e.target.value) })}
              />
            </label>

            <label className="form-control label-text pb-4">Descrição do preço mínimo:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.minPriceDescription}
                onChange={(e) => setProduct({...product, minPriceDescription: e.target.value})}
              />
            </label>

            <label className="form-control label-text pb-4">Comissão do parceiro:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.partnerComm}
                onChange={(e) => setProduct({...product, partnerComm: Number(e.target.value) })}
              />
            </label>

            <label className="form-control label-text pb-4">Comissão da Totem Tour:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.companyComm}
                onChange={(e) => setProduct({...product, companyComm: Number(e.target.value) })}
              />
            </label>

          </>
        )}


        <hr />
        {/* <p>Created on: {dayjs(product.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p> */}
        <p>Last updated: {dayjs(product.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
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