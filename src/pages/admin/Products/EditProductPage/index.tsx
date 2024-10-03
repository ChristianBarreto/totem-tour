import { useEffect, useState } from "react"
import { getProductById, Product } from "../../../../api";
import { useParams } from "react-router-dom";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    cityId: '',
    companyComm: 0,
    description: '',
    details: '',
    id: '',
    imgUrl: '',
    location: '',
    maxPaxDay: 0,
    maxPerRound: 0,
    minPriceDescription: '',
    minTotalPrice: 0,
    name: '',
    netPrice: 0,
    partnerComm: 0,
    pricePerPerson: 0,
    priority: 0,
    time: ''
  });

  useEffect(() => {
    let ignore = false;

    getProductById(id).then((res) => {
      if (res && !ignore) {
        console.log(res)
        setProduct(res)
      }
    })

    return (() => {
      ignore = true;
    })
  }, []);
  
  return (
    <div>
      <p>Edit product: {product.name}</p>

      <div className="flex flex-col pt-6">

        <div className="w-full">
          <p className="font-bold pb-2">Características:</p>

          <label className="form-control label-text pb-4">Nome do produto:
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
            />
          </label>

          <label className="form-control pb-4">
            <div className="label">
              <span className="label-text">Descrição</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-14"
              placeholder="Bio"
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
            ></textarea>
          </label>

          <label className="form-control pb-4">
            <div className="label">
              <span className="label-text">Detalhes</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-80"
              placeholder="Bio"
              value={product.details}
              onChange={(e) => setProduct({...product, details: e.target.value})}
            ></textarea>
          </label>

          <label className="form-control label-text pb-4">Local:
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={product.location}
              onChange={(e) => setProduct({...product, location: e.target.value})} //change to select based on cities table
            />
          </label>

          <label className="form-control label-text pb-4">Horário:
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={product.time}
              onChange={(e) => setProduct({...product, time: e.target.value})}
            />
          </label>

        </div>

        <div className="form-control w-full">
          <p className="font-bold pb-2">Passageiros:</p>
        </div>

      </div>

    </div>
  )
}