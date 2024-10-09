import { useState } from "react";
import CheckoutSequence from "../../../components/molecules/CheckoutSequence";
import IconArrowRight from "../../../components/atoms/IconArrawRight";
import IconRowBack from "../../../components/atoms/IconRowBack";
import UserInfoForm from "../../../components/molecules/UserInfoForm";
import { useNavigate } from "react-router-dom";
import { checkoutFieldValidation } from "../../../helpers";
import UserTermsForm from "../../../components/molecules/UserTermsForm";
import UserPaymentForm from "../../../components/molecules/UserPaymentForm";
import { CustomerData, websiteUrl } from "../../../api";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [sequence, setSequence] = useState([
    {id: 1, name: "Seus dados", active: false},
    {id: 2, name: "Avisos", active: false},
    {id: 3, name: "Pagamento", active: false},
  ])

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
  });

  const [count, setCount] = useState(1);

  const [terms, setTerms] = useState(false);

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
        !!checkoutFieldValidation('name', customerData.name)
          && !!checkoutFieldValidation('email', customerData.email)
          && !!checkoutFieldValidation('phone', customerData.phone)
      ){
        return false;
      }
    }else if (count === 2) {
      if (terms){
        return false;
      }
    }
    return true;
  }

  const nextDisabled = handleNextDisabled();
  
  const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);

  return (
    <div className="flex justify-center">
      <div className="p-10 flex flex-col w-full">
        <CheckoutSequence sequence={sequence} />
        
        <div className="grow pt-28">
          {count === 1 && (<UserInfoForm customerData={customerData} setCustomerData={setCustomerData} />)}
          {count === 2 && (<UserTermsForm terms={terms} setTerms={setTerms} />)}
          {count === 3 && (<UserPaymentForm customerData={customerData} />)}
        </div>

        <div className="flex justify-between">

          {(count !== 3) ? (
            <>
              <button
                className="btn btn-lg bg-neutral-400"
                style={{ color: 'white'}}
                onClick={() => navigate('/totem/store')}
              >
                <IconRowBack />
                <p className="text-3xl">Voltar à compra</p>
              </button>

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
            </>
          ): (
            <button
              className="btn btn-lg bg-neutral-400"
              style={{ color: 'white'}}
              onClick={() => redirectToInitial()}
            >
              <IconRowBack />
              <p className="text-3xl">Reiniciar compra</p>
            </button>
          )}
        </div>

      </div>
    </div>

  )
}