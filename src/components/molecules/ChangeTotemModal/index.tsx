'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../../context/CartContext'
import IconTrash from '../../atoms/IconTrash'
import IconPartner from '../../atoms/IconPartner'
import TouchInput from '../../atoms/TouchInput'
import { useRef, useState } from 'react'
import Keyboard from "react-simple-keyboard";


type User = {
  name: string,
  pass: string,
}

export default function ChangeTotemModal({
  open,
  setOpen,
}: {
  open: boolean,
  setOpen: (value: boolean) => void,
}) {
  const [user, setUser] = useState<User>({name: "", pass: ""});

  const keyboard = useRef();
  const [selectedInput, setSelectedInput] = useState('name');
  const [layoutName, setLayoutName] = useState("default");  

  const onChangeAll = (inputs: any) => {
    console.log(">>>", selectedInput, inputs)

    if ((user.name !== undefined) && (user.name !== inputs.name)) {
      handleInputChange('name', inputs['name']);
    } else if ((user.pass !== undefined) && (user.pass !== inputs.pass)) {
      handleInputChange('pass', inputs['pass']);
    }
  };

  const handleInputChange = (inputName: string, value: string) => {
    setUser({...user, [inputName]: value})
  }

  const handleShift = (button: string) => {
    if (button === "{shift}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
      return;
    } 
    if (button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
      return;
    };
    setLayoutName('default')
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed flex justify-center inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex justify-center min-h-full items-stretch justify-center text-center md:items-center">
          <DialogPanel
            transition
            className="flex justify-center w-full transform text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:max-w-3xl data-[closed]:md:translate-y-0 data-[closed]:md:scale-95"
          >
            <div className="relative flex justify-center w-full items-center overflow-hidden bg-white shadow-2xl p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className='w-full'>
                <button className='btn btn-ghost'>
                  <IconPartner />
                  <p className="text-2xl font-bold text-gray-900 flex">Partner name</p>
                </button>
                
                <section>
                  <div className='p-10'>
                    <TouchInput
                      value={user.name}
                      name="name"
                      type="text"
                      placeholder='Login'
                      setSelectedInput={setSelectedInput}
                    />
                    <TouchInput
                      value={user.pass}
                      name="pass"
                      type="password"
                      placeholder='Senha'
                      setSelectedInput={setSelectedInput}
                    />
                  </div>
                  

                  <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    inputName={selectedInput}
                    layoutName={layoutName}
                    onChangeAll={onChangeAll}
                    onKeyPress={(button) => handleShift(button)}
                  />
                </section>
              </div>

            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
