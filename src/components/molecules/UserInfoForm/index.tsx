import { useEffect, useRef, useState } from "react"
import IconEmail from "../../atoms/IconEmail"
import IconPhone from "../../atoms/IconPhone"
import IconUser from "../../atoms/IconUser"
import { checkoutFieldValidation, PhoneMask } from "../../../helpers"
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import IconXCircle from "../../atoms/IconXCircle"
import IconCheckCircle from "../../atoms/IconCheckCircle"
import { logEvents } from "../../../firebase";
import { useTotem } from "../../../context/TotemContext"


type CustomerData = {
  name: string,
  email: string,
  phone: string,
}

type InputNames = 'name' | 'email' | 'phone'

export default function UserInfoForm({
  customerData,
  setCustomerData,
}: {
  customerData: CustomerData
  setCustomerData: (data: CustomerData) => void,
}) {
  // @ts-expect-error: TODO: fix type of context
  const [totem, ] = useTotem();

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

  const onChangeAll = (inputs: CustomerData) => {
    if ((customerData.name !== undefined) && (customerData.name !== inputs.name)) {
      handleInputChange('name', inputs['name']);

    } else if ((customerData.email !== undefined) && (customerData.email !== inputs.email)) {
      handleInputChange('email', inputs['email']);

    } else if ((customerData.phone !== undefined) && (customerData.phone !== inputs.phone)) {
      handleInputChange('phone', inputs['phone']);
    }
  };

  const handleInputChange = (inputName: InputNames, value: string) => {
    if (inputName === 'phone'){
      setCustomerData({...customerData, [inputName]: PhoneMask(value)})

    } else {
      setCustomerData({...customerData, [inputName]: value})
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

  useEffect(() => {
    if (totem?.nickName) {
      logEvents(`checkout_user_info`, {totemNickName: totem.nickName});
    }
    
  }, [totem])

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
                value={customerData.name}
                onFocus={() => setSelectedInput('name')}
                ref={nameRef}
                data-cy="user-name"
              />
              {formErrors.name.isError && <IconXCircle classes="text-red-600 size-6" />}  
              {formErrors.name.isValid && <IconCheckCircle classes="text-green-600 size-6" />}  
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
                value={customerData.email}
                onFocus={() => setSelectedInput('email')}
                data-cy="user-email"
              />  
              {formErrors.email.isError && <IconXCircle classes="text-red-600 size-6" />}  
              {formErrors.email.isValid && <IconCheckCircle classes="text-green-600 size-6" />}  
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
                value={customerData.phone}
                onFocus={() => setSelectedInput('phone')}
                data-cy="user-phone"
              />
              {formErrors.phone.isError && <IconXCircle classes="text-red-600 size-6" />}  
              {formErrors.phone.isValid && <IconCheckCircle classes="text-green-600 size-6" />}  
            </div>
          </div>
          {formErrors.phone.isError ? (<p className="text-red-500 text-xl">{formErrors.phone.errorMessage}</p>) : <br className="pb-4"/>}

        </div>

      </div>

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        inputName={selectedInput}
        layoutName={layoutName}
        onChangeAll={(e) => onChangeAll(e as CustomerData)}
        onKeyPress={(button) => handleShift(button)}
      />
  
      <br />
    </div>
  )
}