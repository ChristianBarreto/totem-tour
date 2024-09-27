'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../context/CartContext'
import { Products } from '../../../api'
import IconTrash from '../../atoms/IconTrash'

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
  const [cart, dispatch] = useCart();

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
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
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
                            <li key={index} className="flex py-6">
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
                                      <a href={product.href}>{refProduct?.name}</a>
                                    </h3>
                                    <p className="ml-4">R${product.totalPrice},00</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500"><span className='font-bold'>Cidade:</span> {product.location}</p>
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
                                        index: index
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
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>R${cart.cartPrice},00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Você reberá todas as informações por WhatsApp/E-mail</p>
                  <div className="mt-6">
                    <button
                      className="btn w-full bg-orange-600 px-6 py-3 text-base text-white shadow-sm hover:bg-orange-500 disabled:bg-organge-200"
                      disabled={!cart.products.length}
                    >
                      Reservar
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      ou{' '}
                      <button
                        type="button"
                        onClick={() => setCartOpen(false)}
                        className="font-medium text-orange-600 hover:text-orange-500"
                      >
                        Continuar comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
