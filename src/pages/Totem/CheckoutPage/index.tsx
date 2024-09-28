import { useState } from "react";
import CheckoutSequence from "../../../components/molecules/CheckoutSequence";
import IconArrowRight from "../../../components/atoms/IconArrawRight";
import IconRowBack from "../../../components/atoms/IconRowBack";
import UserInfoForm from "../../../components/molecules/UserInfoForm";
import { useNavigate } from "react-router-dom";
import { checkoutFieldValidation } from "../../../helpers";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [sequence, setSequence] = useState([
    {id: 1, name: "Seus dados", active: false},
    {id: 2, name: "Avisos", active: false},
    {id: 3, name: "Pagamento", active: false},
  ])

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [count, setCount] = useState(1);

  const handleNext = () => {
    setCount(count+1);
    setSequence(
      sequence.map((item) => {
        if (item.id === count) {
          return {...item, active: true}
        }
        return item;
      })
    )
  }

  const handleNextDisabled = () => {
    if (count === 1) {
      if (
        !!checkoutFieldValidation('name', userData.name)
          && !!checkoutFieldValidation('email', userData.email)
          && !!checkoutFieldValidation('phone', userData.phone)
        ){
        return false;
      }
    }
    return true;
  }

  const nextDisabled = handleNextDisabled();

  return (
    <div className="flex justify-center">
      <div className="p-10 flex flex-col w-full">
        <CheckoutSequence sequence={sequence} />
        
        <div className="grow pt-28">
          {count === 1 && (<UserInfoForm userData={userData} setUserData={setUserData} />)}
          {count === 2 && (<p>Info</p>)}
          {count === 3 &&(<p>Pag</p>)}
        </div>

        <div className="flex justify-between">
          <button
            className="btn btn-lg bg-neutral-400"
            style={{ color: 'white'}}
            onClick={() => navigate('/totem/store')}
          >
            <IconRowBack />
            <p className="text-3xl">Voltar à compra</p>
          </button>

          {(count !== 3) && (
            <button
              className="btn btn-lg btn-primary"
              style={{ color: 'white'}}
              onClick={handleNext}
              type='submit'
              disabled={nextDisabled}
            >
              <p className="text-3xl">Próximo</p>
              <IconArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>

  )
}