import { useEffect, useRef, useState } from "react"
import { getTotemTour, setTotemTour } from "../../../api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { objectChanged } from "../../../helpers";

const iniCompany = {
  privacyTerms: '',
  serviceAndCancelationTerms: '',
  cnpj: '',
  companyName: '',
  phone: '',
  email: '',
  address: '',
  lastUpdated: '',
  timestamp: '',
}

export default function EditCompanyPage() {
  const [company, setCompany] = useState(iniCompany);
  const companyRef = useRef(iniCompany);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    getTotemTour().then((res) => {
      if (res && !ignore) {
        setCompany(res)
        companyRef.current = res;
      }
    })
    return (() => {
      ignore = true;
    })
  }, []);

  const handleCancel = () => {
    setCompany(companyRef.current)
  }
 
  const handleSave = () => {
    console.log('1', company)
    setTotemTour(company).then((res) => {
      if (res) {
        setCompany(res);
        companyRef.current = company;
      }
    })
  }

  const isCancelDisabled = !objectChanged(company, companyRef.current)
  const isSaveDisabled = !objectChanged(company, companyRef.current);
  
  return (
    <div>
      <p>Informações da Totem Tour</p>

      <div className="flex flex-col pt-6">

        <div className="w-full">
          <p className="font-bold pb-2">Informações:</p>
        </div>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">Nome da empresa</span>
          </div>
          <input
            type="text"
            className="textarea textarea-bordered h-14"
            placeholder="Nome da empresa"
            value={company.companyName}
            onChange={(e) => setCompany({...company, companyName: e.target.value})}
          ></input>
        </label>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">CNPJ</span>
          </div>
          <input
            type="text"
            className="textarea textarea-bordered h-14"
            placeholder="Bio"
            value={company.cnpj}
            onChange={(e) => setCompany({...company, cnpj: e.target.value})}
          ></input>
        </label>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">Telefone</span>
          </div>
          <input
            type="text"
            className="textarea textarea-bordered h-14"
            placeholder="Bio"
            value={company.phone}
            onChange={(e) => setCompany({...company, phone: e.target.value})}
          ></input>
        </label>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">E-mail:</span>
          </div>
          <input
            type="text"
            className="textarea textarea-bordered h-14"
            placeholder="Bio"
            value={company.email}
            onChange={(e) => setCompany({...company, email: e.target.value})}
          ></input>
        </label>

        <div className="w-full">
          <p className="font-bold pb-2">Termos:</p>
        </div>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">Termos de serviço e cancelament:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-80"
            placeholder="Detalhes"
            value={company.serviceAndCancelationTerms}
            onChange={(e) => setCompany({...company, serviceAndCancelationTerms: e.target.value})}
          ></textarea>
        </label>

        <label className="form-control pb-4">
          <div className="label">
            <span className="label-text">Termos de privacidade:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-80"
            placeholder="Detalhes"
            value={company.privacyTerms}
            onChange={(e) => setCompany({...company, privacyTerms: e.target.value})}
          ></textarea>
        </label>

        {/* <p>Created on: {dayjs(product.timestamp).format('DD/MM/YYYY - HH:mm:ss')}</p> */}
        <p>Last updated: {dayjs(company.lastUpdated).format('DD/MM/YYYY - HH:mm:ss')}</p>
      </div>

      <div className="flex justify-end">
        <button
          className="btn"
          disabled={isCancelDisabled}
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          disabled={isSaveDisabled}
          className="btn btn-primary ml-4"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}