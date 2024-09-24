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

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Product } from '../../../api'
import { IconCart } from '../../atoms/IconCart'
import QtySelector from '../../molecules/QtySelector'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const desc = `
A embarcação Discover oferece o passeio mais animado de Arraial do Cabo. Uma linda embarcação com 2 andares, com toda estrutura e segurança. 

Pontos de Parada pra banho ou vista panorâmica:
- Prainhas do Pontal do Atalaia
- Praia da Ilha do Farol
- Gruta Azul
- Fenda de Nossa Senhora da Assunção
- Pedra do Gorila
- Impacto do Meteorito
- Enseada da Praia do Forno

Estrutura oferecida na embarcação:
- Banheiros masculino e feminino
- Wi-Fi liberado
- Bar e cozinha a bordo
- Bote inflável para desembarque nas praias
- Água mineral inclusa durante todo passeio
- Flutuadores disponíveis para mergulho
- Aluguel de snorkel
- Serviço de fotografia disponível (à parte)
- Equipamentos de segurança
- Embarcação vistoriada e licenciada pela Marinha do Brasil

Observações: 
- Desembarque na Ilha do Farol é limitado à 250 pessoas por vez e está sujeito à autorização da Marinha do Brasil
- O roteiro está sujeito à alterações ou cancelamento devido à condições climáticas ou impostas pela Marinha do Brasil
- Taxa de embarque de R$5,00 por pessoa na Marina dos Pescadores não está incluso nessa reserva
`

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
  const [qty, setQty] = useState(0)
  const [date, setDate] = useState('');

  const handleAdd = () => {
    setOpen(false);
    setCartOpen(true);
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
                      <span className='font-bold'>Descrição: </span>
                      {product.description}
                    </p>

                    <p style={{whiteSpace: 'pre-wrap'}}>{desc}</p>


                    <p className='text-xl mb-4'>
                      <span className='font-bold'>Local: </span>
                      {product.description}
                    </p>

                    <p className='text-xl mb-4'>
                      <span className='font-bold'>Horário: </span>
                      {product.description}
                    </p>

                    {product.minTotalPrice && (
                      <p className='text-xl mb-4'>
                        <span className='font-bold'>Valor: </span>
                        R${product.minTotalPrice},00 
                        ({product.minPriceDescription})
                      </p>
                    )}

                    <QtySelector qty={qty} setQty={setQty} maxQty={10} disabled={false} />
                    
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                   <button
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleAdd}
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
