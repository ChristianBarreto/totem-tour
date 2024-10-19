import { ChangeEvent, useEffect, useState } from "react"
import { PriceTypes, Product } from "../../../api"
import { listenerCount } from "stream";
import IsShownWhereBadge from "../../atoms/IsShownWhereBadge";

export default function PriceForm({
  priceType,
  product,
  setProduct
}: {
  priceType: PriceTypes
  product: Product,
  setProduct: (value: Product) => void,
}) {

  let price = 0;
  let variablePrice = [0, 0, 0, 0];

  if ((priceType === "single-value") || (priceType === "variable-value")) {
    price = product.netPrice + product.partnerComm + product.companyComm;
  } else if (priceType === "defined-value") {
    variablePrice = variablePrice.map((price, index) => {
      const netPriceIndex = `netPrice${index+1}` as keyof Product;
      const partnerCommIndex = `partnerComm${index+1}` as keyof Product;
      const companyCommIndex = `companyComm${index+1}` as keyof Product;
      
      return (product[netPriceIndex] as number) + Number(product[partnerCommIndex]) + Number(product[companyCommIndex]);
    })
  }

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if ((priceType === "single-value") || (priceType === "variable-value")) {
      setProduct({
        ...product,
        [e.target.name]: Number(e.target.value),
      });
    }
  }

  return (
    <div>
      {(priceType === "single-value") && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Preço neto</th>
                <th>Comissão parceiro</th>
                <th>Comissão Totem Tour</th>
                <th>Preço no display</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-baseline">
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="netPrice"
                  value={product.netPrice}
                  onChange={(e) => handlePrice(e)}
                />
                </td>
                <td className="align-baseline">
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="partnerComm"
                    value={product.partnerComm}
                    onChange={(e) => handlePrice(e)}
                  />
                </td>
                <td className="align-baseline">
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    name="companyComm"
                    value={product.companyComm}
                    onChange={(e) => handlePrice(e)}
                  />
                </td>
                <td className="bg-gray-100">
                  <p className="mb-2"><span className="font-bold">1 pax:</span> <span className="bg-accent rounded p-1">R${price * 1},00</span></p>
                  <p className="mb-2"><span className="font-bold">2 pax:</span> <span className="bg-accent rounded p-1"> R${price * 1},00</span></p>
                  <p className="mb-2"><span className="font-bold">3 pax:</span> <span className="bg-accent rounded p-1"> R${price * 1},00</span></p>
                  <p className="mb-2"><span className="font-bold">4 pax:</span> <span className="bg-accent rounded p-1"> R${price * 1},00</span></p>
                  <p className="mb-2">... até a disponibilidade máxima</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {(priceType === "variable-value") && (
        <div>
        <table className="table">
          <thead>
            <tr>
              <th>Preço neto</th>
              <th>Comissão parceiro</th>
              <th>Comissão Totem Tour</th>
              <th>Preço no display</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-baseline">
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="netPrice"
                  value={product.netPrice}
                  onChange={(e) => handlePrice(e)}
                />
              </td>
              <td className="align-baseline">
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="partnerComm"
                  value={product.partnerComm}
                  onChange={(e) => handlePrice(e)}
                />
              </td>
              <td className="align-baseline">
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  name="companyComm"
                  value={product.companyComm}
                  onChange={(e) => handlePrice(e)}
                />
              </td>
              <td className="bg-gray-100">
                <p className="mb-2"><span className="font-bold">1 pax:</span> <span className="bg-accent rounded p-1">R${price * 1},00</span></p>
                <p className="mb-2"><span className="font-bold">2 pax:</span> <span className="bg-accent rounded p-1"> R${price * 2},00</span></p>
                <p className="mb-2"><span className="font-bold">3 pax:</span> <span className="bg-accent rounded p-1"> R${price * 3},00</span></p>
                <p className="mb-2"><span className="font-bold">4 pax:</span> <span className="bg-accent rounded p-1"> R${price * 4},00</span></p>
                <p className="mb-2">... até a disponibilidade máxima</p>
              </td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    )}


      {(priceType === "defined-value") && (
        <table className="table">
          <tr>
            <th>Pax</th>
            <th>Preço neto</th>
            <th>Comissão parceiro</th>
            <th>Comissão Totem Tour</th>
            <th>Preço no display</th>
          </tr>
          <tr>
            <th>1 pax</th>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.netPrice1}
                onChange={(e) => setProduct({...product, netPrice1: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.partnerComm1}
                onChange={(e) => setProduct({...product, partnerComm1: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.companyComm1}
                onChange={(e) => setProduct({...product, companyComm1: Number(e.target.value) })}
              />
            </td>
            <td className="bg-gray-100">
              <p className="mb-2"><span className="font-bold">1 pax:</span> <span className="bg-accent rounded p-1">R${variablePrice[0]},00</span></p>
            </td>
          </tr>
          <tr>
            <th>2 pax</th>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.netPrice2}
                onChange={(e) => setProduct({...product, netPrice2: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.partnerComm2}
                onChange={(e) => setProduct({...product, partnerComm2: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.companyComm2}
                onChange={(e) => setProduct({...product, companyComm2: Number(e.target.value) })}
              />
            </td>
            <td className="bg-gray-100">
              <p className="mb-2"><span className="font-bold">2 pax:</span> <span className="bg-accent rounded p-1">R${variablePrice[1] * 1},00</span></p>
            </td>
          </tr>
          <tr>
            <th>3 pax</th>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.netPrice3}
                onChange={(e) => setProduct({...product, netPrice3: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.partnerComm3}
                onChange={(e) => setProduct({...product, partnerComm3: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.companyComm3}
                onChange={(e) => setProduct({...product, companyComm3: Number(e.target.value) })}
              />
            </td>
            <td className="bg-gray-100">
              <p className="mb-2"><span className="font-bold">3 pax:</span> <span className="bg-accent rounded p-1">R${variablePrice[2] * 1},00</span></p>
            </td>
          </tr>
          <tr>
            <th>4 pax:</th>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.netPrice4}
                onChange={(e) => setProduct({...product, netPrice4: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.partnerComm4}
                onChange={(e) => setProduct({...product, partnerComm4: Number(e.target.value) })}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={product.companyComm4}
                onChange={(e) => setProduct({...product, companyComm4: Number(e.target.value) })}
              />
            </td>
            <td className="bg-gray-100">
              <p className="mb-2"><span className="font-bold">4 pax:</span> <span className="bg-accent rounded p-1">R${variablePrice[3] * 1},00</span></p>
            </td>
          </tr>
        </table>        
        
      )}
      <IsShownWhereBadge isShownDisplay isShownPurchase/>
    </div>
  )
}