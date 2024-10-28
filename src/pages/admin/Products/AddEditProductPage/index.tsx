import { useEffect, useRef, useState } from "react"
import { PriceTypes } from "../../../../api/api";
import { Cities } from "../../../../api/cities/types";
import { getCities } from "../../../../api/cities/api";
import { addProduct, editProductById } from "../../../../api/products/api";
import { getProductById } from "../../../../api/products/api";
import { Product } from "../../../../api/products/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { initProduct, priceTypes, productCanBeAvailable, productCanBeDisplayed } from "../../../../helpers";
import PriceForm from "../../../../components/cells/PriceForm";
import ProductConsistency from "../../../../components/cells/ProductConsistency";
import IsShownWhereBadge from "../../../../components/atoms/IsShownWhereBadge";

export default function AddEditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(initProduct);
  const [cities, setCities] = useState<Cities>([]);
  const [tab, setTab] = useState(0);

  const productRef = useRef(initProduct);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/products/add')
  
  const canBeDisplayed = productCanBeDisplayed(product);
  const canBeAvailable = productCanBeAvailable(product);

  useEffect(() => {
    let ignore = false;

    if (isEditing) {
      getProductById(id).then((res) => {
        if (res && !ignore) {
          setProduct(res as Product)
          productRef.current = res as Product;
        }
      })
    }

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
        navigate(-1)
      })
    } else {
      addProduct( product).then((res) => {
        navigate(-1)
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

      <ProductConsistency
        canBeDisplayed={canBeDisplayed}
        canBeAvailable={canBeAvailable}
      />

      <div role="tablist" className="tabs tabs-boxed mt-4">
        <p role="tab" className={`tab ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)}>Display</p>
        <p role="tab" className={`tab ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Características</p>
        <p role="tab" className={`tab ${tab === 2 && "tab-active"}`} onClick={() => setTab(2)}>Local e horário</p>
        <p role="tab" className={`tab ${tab === 3 && "tab-active"}`} onClick={() => setTab(3)}>Capacidade</p>
        <p role="tab" className={`tab ${tab === 4 && "tab-active"}`} onClick={() => setTab(4)}>Preços</p>
        <p role="tab" className={`tab ${tab === 5 && "tab-active"}`} onClick={() => setTab(5)}>Operador</p>
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
              <IsShownWhereBadge isShownDisplay />
            </label>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={product.todayUnavailable}
                  onChange={() => setProduct({...product, todayUnavailable: !product.todayUnavailable})}
                />
                <span className="label-text pl-4">Indisponível no dia atual (recomendado)</span>
              </label>
            </div>

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
              <IsShownWhereBadge isShownDisplay />
            </label>

            <label className="form-control label-text pb-4">Nome do produto:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
              />
              <IsShownWhereBadge isShownDisplay isShownPurchase />
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
              <IsShownWhereBadge isShownDisplay />
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
              <IsShownWhereBadge isShownDisplay />
            </label>

          </>

        )}

        {tab === 2 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Local e horário:</p>
            </div>

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
              <IsShownWhereBadge isShownDisplay isShownPurchase />
            </label>

            <label className="form-control pb-4">
              <div className="label">
                <span className="label-text">Local do ponto de encontro:</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-40"
                placeholder="Endereço"
                value={product.address}
                onChange={(e) => setProduct({...product, address: e.target.value})}
              ></textarea>
              <IsShownWhereBadge isShownPurchase />
            </label>

            <label className="form-control label-text pb-4">Localização (maps) do ponto de encontro:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.location}
                onChange={(e) => setProduct({...product, location: e.target.value})}
              />
              <IsShownWhereBadge isShownPurchase />
            </label>

            <label className="form-control label-text pb-4">Horário:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.time}
                onChange={(e) => setProduct({...product, time: e.target.value})}
              />
              <IsShownWhereBadge isShownDisplay isShownPurchase />
            </label>

            <label className="form-control label-text pb-4">Duração:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.duration}
                onChange={(e) => setProduct({...product, duration: e.target.value})}
              />
              <IsShownWhereBadge isShownDisplay isShownPurchase />
            </label>

            <label className="form-control label-text pb-4">Mensagem para alinhamento após a reserva (não usar parênteses):
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.alignMessage}
                onChange={(e) => setProduct({...product, alignMessage: e.target.value})}
              />
              <IsShownWhereBadge isShownDisplay isShownPurchase />
            </label>

          </>
        )}

        {tab === 3 && (
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
              <IsShownWhereBadge isShownDisplay />
            </label>

            <label className="form-control label-text pb-4">Qty máxima em cada item do carrinho:
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.maxPerRound}
                onChange={(e) => setProduct({...product, maxPerRound: Number(e.target.value) })}
              />
              <IsShownWhereBadge isShownDisplay />
            </label>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={product.isFreePaxAllowed}
                  onChange={() => setProduct({...product, isFreePaxAllowed: !product.isFreePaxAllowed})}
                />
                <span className="label-text pl-4">Gratuidade permitida</span>
              </label>
              <IsShownWhereBadge isShownDisplay />
            </div>

            <div className="form-control pb-4">
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={product.isHalfPaxAllowed}
                  onChange={() => setProduct({...product, isHalfPaxAllowed: !product.isHalfPaxAllowed})}
                />
                <span className="label-text pl-4">Meia passagem permitida</span>
              </label>
              <IsShownWhereBadge isShownDisplay />
            </div>

            <label className="form-control label-text pb-4">Mensagem sobre pessoas não permitidas:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.notAllowedPersonMsg}
                onChange={(e) => setProduct({...product, notAllowedPersonMsg: e.target.value })}
              />
              <IsShownWhereBadge isShownDisplay />
            </label>
          </>
        )}
        
        {tab === 4 && (
          <>
            <div className="form-control w-full">
              <p className="font-bold pb-2">Preços:</p>
            </div>

            <label className="form-control w-full pb-4">
              <span className="label-text">Tipo de preço:</span>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setProduct({...product, priceType: (e.target.value as PriceTypes)})}
                value={product.priceType}
                defaultValue=""
              >
                <option value="" disabled>Escolha</option>
                {priceTypes.map((priceType) => {
                  if (priceType.type) {
                    return (
                      <option key={priceType.type} value={priceType.type}>{priceType.description}</option>
                    )
                  }
                  else return null
                })}
              </select>
            </label>

            <PriceForm priceType={product.priceType} product={product} setProduct={setProduct}/>

          </>
        )}

        {tab === 5 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Operador:</p>
            </div>

            <label className="form-control label-text pb-4">Nome da empresa do operador:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.operatorName}
                onChange={(e) => setProduct({...product, operatorName: e.target.value})}
              />
              <IsShownWhereBadge isShownPurchase />
            </label>

            <label className="form-control label-text pb-4">Telefone do operador:
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.operatorPhone}
                onChange={(e) => setProduct({...product, operatorPhone: e.target.value})}
              />
              <IsShownWhereBadge isShownPurchase />
            </label>
          </>
        )}

        <hr />
        <p>Created on: {product.timestamp && dayjs(product.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p>
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