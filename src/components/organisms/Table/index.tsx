import { useEffect, useState } from "react"

type TableHeaderItem = {
  name: string,
}

type TableBodyItem = {}

export default function Table({
  tableHeader,
  tableFetch,
}: {
  tableHeader: TableHeaderItem[],
  tableFetch: (body?: any) => Promise<any>,
}) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    tableFetch().then((res: any) => {
      setItems(res);
    }).catch((err) => {
      console.log("Table error", err)
    });
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th>{header.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
          <tr>
            <th>{item.foo}</th>
            <td>Produto</td>
            <td>Qtd</td>
            <td>Cidade</td>
            <td>Pagamento</td>
            <td>Ok</td>
            <td>Ok</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}