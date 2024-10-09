'use client'


import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { addAvailability, Availabilitiy, editAvailabilityById, getAvailabilityById, Product } from '../../../api'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { objectChanged } from '../../../helpers'


export default function AvailabilityModal({
  open,
  setOpen,
  date,
  product,
  availabilityId = null,
  setReloadTable,
  reloadTable,
}: {
  open: boolean,
  setOpen: (value: boolean) => void,
  date: string,
  product: Product
  availabilityId?: string | null
  setReloadTable: (value: number) => void
  reloadTable: number
}) {
  const initAvailability = {
    id: '',
    date: date,
    productId: product.id,
    active: true,
    availability: 0,
    booked: 0,
    remaining: 0,
  }

  const [availability, setAvailability] = useState<Availabilitiy>(initAvailability);
  
  const availabilityRef = useRef(initAvailability);

  useEffect(() => {
    let ignore = false;
    
    if (availabilityId) {
      getAvailabilityById(availabilityId).then((res) => {
        if (res && !ignore) {
          setAvailability(res)
          availabilityRef.current = res;
        }
      })
    }

    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setAvailability(availabilityRef.current)
  }
 
  const handleSave = () => {
    if (availabilityId) {
      editAvailabilityById(availabilityId, availability).then((res) => {
        setReloadTable(reloadTable+1)
        setOpen(false);
      })
    } else {
      addAvailability(availability).then((res) => {
        setReloadTable(reloadTable+1)
        setOpen(false);
      })
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'availability'){ 
      setAvailability({
        ...availability,
        availability: Number(e.target.value),
        remaining: Number(e.target.value) - availability.booked,
      })
    } else if (e.target.name === 'booked'){ 
      setAvailability({
        ...availability,
        booked: Number(e.target.value),
        remaining: availability.availability - Number(e.target.value),
      })
    }
  }

  console.log("Disabled", objectChanged(availability, availabilityRef))

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-600 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-100 transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 "
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

              <div className="w-full items-start gap-x-6 ">
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-4xl font-bold text-gray-900 sm:pr-12 mb-6">Disponibilidade</h2>
                </div>

                <p className='text-xl'>{product.name}</p>
                {availability.id ? <p>Disp. ID: {availability.id}</p> : <p>(nova disponibilidade)</p>}

                <label className="form-control w-full max-w-xs pt-6">
                  <div className="label">
                    <span className="label-text">Dia da disponibilidade:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={dayjs(availability.date).locale('pt-br').format('DD/MM/YYYY - dddd')}
                  />
                </label>

                <div className="form-control pt-4 pb-4">
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={availability.active}
                      onChange={(e) => setAvailability({...availability, active: !availability.active})}
                    />
                    <span className="label-text pl-4">Tem disponibilidade</span>
                  </label>
                </div>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Qtd de disponibilidade:</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={availability.availability}
                    name="availability"
                    min={0}
                    onChange={(e) => handleChange(e)}
                    />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Agendados:</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={availability.booked}
                    name="booked"
                    min={0}
                    max={availability.availability}
                    onChange={(e) => handleChange(e)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Sobrando:</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    min={0}
                    value={availability.availability - availability.booked}
                    name="remaining"
                    onChange={(e) => handleChange(e)}
                  />
                </label>

                <div className='mt-6 flex justify-end'>
                  <button className='btn' onClick={handleCancel} disabled={false}>Cancelar</button>
                  <button className='btn btn-primary ml-4' onClick={handleSave} disabled={false}>Salvar</button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
