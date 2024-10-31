'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import IconPartner from '../../atoms/IconPartner'
import TouchInput from '../../atoms/TouchInput'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Keyboard from "react-simple-keyboard";
import { Totem } from '../../../api/totems/types'
import { getTotems } from '../../../api/totems/api'
import { useTotem } from '../../../context/TotemContext'


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
  // @ts-expect-error: TODO: fix type of context
  const [totem, handleSetTotem] = useTotem();
  const [user, setUser] = useState<User>({name: "", pass: ""});
  const [isLogged, setIsLogged] = useState(false);
  const [totems, setTotems] = useState<Totem[]>([]);
  const [selectedTotem, setSelectedTotem] = useState(totem.id);

  const keyboard = useRef();
  const [selectedInput, setSelectedInput] = useState('name');
  const [layoutName, setLayoutName] = useState("default");
  
  useEffect(() => {
    getTotems().then((res) => {
      setTotems(res);
    }).catch((err) => {
      console.log("Err", err)
    })
  }, [])

  const onChangeAll = (inputs: any) => {
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

  const handleLogin = () => {
    if (
      user.name === "totemtouradmin" &&
      user.pass === "ttadmin@01"
    ) {
      setIsLogged(true)
    }
  }

  const handleSelectTotem = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTotem(e.target.value)
    handleSetTotem(e.target.value)
  }

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
                  <p className="text-2xl font-bold text-gray-900 flex">{totem.nickName}</p>
                </button>
                
                {!true ? (
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
                      <button
                        className='btn btn-primary w-full mt-4'
                        onClick={handleLogin}
                      >
                        Entrar
                      </button>
                    </div>
                    
                    <Keyboard
                      keyboardRef={r => (keyboard.current = r)}
                      inputName={selectedInput}
                      layoutName={layoutName}
                      onChangeAll={onChangeAll}
                      onKeyPress={(button) => handleShift(button)}
                    />
                  </section>
                ): (
                  <div className='p-10 text-start'>
                    <p className='font-bold pb-4 text-center'>Configurações deste totem:</p>
                    <label className="form-control w-full">
                      Selecione o totem a ser utilizado aqui
                      <select
                        className="select select-bordered"
                        onChange={handleSelectTotem}
                        value={selectedTotem}
                        defaultValue=""
                      >
                        {totems.sort((a, b) => b.nickName > a.nickName ? -1 : 1).map((totem) => (
                          <option key={totem.id} value={totem.id}>{totem.nickName}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
