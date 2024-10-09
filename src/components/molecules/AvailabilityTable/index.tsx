import { useEffect, useState } from "react"
import { Availabilities, Cities, getCities, getNextAvailabilities, getProducts, Product, Products } from "../../../api";
import AvailabilityEdit from "../AvailabilityEdit";
import dayjs from "dayjs";

export default function AvailabilityTable() {
  const [availabilities, setAvailabilities] = useState<Availabilities>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cities, setCities] = useState<Cities>([]);
  const [reloadTable, setReloadTable] = useState(0);

  useEffect(() => {
    getProducts().then((productsResp: any) => {
      setProducts(productsResp as Products);
    }).catch((err) => {
      console.log("Err", err)
    });

    getCities().then((citiesResp) => {
      setCities(citiesResp as Cities);
    }).catch((err) => {
      console.log("Err", err)
    });

    getNextAvailabilities().then((res) => {
      setAvailabilities(res as Availabilities);
    }).catch((err) => {
      console.log("Err", err)
    });

  }, [reloadTable])

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Produto</th>
            <th>Hoje</th>
            <th>
              <p>{dayjs().locale('pt-br').add(1, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(1, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(2, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(2, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(3, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(3, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(4, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(4, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(5, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(5, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(6, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(6, 'day').format('DD/MM')}</p>
            </th>
            <th>
              <p>{dayjs().locale('pt-br').add(7, 'day').format('ddd')}</p>
              <p>{dayjs().locale('pt-br').add(7, 'day').format('DD/MM')}</p>
            </th>
            <th>Display</th>
          </tr>
        </thead>
        <tbody>
          {products
            .map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={0}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={1}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={2}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={3}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={4}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={5}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={6}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">
                  <AvailabilityEdit
                    product={product}
                    day={7}
                    availabilities={availabilities}
                    setReloadTable={setReloadTable}
                    reloadTable={reloadTable}
                  />
                </td>
                <td className="p-0">Show</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}