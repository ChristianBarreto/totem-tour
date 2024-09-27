import { FormEvent, SyntheticEvent, useState } from "react"
import IconEmail from "../../atoms/IconEmail"
import IconPhone from "../../atoms/IconPhone"
import IconUser from "../../atoms/IconUser"
import { isValidEmail, isValidName, isValidPhone, PhoneMask } from "../../../helpers"
import IconTrash from "../../atoms/IconTrash"

type UserData = {
  name: string,
  email: string,
  phone: string,
}

export default function UserInfoForm({
  userData,
  setUserData,
}: {
  userData: UserData
  setUserData: (data: UserData) => void,
}) {

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '', 
  })

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'phone'){
      setUserData({...userData, [name]: PhoneMask(value)})
    } else {
      setUserData({...userData, [name]: value})
    }


    if (name === 'name' && !isValidName(value)) {
      setFormErrors({
        ...formErrors,
        name: 'Escreva seu nome completo',
      });
    } else if (name === 'email' && !isValidEmail(value)) {
      setFormErrors({
        ...formErrors,
        email: 'Favor informar um email válido.',
      });
    } else if (name === 'phone' && !isValidPhone(PhoneMask(value))) {
      setFormErrors({
        ...formErrors,
        phone: 'Favor informar um telefone válido.',
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: '', // Reset error message
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
    >
      
      <div className="join w-full">
        <div className={`input input-bordered flex items-center gap-2 join-item w-full ${formErrors.name && 'input-error'}`}>
          <IconUser />
          <input
            type="text"
            className="grow"
            placeholder="Nome completo"
            required
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />  
        </div>
        <button className="btn btn-outline join-item text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => setUserData({...userData, name: ""})}>
          <IconTrash />
        </button>
      </div>
      {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

      <div className="join w-full">
        <div className={`input input-bordered flex items-center gap-2 join-item w-full ${formErrors.email && 'input-error'}`}>
          <IconUser />
          <input
            type="text"
            className="grow"
            placeholder="E-mail"
            required
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />  
        </div>
        <button className="btn btn-outline join-item text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => setUserData({...userData, email: ""})}>
          <IconTrash />
        </button>
      </div>
      {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

      <div className="join w-full">
        <div className={`input input-bordered flex items-center gap-2 join-item w-full ${formErrors.phone && 'input-error'}`}>
          <IconUser />
          <input
            type="text"
            className="grow"
            placeholder="Telefone com DDD"
            required
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />  
        </div>
        <button className="btn btn-outline join-item text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => setUserData({...userData, phone: ""})}>
          <IconTrash />
        </button>
      </div>
      {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}

    </form>
  )
}