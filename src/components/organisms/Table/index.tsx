import { ReactNode, useEffect, useState } from "react"

type TableHeaderItem = {
  name: string,
  value: string,
  component?: ReactNode
}

export default function Table({
  tableName,
  tableHeader,
  tableFetch,
  reloadTable = 0,
}: {
  tableName: string,
  tableHeader: TableHeaderItem[],
  tableFetch: (body?: any) => Promise<any>,
  reloadTable?: number,
}) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    tableFetch().then((res: any) => {
      setItems(res);
    }).catch((err) => {
      console.log("Table error", err)
    });
  }, [reloadTable])

  const reload = () => {
    tableFetch().then((res: any) => {
      setItems(res);
    }).catch((err) => {
      console.log("Table error", err)
    });
  }

  return (
    <div className="border p-2">
      <div className="flex justify-between p-4">
        <p className="text-md pb-2">{tableName}</p>
        <button className="btn btn-sm" onClick={reload}>Atualizar</button>
      </div>
      

      <div className="overflow-x-auto border">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, indexA) => (
              <tr key={`row-${item.name}`}>
                {tableHeader.map((header, indexB) => (
                  <td key={`${header.value}-${indexA}`}>
                    <span>{!header.component && item[header.value]}</span>
                    <span key={`comp-${indexA}`}><span id={item[header.value]}>{header.component && header.component}</span></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}