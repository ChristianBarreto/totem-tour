'use client'


import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Company } from '../../../api/totemtour/types';


export default function TermsModal({
  open,
  setOpen,
  company,
}: {
  open: boolean,
  setOpen: (value: boolean) => void,
  company: Company
}) {

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto" data-cy="terms-of-use-modal">
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
                data-cy="terms-of-use-modal-close"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="w-full items-start gap-x-6 ">
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-4xl font-bold text-gray-900 sm:pr-12 mb-6">Termos de uso</h2>
                </div>
                <div className="">
                  {company?.companyName && <p>{company?.companyName}</p>}
                  {company?.cnpj && <p>CNPJ: {company?.cnpj}</p>}
                  {company?.phone && <p>Contato: {company?.phone}</p>}
                  {company?.email && <p>Email: {company?.email}</p>}
                  <p className="text-2xl font-bold text-gray-900 mt-6">Termos de privacidade:</p>
                  <textarea className='w-full pt-8' style={{height: '400px', overflowY: 'scroll'}} disabled>{company?.privacyTerms}</textarea>
                  <p className="text-2xl font-bold text-gray-900">Termos serviço e cancelamento</p>
                  <textarea className='w-full pt-8' style={{height: '400px', overflowY: 'scroll'}} disabled>{company?.serviceAndCancelationTerms}</textarea>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
