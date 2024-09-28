import { useEffect, useRef, useState } from "react"
import IconEmail from "../../atoms/IconEmail"
import IconPhone from "../../atoms/IconPhone"
import IconUser from "../../atoms/IconUser"
import { checkoutFieldValidation, PhoneMask } from "../../../helpers"
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';

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

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
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
    <form
      className="flex flex-col gap-2"
    >
      <div className="w-full">
        <div className={`
          input input-bordered  flex items-center gap-2 w-full
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
        </div>
      </div>
      {formErrors.name.isError ? (<p className="text-red-500">{formErrors.name.errorMessage}</p>) : <br className="pb-4"/>}

      <div className="w-full">
        <div className={
          `input input-bordered flex items-center gap-2 w-full 
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
        </div>
      </div>
      {formErrors.email.isError ? (<p className="text-red-500">{formErrors.email.errorMessage}</p>) : <br className="pb-4"/>}

      <div className="w-full">
        <div className={`
          input input-bordered flex items-center gap-2 w-full 
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
        </div>
      </div>
      {formErrors.phone.isError ? (<p className="text-red-500">{formErrors.phone.errorMessage}</p>) : <br className="pb-4"/>}

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        inputName={selectedInput}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={(button) => {if (button === "{shift}" || button === "{lock}") handleShift();}}
      />
  
      <br />
    </form>
  )
}