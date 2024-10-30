'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../context/CartContext'
import IconTrash from '../../atoms/IconTrash'

export default function DeleteCartModal({
  open,
  setOpen,
}: {
  open: boolean,
  setOpen: (value: boolean) => void,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCart();

  const handleDelete = () => {
    dispatch({type: 'deleteCart'});
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed flex justify-center inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex justify-center w-full transform text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95"
          >
            <div className="relative flex justify-center w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Deseja mesmo apagar o seu carrinho?</h2>

                <section aria-labelledby="information-heading" className="mt-2">
                  <p className='text-xl mb-4'>
                    Todos os passeios do seu carrinho serão apagados.
                  </p>
                </section>

                <section aria-labelledby="options-heading" className="mt-10">
                  <button
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200"
                    onClick={() => handleDelete()}
                  >
                    <IconTrash size={10}/>
                    <p className='text-3xl pl-3'>Apagar carrinho</p>
                  </button>
                </section>
              </div>

            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
