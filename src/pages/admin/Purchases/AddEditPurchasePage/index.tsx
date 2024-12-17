import { ChangeEvent, useEffect, useRef, useState } from "react"
import { PurchaseItemResp } from "../../../../api/purchaseitems/types";
import { editPurchaseById, getPurchaseById, setNewPurchase } from "../../../../api/purchases/api";
import { getPurchaseItems } from "../../../../api/purchaseitems/api";
import { CartItemType } from "../../../../api/purchaseitems/types";
import { PurchaseResp } from "../../../../api/purchases/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { RedGreenLight } from "../../../../components/atoms/RedGreenLight";
import { calcPrice, displayPrice } from "../../../../helpers";
import { getProducts } from "../../../../api/products/api";
import { Product, Products } from "../../../../api/products/types";
import { getCities } from "../../../../api/cities/api";
import { CitiesResp, CityResp } from "../../../../api/cities/types";
import { getAvailabilities } from "../../../../api/availabilities/api";
import { Availabilities, Availability } from "../../../../api/availabilities/types";
import { Totem } from "../../../../api/totems/types";
import { getTotems } from "../../../../api/totems/api";

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

const initItem: PurchaseItemResp = {
  id: '',
  purchaseId: '',
  productId: '',
  qty: 0,
  qtyAdult: 0,
  qtyFree: 0,
  qtyHalf: 0,
  netPrice: 0,
  partnerComm: 0,
  companyComm: 0,
  totalPrice: 0,
  date: '',
  cityId: '',
  totemId: '',
  lastUpdate: 0,
  timestamp: 0,
  cityName: '',
  productName: '',
  productTime: '',
  productDuration: '',
  productAlignMessage: '',
  productAddres: '',
  productLocation: '',
  productOperatorName: '',
  productOperatorPhone: '',
}

type ProdAvail = Availabilities[]


export default function AddEditPurchasePage() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState<PurchaseResp>(initPurchase);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemResp[]>([]);
  const [tab, setTab] = useState(0);
  const [totens, setTotens] = useState<Totem[]>([]);
  const [products, setProducts] = useState<Products>([]);
  const [cities, setCities] = useState<CitiesResp>();
  const [productAvail, setProductAvail] = useState<ProdAvail>([]);
  const purchaseRef = useRef(initPurchase);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = (location.pathname !== '/admin/purchases/add');
  
  useEffect(() => {
    let ignore = false;

    if (isEditing && id) {
      getPurchaseById(id).then((res: PurchaseResp) => {
        if (res && !ignore) {
          setPurchase(res)
          purchaseRef.current = res;
          const params = {purchaseId: {eq: {str: res.id}, orderBy: "date", order: "asc"}}
          getPurchaseItems(params).then((res) => {
            setPurchaseItems(res)
          }).catch((err) => {
            console.log("Err", err)
          })
        }
      }).catch((err) => {
        console.log("Err", err)
      })
    } else {
      getTotems({params: {orderBy: {name: "asc"}}}).then((res) => {
        if (res) {
          setTotens(res)
        }
      })
      getProducts().then((res) => {
        if (res) {
          setProducts(res)
        }
      })
      getCities().then((res) => {
        if(res) {
          setCities(res)
        } 
      })
    }

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setPurchase(purchaseRef.current)
  }

  const mapCartItems = (items: PurchaseItemResp[]): CartItemType[] => {
    
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        qty: item.qty,
        qtyAdult: item.qtyAdult,
        qtyFree: item.qtyFree,
        qtyHalf: item.qtyHalf,
        netPrice: item.netPrice,
        partnerComm: item.partnerComm,
        companyComm: item.companyComm,
        totalPrice: item.totalPrice,
        date: item.date,
        cityId: item.cityId,
        time: product?.time ? product.time : '',
        local: product?.address ? product.address : '',
        location: product?.time ? product.time : '',
        operatorName: product?.time ? product.time : '',
        operatorPhone: product?.time ? product.time : '',
        totemId: item.totemId,
      }
    })
  }
 
  const handleSave = () => {
    if (isEditing) {
      editPurchaseById(purchase.id, purchase).then(() => {
        navigate(-1)
      }).catch((err) => {
        console.log("Err", err)
      })
    } 
    else {
      setNewPurchase({
        acceptedTerms: purchase.acceptedTerms,
        totemId: purchase.totemId,
        cartPrice: purchase.cartPrice,
        totalNetPrice: purchase.totalNetPrice,
        totalPartnerComm: purchase.totalPartnerComm,
        totalCompanyComm: purchase.totalCompanyComm,
        paymentValue: purchase.paymentValue,
        payementCaptured: purchase.payementCaptured,
        paymentId: purchase.paymentId,
        paymentMethod: purchase.paymentMethod,
        customerData: {
          name: purchase.customerName,
          phone: purchase.customerPhone,
          email: purchase.customerEmail,
        },
        products: mapCartItems(purchaseItems),
      }).then(() => {
        navigate(-1)
      })
    }

  }

  const purchaseChanged = (purchase1: PurchaseResp, purchase2: PurchaseResp) => {
    for (const i in purchase1) {
      if (purchase1[i as keyof PurchaseResp] !== purchase2[i as keyof PurchaseResp]) {
        return true
      }
    }
    return false
  }

  const handleAddItem = () => {
    const item = {
      ...initItem,
      id: String(purchaseItems.length)
    }
    setPurchaseItems([...purchaseItems, item])
  }

  const handleDeleteItem = (id: string, index: number) => {
    setPurchaseItems(purchaseItems.filter((i) => i.id !== id))
    const cloneAvails = productAvail.filter((av, idx) => idx !== index)
    setProductAvail(cloneAvails)
  }

  const handleSelectProduct = (e: ChangeEvent<HTMLSelectElement>, id: string, index: number) => {
    const product = products.find((p) => p.id === e.target.value)

    const items = purchaseItems.map((item) => {

      if (item.id === id) {
        return {
          ...item,
          cityId: product?.cityId || '',
          productId: product?.id || '',
          productAddres: product?.address || '',
          productAlignMessage: product?.alignMessage  || '',
          productDuration: product?.duration  || '',
          productLocation: product?.location || '',
          productName: product?.name  || '',
          productOperatorName: product?.operatorName  || '',
          productOperatorPhone: product?.operatorPhone || '',
          productTime: product?.time || '',
          cityName: cities?.find((c: CityResp) => c.id === product?.cityId)?.name || '',
        }
      }
      return item;
    })
    setPurchaseItems(items);
    if (product?.id) {
      getAvailabilities({
        productId: {eq: {str: product.id}},
        active: {eq: {boo: true}},
        availability: {gt: {num: 0}},
        remaining: {gt: {num: 0}},
        date: {ge: {str: dayjs().format("YYYY-MM-DD")}},
        orderBy: {asc: "date"},
      })
      .then((data: Availabilities | void) =>{
        if (data) {
          const av = [...productAvail]
          av[index] = data;
          console.log(av)
          setProductAvail(av);
        }
      });
    }
  }

  const handleSetItemDate = (date: string, index: number) => {
    setPurchaseItems(purchaseItems.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          date: date,
        }
      }
      return item;
    })) 
  }

  const handleChangeQty = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const quantities = {
      qty: purchaseItems[index].qty,
      qtyAdult: purchaseItems[index].qtyAdult,
      qtyHalf: purchaseItems[index].qtyHalf,
      qtyFree: purchaseItems[index].qtyFree
    }
    const product = products.find((p) => p.id === purchaseItems[index]?.productId)

    if (e.target.name === "adult") {
      quantities.qty = purchaseItems[index].qtyHalf + purchaseItems[index].qtyFree + Number(e.target.value);
      quantities.qtyAdult = Number(e.target.value) === 0 ? 0 : Number(e.target.value);
      quantities.qtyHalf = Number(e.target.value) === 0 ? 0 : purchaseItems[index].qtyHalf;
      quantities.qtyFree = Number(e.target.value) === 0 ? 0 : purchaseItems[index].qtyFree;
      const { price, netPrice, partnerComm, companyComm } = calcPrice(quantities, product as Product);

      setPurchaseItems(purchaseItems.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            qtyAdult: Number(e.target.value),
            qty: Number(e.target.value) === 0 ? 0 : item.qtyHalf + item.qtyFree + Number(e.target.value),
            qtyHalf: Number(e.target.value) === 0 ? 0 : item.qtyHalf,
            qtyFree: Number(e.target.value) === 0 ? 0 : item.qtyFree,
            totalPrice: price,
            netPrice,
            partnerComm,
            companyComm,
          }
        }
        return item;
      }))
    } else if (e.target.name === "half") {
      quantities.qtyHalf = Number(e.target.value);
      const { price, netPrice, partnerComm, companyComm } = calcPrice(quantities, product as Product);

      setPurchaseItems(purchaseItems.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            qtyHalf: Number(e.target.value),
            qty: item.qtyAdult + item.qtyFree + Number(e.target.value),
            totalPrice: price,
            netPrice,
            partnerComm,
            companyComm,
          }
        }
        return item;
      }))
    } else if (e.target.name === "free") {
      quantities.qtyFree = Number(e.target.value);
      const { price, netPrice, partnerComm, companyComm } = calcPrice(quantities, product as Product);

      setPurchaseItems(purchaseItems.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            qtyFree: Number(e.target.value),
            qty: item.qtyAdult + item.qtyHalf + Number(e.target.value),
            totalPrice: price,
            netPrice,
            partnerComm,
            companyComm,
          }
        }
        return item;
      }))
    }
  }

  const isCancelDisabled = !purchaseChanged(purchaseRef.current, purchase)
  const isSaveDisabled = !purchaseChanged(purchaseRef.current, purchase)

  useEffect(() => {
    const totalNetPrice = purchaseItems.reduce((acc, curr) => acc + curr.netPrice, 0);
    const totalPartnerComm = purchaseItems.reduce((acc, curr) => acc + curr.partnerComm, 0);
    const totalCompanyComm = purchaseItems.reduce((acc, curr) => acc + curr.companyComm, 0);

    setPurchase({
      ...purchase,
      totalNetPrice,
      totalPartnerComm,
      totalCompanyComm,
      cartPrice: totalNetPrice + totalPartnerComm + totalCompanyComm,
      paymentValue: totalNetPrice + totalPartnerComm + totalCompanyComm,
    })

  }, [purchaseItems]);

  return (
    <div>
      <p className="text-2xl pb-4"><span className="font-bold">Compra ID: </span> {purchase.id}</p>

      <div className="flex gap-6">
        <table className="mb-auto">
          <tbody>
            <tr>
              <td className="pr-2 font-bold">Cliente:</td>
              <td>{isEditing ? (
                purchase.customerName
              ): (
                <input
                  type="text"
                  placeholder="Nome"
                  className="input input-ghost w-full max-w-xs"
                  value={purchase.customerName}
                  onChange={(e) => setPurchase({...purchase, customerName: e.target.value})}
                />
              )}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">E-mail:</td>
              <td>{isEditing ? (
                purchase.customerEmail
              ): (
                <input
                  type="text"
                  placeholder="E-mail"
                  className="input input-ghost w-full max-w-xs"
                  value={purchase.customerEmail}
                  onChange={(e) => setPurchase({...purchase, customerEmail: e.target.value})}
                />
              )}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">Telefone:</td>
              <td>{isEditing ? (
                purchase.customerPhone
              ): (
                <input
                  type="text"
                  placeholder="Telefone"
                  className="input input-ghost w-full max-w-xs"
                  value={purchase.customerPhone}
                  onChange={(e) => setPurchase({...purchase, customerPhone: e.target.value})}
                />
              )}</td>
            </tr>
          </tbody>
        </table>

        <table className="">
          <tbody>
            <tr>
              <td className="pr-2 font-bold">Data da compra:</td>
              <td>{dayjs(purchase.timestamp).locale('pt-br').format('DD/MM/YYYY HH:mm')}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">Valor:</td>
              <td>{displayPrice(purchase.paymentValue)}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">Método de pagamento:</td>
              <td>{isEditing ? (
                purchase.paymentMethod
              ): (
                <input
                  type="text"
                  placeholder="Método de pag."
                  className="input input-ghost w-full max-w-xs"
                  value={purchase.paymentMethod}
                  onChange={(e) => setPurchase({...purchase, paymentMethod: e.target.value})}
                />
              )}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">ID do pagamento:</td>
              <td>{isEditing ? (
                purchase.paymentId
              ): (
                <input
                  type="text"
                  placeholder="ID do pag."
                  className="input input-ghost w-full max-w-xs"
                  value={purchase.paymentId}
                  onChange={(e) => setPurchase({
                    ...purchase,
                    paymentId: e.target.value,
                    payementCaptured: e.target.value.length ? true : false
                  })}
                />
              )}</td>
            </tr>
            <tr>
              <td className="pr-2 font-bold">Ponto da venda:</td>
              <td>{isEditing ? (
                purchase.totemNickName
              ): (
                <select
                  className="select select-ghost w-full max-w-xs"
                  onChange={(e) => setPurchase({...purchase, totemId: e.target.value})}
                  defaultValue={0}
                >
                  <option disabled value={0}>Escolha</option>
                  {totens?.sort((a, b) => a.nickName > b.nickName ? +1 : -1).map((totem) => (
                    <option value={totem.id} key={totem.id}>{totem.nickName}</option>
                  ))}
                </select>
              )}</td>
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
                    <th>Qtd</th>
                    <th>Neto</th>
                    <th>Com. Parceiro</th>
                    <th>Com. Totem Tour</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                {purchaseItems?.map((item, index) => (
                  <tr key={item.id} className="hover">
                    <td key={item.id}>
                      {isEditing ? (
                        item.productName
                      ): (
                        <select
                          className="select select-ghost w-full max-w-xs"
                          onChange={(e) => handleSelectProduct(e, item.id, index)}
                          defaultValue={0}
                        >
                          <option disabled value={0}>Escolha o produto</option>
                          {products
                            .filter((p) => (!p.isTest))
                            .map((product) => (
                            <option value={product.id} key={product.id}>{product.name}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td>{item.cityName}</td>
                    <td>
                      {isEditing ? (
                        dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')
                      ) : (
                        <select
                          className="select select-ghost w-full max-w-xs"
                          onChange={(e) => handleSetItemDate(e.target.value, index)}
                          defaultValue={0}
                          disabled={purchaseItems[index].productId.length === 0}
                        >
                          <option disabled value={0}>Escolha</option>
                          {productAvail[index]?.map((avail: Availability) => (
                            <option value={avail.date} key={avail.id}>{avail.date}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td>{item.productTime}</td>
                    <td>
                      {isEditing ? (
                        <div>{item.qty} (I: {item.qtyAdult}, M:{item.qtyHalf}, G:{item.qtyFree})</div>
                      ): (
                        <div>
                          <label className="input input-sm input-bordered flex items-center gap-2 w-14">
                            A:
                            <input
                              type="number"
                              min={0}
                              className="w-10"
                              placeholder=""
                              name="adult"
                              value={purchaseItems[index].qtyAdult}
                              onChange={(e) =>handleChangeQty(e, index)}
                              disabled={purchaseItems[index].date.length === 0}
                            />
                          </label>
                          {products.find((p) => p.id === purchaseItems[index].productId)?.isHalfPaxAllowed && (
                            <label className="input input-sm input-bordered flex items-center gap-2 w-14">
                              M:
                              <input
                                type="number"
                                min={0}
                                className="w-10"
                                placeholder=""
                                name="half"
                                disabled={purchaseItems[index].qtyAdult === 0}
                                value={purchaseItems[index].qtyHalf}
                                onChange={(e) =>handleChangeQty(e, index)}
                              />
                            </label>
                          )}
                          {products.find((p) => p.id === purchaseItems[index].productId)?.isFreePaxAllowed && (
                            <label className="input input-sm input-bordered flex items-center gap-2 w-14">
                              G:
                              <input
                                type="number"
                                min={0}
                                className="w-10"
                                placeholder=""
                                name="free"
                                disabled={purchaseItems[index].qtyAdult === 0}
                                value={purchaseItems[index].qtyFree}
                                onChange={(e) =>handleChangeQty(e, index)}
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </td>
                    <td>{displayPrice(item.netPrice)}</td>
                    <td>{displayPrice(item.partnerComm)}</td>
                    <td>{displayPrice(item.companyComm)}</td>
                    <td>{displayPrice(item.totalPrice)}</td>
                    {!isEditing && 
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteItem(item.id, index)}>
                            x
                        </button>
                      </td>
                    }
                  </tr>
                ))}
                  <tr className="bg-gray-200">
                    <td>Total:</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{displayPrice(purchase.totalNetPrice)}</td>
                    <td>{displayPrice(purchase.totalPartnerComm)}</td>
                    <td>{displayPrice(purchase.totalCompanyComm)}</td>
                    <td>{displayPrice(purchase.paymentValue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {!isEditing && (
              <div className="p-4 flex justify-end">
                <button className="btn btn-primary" onClick={handleAddItem}>Novo item</button>
              </div>
            )}
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
                  Seguem abaixo suas reservas:
                  <br /><br />
                  {purchaseItems.sort((a, b) => {
                    if (a.date > b.date) {
                      return 1;
                    } else {
                      return -1;
                    }
                  }).map((item) => 
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
              <div key={index} className="border p-2 bg-gray-100 mb-4">
                <p className="pb-2 font-bold">{index+1}- {item.productOperatorName}:</p>
                <div className="border p-2 ml-4 bg-white ">
                  <p>
                    Olá, {item.productOperatorName}! Nova reserva da *Totem Tour*!
                    <br /><br />
                    <>
                      ✅ *Passeio:* {item.productName}<br />
                      - *Qtd.:* {item.qty} pessoa(s):  (Int.: {item.qtyAdult}, Meia: {item.qtyHalf}, Grat.: {item.qtyFree})<br />
                      - *Data:* {dayjs(item.date).locale('pt-br').format('DD/MM/YYYY')}<br />
                      - *Hora:* {item.productTime}<br />
                      - *Nome do resp. da reserva:* {purchase.customerName}<br />
                      - *Telefone:*  {purchase.customerPhone}<br />
                      - *E-mail:*  {purchase.customerEmail}<br />
                      - *Preço neto total:* {displayPrice(item.netPrice)}<br />
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
                      - *Qtd.:* {item.qty} pessoa(s):  (Int.: {item.qtyAdult}, Meia:{item.qtyHalf}, Grat.:{item.qtyFree})<br />
                      - *Data da compra:* {dayjs(item.timestamp).locale('pt-br').format('DD/MM/YYYY HH:mm')}<br />
                      - *Comissão:* {displayPrice(item.partnerComm)}<br />
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