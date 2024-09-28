import { useEffect, useRef, useState } from "react"
import IconEmail from "../../atoms/IconEmail"
import IconPhone from "../../atoms/IconPhone"
import IconUser from "../../atoms/IconUser"
import { checkoutFieldValidation, PhoneMask } from "../../../helpers"
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import IconXCircle from "../../atoms/IconXCircle"
import IconCheckCircle from "../../atoms/IconCheckCircle"

type UserData = {
  name: string,
  email: string,
  phone: string,
}

type InputNames = 'name' | 'email' | 'phone'

export default function UserInfoForm({
  userData,
  setUserData,
}: {
  userData: UserData
  setUserData: (data: UserData) => void,
}) {

  const [formErrors, setFormErrors] = useState({
    name: {isValid: false, isError: false, errorMessage: 'Escreva seu nome completo.'},
    email: {isValid: false, isError: false, errorMessage: 'Favor informar um email válido.'},
    phone: {isValid: false, isError: false, errorMessage: 'Favor informar um telefone válido.'},
  })
  const [selectedInput, setSelectedInput] = useState('name');

  const [layoutName, setLayoutName] = useState("default");  
  const nameRef = useRef<HTMLInputElement>(null)
  const keyboard = useRef();

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

  const onChangeAll = (inputs: any) => {
    if ((userData.name !== undefined) && (userData.name !== inputs.name)) {
      handleInputChange('name', inputs['name']);

    } else if ((userData.email !== undefined) && (userData.email !== inputs.email)) {
      handleInputChange('email', inputs['email']);

    } else if ((userData.phone !== undefined) && (userData.phone !== inputs.phone)) {
      handleInputChange('phone', inputs['phone']);

    }
  };

  const handleInputChange = (inputName: InputNames, value: string) => {
    if (inputName === 'phone'){
      setUserData({...userData, [inputName]: PhoneMask(value)})
    } else {
      setUserData({...userData, [inputName]: value})
    }
    validateField(inputName, value);
  }

  const validateField = (inputName: InputNames, value: string) => {
    if (checkoutFieldValidation(inputName, value)) {
      setFormErrors({
        ...formErrors,
        [inputName]: {...formErrors[inputName], isValid: true, isError: false},
      });
    } else {
      setFormErrors({
        ...formErrors,
        [inputName]: {...formErrors[inputName], isValid: false, isError: true},
      });
    }
  }
 
  useEffect(() => {
    nameRef.current?.focus();
  }, [])

  return (
    <div
      className="flex flex-col justify-center gap-8"
    >
      <p className="text-4xl text-primary pb-8 text-center">Digite seus dados para enviarmos todas as informações:</p>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4 w-3/4">

            

          <div className="">
            <div className={`
              input input-bordered input-lg flex items-center w-full
              ${formErrors.name.isValid && 'input-primary'}
              ${formErrors.name.isError && 'input-error'}
              ${(selectedInput === 'name') && 'bg-yellow-100'}
            `}>
              <IconUser />  
              <input
                type="text"
                className="grow"
                placeholder="Nome completo"
                required
                name="name"
                value={userData.name}
                onFocus={(e) => setSelectedInput('name')}
                ref={nameRef}
              />
              {formErrors.name.isError && <IconXCircle color="text-red-600" />}  
              {formErrors.name.isValid && <IconCheckCircle color="text-green-600" />}  
            </div>
          </div>
          {formErrors.name.isError ? (<p className="text-red-500 text-xl">{formErrors.name.errorMessage}</p>) : <br className="pb-4"/>}

          <div className="w-full">
            <div className={
              `input input-bordered input-lg flex items-center gap-2 w-full 
              ${formErrors.email.isValid && 'input-primary'}
              ${formErrors.email.isError && 'input-error'}
              ${(selectedInput === 'email') && 'bg-yellow-100'}
            `}>
              <IconEmail />
              <input
                type="text"
                className="grow"
                placeholder="E-mail"
                required
                name="email"
                value={userData.email}
                onFocus={(e) => setSelectedInput('email')}
              />  
              {formErrors.email.isError && <IconXCircle color="text-red-600" />}  
              {formErrors.email.isValid && <IconCheckCircle color="text-green-600" />}  
            </div>
          </div>
          {formErrors.email.isError ? (<p className="text-red-500 text-xl">{formErrors.email.errorMessage}</p>) : <br className="pb-4"/>}

          <div className="w-full">
            <div className={`
              input input-bordered input-lg flex items-center gap-2 w-full 
              ${formErrors.phone.isValid && 'input-primary'}
              ${formErrors.phone.isError && 'input-error'}
              ${(selectedInput === 'phone') && 'bg-yellow-100'}  
            `}>
              <IconPhone />
              <input
                type="text"
                className="grow"
                placeholder="Telefone com DDD"
                required
                name="phone"
                value={userData.phone}
                onFocus={(e) => setSelectedInput('phone')}
              />
              {formErrors.phone.isError && <IconXCircle color="text-red-600" />}  
              {formErrors.phone.isValid && <IconCheckCircle color="text-green-600" />}  
            </div>
          </div>
          {formErrors.phone.isError ? (<p className="text-red-500 text-xl">{formErrors.phone.errorMessage}</p>) : <br className="pb-4"/>}

        </div>

      </div>

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        inputName={selectedInput}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={(button) => handleShift(button)}
      />
  
      <br />
    </div>
  )
}