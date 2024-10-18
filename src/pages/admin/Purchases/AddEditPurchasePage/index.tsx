import { useEffect, useRef, useState } from "react"
import { getPurchaseById, getPurchaseItensByPurchaseId, PurchaseDb, PurchaseItemDb } from "../../../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { priceTypes } from "../../../../helpers";
import PriceForm from "../../../../components/cells/PriceForm";
import ProductConsistency from "../../../../components/cells/ProductConsistency";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";

const initPurchase: PurchaseDb = {
  id: '',
  customerId: '',
  acceptedTerms: false,
  cartPrice: 0,
  payementCaptured: false,
  paymentId: 0,
  paymentMethod: '',
  paymentValue: 0,
  totemId: '',
  timestamp: 0,
  lastUpdated: 0,
}

export default function AddEditPurchasePage() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState<PurchaseDb>(initPurchase);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDb[]>([]);
  const [tab, setTab] = useState(0);

  const productRef = useRef(initPurchase);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/purchases/add')
  
  useEffect(() => {
    let ignore = false;

    if (isEditing && id) {
      getPurchaseById(id).then((res) => {
        if (res && !ignore) {
          setPurchase(res)
          productRef.current = res;
          getPurchaseItensByPurchaseId(res.id).then((res) => {
            setPurchaseItems(res)
          }).catch((err) => {
            console.log("Err", err)
          })
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
    setPurchase(productRef.current)
  }
 
  const handleSave = () => {
    if (isEditing) {
      // editPurchaseById(purchase.id, purchase).then((res) => {
      //   navigate(-1)
      // })
    } 
    // else {
    //   addPurchase(purchase).then((res) => {
    //     navigate(-1)
    //   })
    // }

  }

  const purchaseChanged = (purchase1: PurchaseDb, purchase2: PurchaseDb) => {
    for (let i in purchase1) {
      if (purchase1[i as keyof PurchaseDb] !== purchase2[i as keyof PurchaseDb]) {
        return true
      }
    }
    return false
  }

  
  return (
    <div>
      <p className="text-2xl pb-4"><span className="font-bold">Compra ID: </span> {purchase.id}</p>
      <div className="pb-4">
        <p><span className="font-bold">Valor:</span> R${purchase.paymentValue},00</p>
        <p><span className="font-bold">Método de pagamento:</span> {purchase.paymentMethod}</p>
        <div className="flex">
          <span className="font-bold">Valor foi capturado: &nbsp;</span>
          {<RedGreenLight value={purchase.payementCaptured} outsideText={purchase.payementCaptured ? "SIM" : "NÃO"} />}
        </div>
        <div className="flex">
          <span className="font-bold">Cliente foi informado: &nbsp;</span>
          {<RedGreenLight value={false} outsideText={false ? "SIM" : "NÃO"} />}
        </div>
        <div className="flex">
          <span className="font-bold">Operadores foram informados: &nbsp;</span>
          {<RedGreenLight value={false} outsideText={false ? "SIM" : "NÃO"} />}
        </div>
        <div className="flex">
          <span className="font-bold">Parceiro foi informado: &nbsp;</span>
          {<RedGreenLight value={false} outsideText={false ? "SIM" : "NÃO"} />}
        </div>
        <p><span className="font-bold">Totem da venda: </span>{purchase.totemId}</p>
      </div>
      
      <div role="tablist" className="tabs tabs-boxed mt-4">
        <p role="tab" className={`tab ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)}>Itens</p>
        <p role="tab" className={`tab ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Cliente</p>
        <p role="tab" className={`tab ${tab === 2 && "tab-active"}`} onClick={() => setTab(2)}>Operador</p>
        <p role="tab" className={`tab ${tab === 3 && "tab-active"}`} onClick={() => setTab(3)}>Parceiro</p>
      </div>

      <div className="flex flex-col pt-6">
        {tab === 0 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Itens:</p>
            </div>

            <div className="m-4 p-4 border-solid border-2 border-indigo-600 rounded">
              {purchaseItems?.map((item) => (
                <div key={item.id}>
                  <p>ID: {item.id}</p>
                  <p>Data: {dayjs(item.date).format('DD/MM/YYYY')}</p>
                  <p>Hora:</p>
                  <p>Cidade:</p>
                  <p>Neto: R$ {item.netPrice},00</p>
                  <p>Comissão Parceiro: R$ {item.partnerComm},00</p>
                  <p>Comissão Totem Tour: R$ {item.companyComm},00</p>
                  <p>Valor total: R$ {item.totalPrice},00</p>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 1 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Cliente:</p>
            </div>


          </>
        )}

        <hr />
        <p>Criado em: {dayjs(purchase.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p>
        <p>Última atualização: {!!purchase.lastUpdated && dayjs(purchase.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
      </div>

      <div className="flex justify-end">
        <button
          className="btn"
          // disabled={isCancelDisabled}
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          // disabled={isSaveDisabled}
          className="btn btn-primary ml-4"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}