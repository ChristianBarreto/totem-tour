import { useEffect, useState } from "react";
import { CartItemType } from "../../../api/purchaseitems/types";
import { CitiesResp } from "../../../api/cities/types";
import { getCities } from "../../../api/cities/api";
import { Product } from "../../../api/products/types";
import { useCart } from "../../../context/CartContext";
import IconTrash from "../../atoms/IconTrash";
import { displayPrice } from "../../../helpers";

export default function CartItem({
  refProduct,
  product,
  cartIndex,
}:{
  refProduct: Product | undefined,
  product: CartItemType,
  cartIndex: number,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();
  const [cities, setCities] = useState<CitiesResp>([])

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
            <h3 data-cy="cart-item-name">
              {refProduct?.name}
            </h3>
            <p className="ml-4" data-cy="cart-item-price">{displayPrice(product.totalPrice)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500" data-cy="cart-item-city">
            <span className='font-bold'>Cidade: </span>
            {cities.find((city) => city.id === product.cityId)?.name}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500" data-cy="cart-item-qty">
            <span className='font-bold'>Quant. pessoas:</span> {product.qty}
          </p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-red-600 hover:text-red-500 flex"
              onClick={() => dispatch({
                type: 'removeItem',
                product: product,
                index: cartIndex
              })}
              data-cy="cart-item-remove"
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