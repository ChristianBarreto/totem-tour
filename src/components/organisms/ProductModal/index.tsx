/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Availabilities, Availabilitiy, getAvailabilitiesByProduct, Product, PurchaseItem } from '../../../api'
import { IconCart } from '../../atoms/IconCart'
import QtySelector from '../../molecules/QtySelector'
import ProductDetails from '../../atoms/ProductDetails'
import DateSelector from '../../molecules/DateSelector'
import PriceDisplay from '../../molecules/PriceDisplay'
import AlertMaxRound from '../../molecules/AlertMaxRound'
import { useCart } from '../../../context/CartContext'


const options = [
  {date: '2024-09-25'},
  {date: '2024-09-26'},
  {date: '2024-09-27'},
]

export default function ProductModal({
  product,
  open,
  setOpen,
  setCartOpen,
}: {
  product: Product,
  open: boolean,
  setOpen: (value: boolean) => void,
  setCartOpen: (value: boolean) => void,
}) {
  const [availabilities, setAvailabilities] = useState<Availabilities>([]);
  const [availability, setAvailability] = useState<Availabilitiy | null>(null);
  const [qty, setQty] = useState(0);
  const [maxRound, setMaxRound] = useState(false);
  
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();

  useEffect(() => {
    getAvailabilitiesByProduct(product.id)
    .then((data) =>{
      setAvailabilities(data as Availabilities)
    })
  }, [])

  const handleAdd = () => {
    if (availability) {
      const currentProduct: PurchaseItem = {
        productId: product.id,
        qty: qty,
        netPrice: product.netPrice,
        partnerComm: product.partnerComm,
        companyComm: product.companyComm,
        pricePerPerson: product.pricePerPerson,
        minTotalPrice: product.minTotalPrice,
        totalPrice: price,
        date: availability?.date,
        location: product.location
      }
  
      dispatch({type: 'addToCart', product: currentProduct})
      setOpen(false);
      setCartOpen(true);
    }
  }

  const qtySelectorDisable = availability === null;
  const addCartDisabled = qty === 0;

  let price = 0;

  if (qty < 1) {
    price = 0;
  } else {
    if ((qty * product.pricePerPerson < product.minTotalPrice)) {
      price = product.minTotalPrice;
    } else if ((qty * product.pricePerPerson >= product.minTotalPrice)) {
      price = qty * product.pricePerPerson;
    }
  }

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

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img alt={product.imgUrl} src={product.imgUrl} className="object-cover object-center" />
                </div>

                <div className="sm:col-span-8 lg:col-span-7">
                  
                  <h2 className="text-4xl font-bold text-gray-900 sm:pr-12 mb-6">{product.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <p className='text-xl mb-4'>
                      {product.description}
                    </p>

                    {product.details && <ProductDetails text={product.details} />}

                    <div className='mb-4'>
                      <p className='text-xl'>
                        <span className='font-bold'>Local: </span>
                        {product.location}
                      </p>
                      <p className='text-neutral-400'>(você receberá a localização exata por Email/WhatsApp)</p>
                    </div>
                    

                    <p className='text-xl mb-4'>
                      <span className='font-bold'>Horário: </span>
                      {product.time}
                    </p>

                    {product.minTotalPrice && (
                      <p className='text-xl mb-4'>
                        <span className='font-bold'>Valor: </span>
                        R${product.minTotalPrice},00 
                        <span className='text-neutral-400 pl-2 text-base'>({product.minPriceDescription})</span>
                      </p>
                    )}

                    <div className='flex justify-around mb-4'>
                      <DateSelector
                        setAvailability={setAvailability}
                        availabilities={availabilities}
                      />
                      <QtySelector
                        qty={qty}
                        setQty={setQty}
                        maxPerRound={product.maxPerRound}
                        remaining={availability?.remaining}
                        disabled={qtySelectorDisable}
                        setMaxRound={setMaxRound}
                      />
                    </div>

                    {maxRound && <AlertMaxRound setMaxRound={setMaxRound}/>}

                    <PriceDisplay price={price} />

                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                   <button
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                      onClick={handleAdd}
                      disabled={addCartDisabled}
                    >
                      <IconCart size={10}/>
                      <p className='text-3xl pl-3'>Adicionar ao carrinho</p>
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
