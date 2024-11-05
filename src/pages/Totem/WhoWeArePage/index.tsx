import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCounter } from "../../../context/CounterContext";
import IconRowBack from "../../../components/atoms/IconRowBack";
import { websiteUrl } from "../../../api/api";
import IconPartner from "../../../components/atoms/IconPartner";
import ChangeTotemModal from "../../../components/molecules/ChangeTotemModal";
import { logEvents } from "../../../firebase";
import { useTotem } from "../../../context/TotemContext";

export default function WhoWeArePage() {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
    // @ts-expect-error: TODO: fix type of context
  const [totem,] = useTotem();
  const [showFooter, setShowFooter] = useState(false);
  const [openTotemModal, setOpenTotemModal] = useState(false);
  const appRef = useRef()as React.MutableRefObject<HTMLDivElement>;
  const navigate = useNavigate();

  const videoUrl = "https://firebasestorage.googleapis.com/v0/b/totem-tour.appspot.com/o/video-totem-tour-1.mp4?alt=media&token=d29092f7-3a55-4735-8275-557db9eb7952"

  useEffect(() => {
    logEvents(`who_we_are`)
    setShowFooter(false);
  }, [])

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  }

  return (
    <div className="flex justify-center" ref={appRef}>
      {openTotemModal && <ChangeTotemModal open={openTotemModal} setOpen={setOpenTotemModal}/>}
      <div className="flex flex-col w-full">

        <div className="bg-primary p-4 flex justify-between">
          <a href={`${websiteUrl}/totem/store`} className="flex">
            <img src={require("./logo.png")} alt="" width={80}/>
            <p className="text-4xl mt-4 ml-2 text-white">Totem Tour</p>
          </a>
          <button className="btn mt-3" onClick={() => navigate(-1)}>
            <IconRowBack size={6} />
            voltar
          </button>
        </div>

        <div className="m-20">

          <div className="border-b pb-2 mb-12">
            <p className="text-2xl pb-2">Como usar este totem?</p>
            <div className="flex">
              <video width="500" height="750" controls className="rounded">
                <source src={videoUrl} type="video/mp4"/>
              </video>
              <div className="p-4">
                <p><span className="font-bold">1-</span> Para fazer a reseva, é só escolher o passeio, selecionar a data, a quantidade de pessoas e adicionar ao carrinho.</p>
                <p><span className="font-bold">2-</span> Adicione quantos passeios você quiser.</p>
                <p><span className="font-bold">3-</span> Click em reservar, informe seus dados e escolha a forma de pagamento.</p>
                <br />
                <p>Você receberá uma mensagem no WhatsApp e/ou e-mail com a confirmação da sua reserva.</p>
                <br />
                <p>(Aceitamos pagamentos PIX, cartão de débido e crédito)</p>
                <br /> 
                <p className="font-bold">Ainda tem dúvidas?</p>
                <p>Entre em contato com nosso telefone ou WhatsApp:</p>
                <p className="font-bold">22 99102-7926</p>
                <img src={require('./wpp-qr-code.jpg')} alt="wpp-qr-code" width={120} />
              </div>
            </div>
          </div>
          <div className="border-b pb-2 mb-12">
            <p className="text-2xl pb-2">Quem somos nós?</p>

            <p>Sua reserva está segura com a Totem Tour.</p>
            <p>A Totem Tour é um produto tecnológico da empresa:</p>
            <p className="font-bold">Digital Storm Serviços de tecnologia LTDA</p>
            <p><span className="font-bold">CNPJ:</span> 46.547.192/0001-51</p>
          </div>

        </div>

        {showFooter ? (
          <div className="bg-secondary p-8 flex justify-between" onClick={toggleFooter}>
            <button className="btn mt-2 ml-auto" onClick={() => setOpenTotemModal(true)}>
              <IconPartner size={6} />
              {totem?.nickName}
            </button>
          </div>
        ) :(

          <div className="bg-secondary block p-4" style={{height: '100px'}} onClick={toggleFooter}>
            <p className="font-bold text-white">Digital Storm Serviços de tecnologia LTDA</p>
            <p className="text-white"><span className="font-bold">CNPJ:</span> 46.547.192/0001-51</p>
          </div>
        )}

      </div>
    </div>

  )
}