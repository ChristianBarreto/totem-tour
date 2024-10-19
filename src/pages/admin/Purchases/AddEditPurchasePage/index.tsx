import { useEffect, useRef, useState } from "react"
import { getPurchaseById, getPurchaseItensByPurchaseId, PurchaseDb, PurchaseItemDb } from "../../../../api/api";
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
  customerMsg: false,
  operatorMsg: false,
  partnerMsg: false,
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
        <p><span className="font-bold">Data da compra:</span> {dayjs(purchase.timestamp).locale('pt-br').format('DD/MM/YYYY HH:MM')}</p>
        <p><span className="font-bold">Valor:</span> R${purchase.paymentValue},00</p>
        <p><span className="font-bold">Método de pagamento:</span> {purchase.paymentMethod}</p>
        <p><span className="font-bold">ID do pagamento:</span> {purchase.paymentId}</p>
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
          <div>
            <div className="w-full">
              <p className="font-bold pb-2">Itens da compra:</p>
            </div>

            <div className="overflow-x-auto mb-14">
              <table className="table border">
                {/* head */}
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Cidade</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Neto</th>
                    <th>Com. Parceiro</th>
                    <th>Com. Totem Tour</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                {purchaseItems?.map((item) => (
                  <tr key={item.id} className="hover">
                    <td></td>
                    <td></td>
                    <td>{dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
                    <td></td>
                    <td>R$ {item.netPrice},00</td>
                    <td>R$ {item.partnerComm},00</td>
                    <td>R$ {item.companyComm},00</td>
                    <td>R$ {item.totalPrice},00</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 1 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Cliente WhatsApp:</p>
            </div>

            <div className="border p-2 mb-14">
              <p>
                Obrigado por reservar seus passeios com a *Totem Tour*!
                <br /><br />
                Segue abaixo as suas reservas:
                <br /><br />
                {purchaseItems.map((item) => 
                  <>
                    ✅ *Passeio:* ...<br />
                    - 😎 *Qtd.:* {item.qty} pessoa(s)<br />
                    - 📅 *Data:* {dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}<br />
                    - 🕑 *Hora:* ... *Duração:* ...<br />
                    - *Obs.:* ---alignMessage---<br />
                    - 🌴 *Cidade:* ...<br />
                    - 🗺️ *Local:* ...<br />
                    - 📍 *Localização:* ...<br />
                    - 🏪 *Nome da agência:* ...<br />
                    - 📞 *Telefoneda agência:* ...<br />
                  </>
                )}
                <br />
                📢 Sobre horários, dúvidas sobre o passeio e remarcação, entre em contato com a(s) agência(s) acima. <br />
                📢 Sobre pagamento e cancelamento, responda a esta mensagem. <br /><br />
                Número da venda Totem Tour: {purchase.id}
              </p>
            </div>
          </>
        )}

        {tab === 2 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Operador WhatsApp:</p>
            </div>
            {purchaseItems.map((item, index) => 
              <>
                <p>{index+1}- {'item.operatorName'}:</p>
                <div className="border p-2 mb-14">
                  <p>
                    Olá, {"item.operatorName"}! Nova reserva da *Totem Tour*!
                    <br /><br />
                    <>
                      ✅ *Passeio:* ...<br />
                      - *Qtd.:* {item.qty} pessoa(s)<br />
                      - *Data:* {dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}<br />
                      - *Hora:* ...<br />
                      - *Nome do resp. da reserva:* ...<br />
                      - *Telefone:* ...<br />
                      - *E-mail:* ...<br />
                      - *Preço neto:* R$ {item.netPrice},00<br />
                    </>
                    <br />
                    <br />
                    📢 Favor entrar em contato com o cliente para combinar os detalhes do embarque. <br />

                    Número da venda Totem Tour: {purchase.id}
                  </p>
                </div>
              </>
              
            )}

          </>
        )}


        {tab === 3 && (
          <>
            <div className="w-full">
              <p className="font-bold pb-2">Parceiro WhatsApp:</p>
            </div>

            <div className="border p-2 mb-14">
              <p>
                Olá, {"nome_do_parceiro"}, nova reserva(s) da totem *Totem Tour*!
                <br /><br />
                {purchaseItems.map((item) => 
                  <>
                    ✅ *Passeio:* ...<br />
                    - *Qtd.:* {item.qty} pessoa(s)<br />
                    - *Data da compra:* {dayjs(item.timestamp).locale('pt-br').format('DD/MM/YYYY HH:mm')}<br />
                    - *Comissão:* R$ {item.partnerComm},00<br />
                  </>
                )}
                <br />
                Número da venda Totem Tour: {purchase.id}
              </p>
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