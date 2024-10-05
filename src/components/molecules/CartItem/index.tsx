import { useEffect, useState } from "react";
import { Cities, getCities, Product, PurchaseItem } from "../../../api"
import { useCart } from "../../../context/CartContext";
import IconTrash from "../../atoms/IconTrash"

export default function CartItem({
  refProduct,
  product,
  cartIndex,
}:{
  refProduct: Product | undefined,
  product: PurchaseItem,
  cartIndex: number,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();
  const [cities, setCities] = useState<Cities>([])

  useEffect(() => {
    getCities().then((res) => {
      if (res) {
        setCities(res)
      }
    })
  }, [])

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt="asd"
          src={refProduct?.imgUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              {refProduct?.name}
            </h3>
            <p className="ml-4">R${product.totalPrice},00</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            <span className='font-bold'>Cidade:</span>
            {cities.find((city) => city.id === product.cityId)?.name}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500"><span className='font-bold'>Quant. pessoas:</span> {product.qty}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-red-600 hover:text-red-500 flex"
              onClick={() => dispatch({
                type: 'removeItem',
                product: product,
                index: cartIndex
              })}
            >
              <IconTrash size={4}/>
              <p>Remover</p>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}