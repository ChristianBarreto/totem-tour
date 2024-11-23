import { useEffect, useState } from "react"
import { websiteUrl } from "../../../api/api";
import { Availabilities } from "../../../api/availabilities/types";
import { getNextAvailabilities } from "../../../api/availabilities/api";
import { Cities } from "../../../api/cities/types";
import { getCities } from "../../../api/cities/api";
import { getProducts } from "../../../api/products/api";
import { Product, Products } from "../../../api/products/types";
import AvailabilityEdit from "../AvailabilityEdit";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

type Filter = [string, keyof Product]
type Sort = string

export default function AvailabilityTable({
  filter,
  sort,
}: {
  filter?: Filter,
  sort?: Sort,
}) {
  const [availabilities, setAvailabilities] = useState<Availabilities>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [, setCities] = useState<Cities>([]);
  const [reloadTable, setReloadTable] = useState(0);

  useEffect(() => {
    getProducts().then((productsResp: Products) => {
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
    <div className="overflow-x-auto mb-4">
      <table className="table">
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
            <th>Dispon.</th>
          </tr>
        </thead>
        <tbody>
          {products?.filter((item) => {
              if (filter) {
                if (eval(item[filter[1]] + filter[0] + true)) {
                  return item
                }
              } else {
                return item
              }
            })
            .sort((a, b) => {
              if (sort) {
                if (a.cityId < b.cityId) {
                  return -1
                } else {
                  return 0
                }
              } else {
                return 0
              }
            })
            .map((product) => (
              <tr className="hover" key={product.id}>
                <td><Link to={`${websiteUrl}/admin/products/${product.id}`}>{product.name}</Link></td>
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
                <td className="p-0">{product.showDisplay ? (
                    <div className="flex justify-center">
                      <div className="text-center badge badge-primary badge-md"></div>
                    </div>  
                  ) : (
                    <div className="flex justify-center">
                      <p className="text-center badge bg-red-500 badge-md"></p>
                    </div>
                  )}
                </td>
                <td className="p-0">{product.isAvailable ? (
                    <div className="flex justify-center">
                      <div className="text-center badge badge-primary badge-md"></div>
                    </div>  
                  ) : (
                    <div className="flex justify-center">
                      <p className="text-center badge bg-red-500 badge-md"></p>
                    </div>
                  )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}