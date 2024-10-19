'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../context/CartContext'
import { Products } from '../../../api/products/types'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../molecules/CartItem'
import CartTotal from '../../molecules/CartTotal'

export default function CartModal({
  cartOpen,
  setCartOpen,
  products,
}: {
  cartOpen: boolean,
  setCartOpen: (status: boolean) => void,
  products: Products,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [cart, ] = useCart();
  const navigate = useNavigate();

  return (
    <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                <div>
                  <div className="flex-1 overflow-y-auto py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Carrinho de compras</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setCartOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart.products.map((product: any, index: number) => {
                            const refProduct = products.find((prod) => prod.id === product.productId)
                            return (
                              <CartItem key={index} refProduct={refProduct} product={product} cartIndex={index}/>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <CartTotal setCartOpen={setCartOpen}/>
                </div>               
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
