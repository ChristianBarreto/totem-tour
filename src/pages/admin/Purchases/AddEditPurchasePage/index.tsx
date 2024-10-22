import { useEffect, useRef, useState } from "react"
import { PurchaseItemResp } from "../../../../api/purchaseitems/types";
import { editPurchaseById, getPurchaseById } from "../../../../api/purchases/api";
import { getPurchaseItensByPurchaseId } from "../../../../api/purchaseitems/api";
import { PurchaseResp } from "../../../../api/purchases/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";

const initPurchase: PurchaseResp = {
  id: '',
  customerId: '',
  acceptedTerms: false,
  cartPrice: 0,
  totalNetPrice: 0,
  totalPartnerComm: 0,
  totalCompanyComm: 0,
  payementCaptured: false,
  paymentId: '',
  paymentMethod: '',
  paymentValue: 0,
  totemId: '',
  totemNickName: '',
  totemLocationDescription: '',
  totemResponsiblePerson: '',
  timestamp: 0,
  lastUpdated: 0,
  customerMsg: false,
  operatorsMsg: false,
  operatorsConfirmed: false,
  partnerMsg: false,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
}

export default function AddEditPurchasePage() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState<PurchaseResp>(initPurchase);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemResp[]>([]);
  const [tab, setTab] = useState(0);

  const purchaseRef = useRef(initPurchase);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/purchases/add')
  
  useEffect(() => {
    let ignore = false;

    if (isEditing && id) {
      getPurchaseById(id).then((res) => {
        if (res && !ignore) {
          setPurchase(res)
          purchaseRef.current = res;
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
    setPurchase(purchaseRef.current)
  }
 
  const handleSave = () => {
    if (isEditing) {
      editPurchaseById(purchase.id, purchase).then((res) => {
        navigate(-1)
      }).catch((err) => {
        console.log("Err", err)
      })
    } 
    // else {
    //   addPurchase(purchase).then((res) => {
    //     navigate(-1)
    //   })
    // }

  }

  const purchaseChanged = (purchase1: PurchaseResp, purchase2: PurchaseResp) => {
    for (let i in purchase1) {
      if (purchase1[i as keyof PurchaseResp] !== purchase2[i as keyof PurchaseResp]) {
        return true
      }
    }
    return false
  }

  const isCancelDisabled = !purchaseChanged(purchaseRef.current, purchase)
  const isSaveDisabled = !purchaseChanged(purchaseRef.current, purchase)

  return (
    <div>
      <p className="text-2xl pb-4"><span className="font-bold">Compra ID: </span> {purchase.id}</p>
      <table className="">
        <tbody>
          <tr>
            <td className="pr-2 font-bold">Data da compra:</td>
            <td>{dayjs(purchase.timestamp).locale('pt-br').format('DD/MM/YYYY HH:mm')}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Valor:</td>
            <td>R${purchase.paymentValue},00</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Método de pagamento:</td>
            <td>{purchase.paymentMethod}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">ID do pagamento:</td>
            <td>{purchase.paymentId}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Totem da venda:</td>
            <td>{purchase.totemNickName}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Valor foi capturado:</td>
            <td>{<RedGreenLight value={purchase.payementCaptured} outsideText={purchase.payementCaptured ? "SIM" : "NÃO"} />}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Cliente foi informado:</td>
            <td>{<RedGreenLight value={purchase.customerMsg} outsideText={purchase.customerMsg ? "SIM" : "NÃO"} />}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Operadores informados:</td>
            <td>{<RedGreenLight value={purchase.operatorsMsg} outsideText={purchase.operatorsMsg ? "SIM" : "NÃO"} />}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Parceiro foi informado:</td>
            <td>{<RedGreenLight value={purchase.partnerMsg} outsideText={purchase.partnerMsg ? "SIM" : "NÃO"} />}</td>
          </tr>
          <tr>
            <td className="pr-2 font-bold">Operadores confir. a reserva:</td>
            <td>{<RedGreenLight value={purchase.operatorsConfirmed} outsideText={purchase.operatorsConfirmed ? "SIM" : "NÃO"} />}</td>
          </tr>

        </tbody>
      </table>
      
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
                    <th>Qtd</th>
                    <th>Neto</th>
                    <th>Com. Parceiro</th>
                    <th>Com. Totem Tour</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                {purchaseItems?.map((item) => (
                  <tr key={item.id} className="hover">
                    <td>{item.productName}</td>
                    <td>{item.cityName}</td>
                    <td>{dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}</td>
                    <td>{item.productTime}</td>
                    <td>{item.qty}</td>
                    <td>R$ {item.netPrice},00</td>
                    <td>R$ {item.partnerComm},00</td>
                    <td>R$ {item.companyComm},00</td>
                    <td>R$ {item.totalPrice},00</td>
                  </tr>
                ))}
                  <tr className="bg-gray-200">
                    <td>Total:</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>R$ {purchase.totalNetPrice},00</td>
                    <td>R$ {purchase.totalPartnerComm},00</td>
                    <td>R$ {purchase.totalCompanyComm},00</td>
                    <td>R$ {purchase.paymentValue},00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="mb-14">
            <div className="w-full mb-4">
              <p className="font-bold pb-2">Cliente WhatsApp:</p>
              <p><span className="font-bold">Enviar menssagem para:</span></p>
              {/* TODO: mudar customer data para purchase e não purchaseItems */}
              <p><span className="font-bold">Nome:</span> {purchase.customerName}</p> 
              <p><span className="font-bold">Telefone:</span>  {purchase.customerPhone}</p>
            </div>
            <div className="p-2 pl-2 pb-14 border bg-gray-100">
              <div className="border ml-2 p-2 bg-white">
                <p>
                  Obrigado por reservar seus passeios com a *Totem Tour*!
                  <br /><br />
                  Segue abaixo as suas reservas:
                  <br /><br />
                  {purchaseItems.map((item) => 
                    <>
                      ✅ *Passeio:* {item.productName}<br />
                      - 😎 *Qtd.:* {item.qty} pessoa(s)<br />
                      - 📅 *Data:* {dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}<br />
                      - 🕑 *Hora:* {item.productTime} *Duração:* {item.productDuration}<br />
                      - *Obs.:* ({item.productAlignMessage})<br />
                      - 🌴 *Cidade:* {item.cityName}<br />
                      - 🗺️ *Local:* {item.productAddres}<br />
                      - 📍 *Localização:* {item.productLocation}<br />
                      - 🏪 *Nome da agência:* {item.productOperatorName}<br />
                      - 📞 *Telefone da agência:* {item.productOperatorPhone}<br />
                      <br />
                    </>
                  )}
                  <br />
                  📢 Sobre horários, dúvidas sobre o passeio e remarcação, entre em contato com a(s) agência(s) acima. <br />
                  📢 Sobre pagamento e cancelamento, responda a esta mensagem. <br /><br />
                  Número da venda Totem Tour: {purchase.id}
                </p>
              </div>
            </div>

            <div className="">
              <p>Confirmações da compra (cliente):</p>
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={purchase.customerMsg}
                  onChange={() => setPurchase({...purchase, customerMsg: !purchase.customerMsg})}
                />
                <span className="label-text pl-4">Cliente foi informado?</span>
              </label>
            </div>

          </div>
        )}

        {tab === 2 && (
          <div className="mb-14">
            <div className="w-full">
              <p className="font-bold pb-2">Operador WhatsApp:</p>
            </div>
            {purchaseItems.map((item, index) => 
              <div className="border p-2 bg-gray-100 mb-4">
                <p className="pb-2">{index+1}- {'item.operatorName'}:</p>
                <div className="border p-2 ml-4 bg-white ">
                  <p>
                    Olá, {item.productOperatorName}! Nova reserva da *Totem Tour*!
                    <br /><br />
                    <>
                      ✅ *Passeio:* {item.productName}<br />
                      - *Qtd.:* {item.qty} pessoa(s)<br />
                      - *Data:* {dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}<br />
                      - *Hora:* {item.productTime}<br />
                      - *Nome do resp. da reserva:* {purchase.customerName}<br />
                      - *Telefone:*  {purchase.customerPhone}<br />
                      - *E-mail:*  {purchase.customerEmail}<br />
                      - *Preço neto:* R$ {item.netPrice},00<br />
                    </>
                    <br />
                    <br />
                    📢 Favor entrar em contato com o cliente para combinar os detalhes do embarque. <br />
                    <br />
                    ⚠️📢 *RESPONDA ESTA MENSAGEM QUANDO A VAGA DESTE CLIENTE ESTIVER RESERVADA!* <br />
                    <br />


                    Número da venda Totem Tour: {purchase.id}
                  </p>
                </div>

                <div className="ml-2">
                  <p>Confirmação do item:</p>
                  <label className="label cursor-pointer justify-start w-1/3">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={false}
                      // onChange={() => setPurchase({...purchase, customerMsg: !purchase.customerMsg})}
                    />
                    <span className="label-text pl-4">Operador foi informado?</span>
                  </label>
                  <label className="label cursor-pointer justify-start w-1/3">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={false}
                      // onChange={() => setPurchase({...purchase, customerMsg: !purchase.customerMsg})}
                    />
                    <span className="label-text pl-4">Operador confirmou a reserva?</span>
                  </label>
                  </div>
              </div>
            )}
            <div>
              <p>Confirmações da compra (operadores):</p>
              <label className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={purchase.operatorsMsg}
                  onChange={() => setPurchase({...purchase, operatorsMsg: !purchase.operatorsMsg})}
                />
                <span className="label-text pl-4">Todos os operadores foram informados?</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={purchase.operatorsConfirmed}
                  onChange={() => setPurchase({...purchase, operatorsConfirmed: !purchase.operatorsConfirmed})}
                />
                <span className="label-text pl-4">Todos os operadores confirmaram a reserva?</span>
              </label>
            </div>
          </div>
        )}


        {tab === 3 && (
          <div className="mb-14">
            <div className="w-full">
              <p className="font-bold pb-2">Parceiro WhatsApp:</p>
            </div>
            <div className="border p-2 bg-gray-100">
              <div className="border p-2 ml-2 bg-white">
                <p>
                  Olá, {purchase.totemResponsiblePerson}, nova reserva(s) da *Totem Tour*!
                  <br /><br />
                  {purchaseItems.map((item) => 
                    <>
                      ✅ *Passeio:* {item.productName}<br />
                      - *Qtd.:* {item.qty} pessoa(s)<br />
                      - *Data da compra:* {dayjs(item.timestamp).locale('pt-br').format('DD/MM/YYYY HH:mm')}<br />
                      - *Comissão:* R$ {item.partnerComm},00<br />
                    </>
                  )}
                  <br />
                  Número da venda Totem Tour: {purchase.id}
                </p>
              </div>
            </div>

            <div>
              <p>Confirmações da compra (parceiro):</p>
              <label className="label cursor-pointer justify-start w-1/3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={purchase.partnerMsg}
                  onChange={() => setPurchase({...purchase, partnerMsg: !purchase.partnerMsg})}
                />
                <span className="label-text pl-4">Parceiro foi informado?</span>
              </label>
            </div>


          </div>
        )}
        <hr />
        <p>Criado em: {dayjs(purchase.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p>
        <p>Última atualização: {!!purchase.lastUpdated && dayjs(purchase.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
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