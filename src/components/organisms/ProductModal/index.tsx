'use client'

import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartItemType } from '../../../api/purchaseitems/types';
import { Availability, Availabilities } from '../../../api/availabilities/types';
import { getAvailabilitiesByProduct } from '../../../api/availabilities/api';
import { Cities } from '../../../api/cities/types';
import { getCities } from '../../../api/cities/api';
import { Product } from '../../../api/products/types';
import { IconCart } from '../../atoms/IconCart';
import ProductDetails from '../../atoms/ProductDetails';
import AlertMaxRound from '../../molecules/AlertMaxRound';
import { useCart } from '../../../context/CartContext';
import ProductForm from '../../molecules/ProductForm';
import { calcPrice, initProduct, qtySelectorDisabler } from '../../../helpers';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase';
import { getProductById } from '../../../api/products/api';

export default function ProductModal({
  prefetch,
  productId,
  open,
  setOpen,
  setCartOpen,
}: {
  prefetch?: Product,
  productId: string,
  open: boolean,
  setOpen: (value: boolean) => void,
  setCartOpen: (value: boolean) => void,
}) {
  const [product, setProduct] = useState<Product>(initProduct);
  const [productIsLoading, setProductIsLoading] = useState(true);
  const [productIsError, setProductIsError] = useState(false);
  const [availabilities, setAvailabilities] = useState<Availabilities>([]);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [qty, setQty] = useState(0);
  const [maxRound, setMaxRound] = useState(false);
  const [cities, setCities] = useState<Cities>([])
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();

  useEffect(() => {
    logEvent(analytics, `product_modal_${product.name}`)
    getProductById(productId).then((res) => {
      setProduct(res as Product);
      setProductIsLoading(false)
    }).catch((err) => {
      console.log("Err", err)
      setProductIsLoading(false);
      setProductIsError(true);
    });

    getAvailabilitiesByProduct(productId)
    .then((data) =>{
      setAvailabilities(data as Availabilities)
    })

    getCities().then((res) => {
      if (res) {
        setCities(res)
      }
    })
  }, [])

  let { price, netPrice, partnerComm, companyComm } = calcPrice(qty, product);

  const handleAdd = () => {
    if (availability) {
      const currentProduct: CartItemType = {
        productId: product.id,
        qty: qty,
        netPrice: netPrice,
        partnerComm: partnerComm,
        companyComm: companyComm,
        totalPrice: price,
        date: availability?.date,
        time: '',
        cityId: product.cityId,
        local: '',
        location: '',
        operatorName: '',
        operatorPhone: '',
        totemId: ''
      }
  
      dispatch({type: 'addToCart', product: currentProduct})
      setOpen(false);
      setCartOpen(true);
    }
  }

  const qtySelectorDisable = qtySelectorDisabler(availability);
  const addCartDisabled = qty === 0 || price === 0;

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {productIsLoading ? (
                <div className='flex justify-middle'>
                  <span>Carregando...</span>
                </div>
              ) : (
                <div>
                  {productIsError ? (
                  <div role="error" className="alert bg-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Produto não encontrado. Tente de novo mais tarde</span>
                  </div>
                  ): (
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img alt={product.imgUrl} src={product.imgUrl} className="object-cover object-center" />
                      </div>
    
                      <div className="sm:col-span-8 lg:col-span-7">
                        
                        <h2 className="text-4xl font-bold text-gray-900 sm:pr-12 mb-6">{product.name}</h2>
    
                        <p className='text-xl mb-4'>
                          {product.description}
                        </p>
    
                        {product.details && <ProductDetails text={product.details} />}
    
                          {product.isAvailable ? (
                            <div>
    
                              <div className='mb-4'>
                                <p className='text-xl'>
                                  <span className='font-bold'>Local: </span>
                                  {cities.find((city) => city.id === product.cityId)?.name}
                                </p>
                                <p className='text-neutral-400'>(você receberá a localização exata por WhatsApp/Email)</p>
                              </div>
    
                              <div className='mb-4'>
                                <p className='text-xl'>
                                  <span className='font-bold'>Horário: </span>
                                  {product.time}
                                </p>
                                <p className='text-neutral-400'>(horario será confirmado por WhatsApp/Email após a reserva)</p>
                              </div>
    
                              {product.duration && <p className='text-xl mb-4'>
                                <span className='font-bold'>Duração: </span>
                                {product.duration}
                              </p>}
                              
                              {true && (
                                <p className='mb-4'>
                                  {product.priceType === "single-value" && (
                                    <>
                                      <span className='text-xl font-bold'>Valor único: </span>
                                      <span className='text-xl'>R${product.netPrice + product.partnerComm + product.companyComm},00</span>
                                    </>
                                  )}
                                  {product.priceType === "variable-value" && (
                                    <>
                                      <span className='text-xl font-bold'>Valor por pessoa: </span>
                                      <span className='text-xl'>R${product.netPrice + product.partnerComm + product.companyComm},00</span>
                                    </>
                                  )}
                                  {product.priceType === "defined-value" && (
                                    <p>
                                      <span className='text-xl font-bold'>Valor: </span>
                                      <span className='text-neutral-400 text-md'>(selecione a quantidade de pessoas para ver o valor)</span>
                                    </p>
                                  )}
                                  
                                </p>
                              )}
    
                              <ProductForm 
                                setAvailability={setAvailability}
                                availabilities={availabilities}
                                qty={qty}
                                setQty={setQty}
                                product={product}
                                availability={availability}
                                setMaxRound={setMaxRound}
                                qtySelectorDisable={qtySelectorDisable}
                                price={price}
                              />
                              {maxRound && <AlertMaxRound setMaxRound={setMaxRound}/>}
                        
                              <button
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                                onClick={handleAdd}
                                disabled={addCartDisabled}
                              >
                                <IconCart size={10}/>
                                <p className='text-3xl pl-3'>Adicionar ao carrinho</p>
                              </button>
                            </div>
                          ): (
                            <div role="alert" className="alert bg-accent">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 shrink-0 stroke-current">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span>{product.notAvailableMessage || 'Vagas esgotadas.'}</span>
                            </div>
                          )}
    
                      </div>
                    </div>  
                  )}
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
