import { ReactNode, useEffect, useState } from "react"

type Filter = [string, string]

type Sort = string

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
  filter,
  sort
}: {
  tableName: string,
  tableHeader: TableHeaderItem[],
  tableFetch: (body?: any) => Promise<any>,
  reloadTable?: number,
  filter?: Filter,
  sort?: Sort,
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
    <div className="border p-2 mb-4">
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
            {items
              .filter((item) => {
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
                  if (a[sort] < b[sort]) {
                    return -1
                  } else if (a[sort] < b[sort]){
                    return 1
                  } else {
                    return 0
                  }
                } else {
                  return 0
                }
              })
              .map((item, indexA) => (
              <tr key={`row-${item.name}`}>
                {tableHeader.map((header, indexB) => (
                  <td key={`${header.value}-${indexA}`}>
                    
                    {!header.component ? (
                      <>
                        {item[header.value] === true && (<p>TRUE</p>)}
                        {item[header.value] === false && (<p>FALSE</p>)}
                        <span id={item[header.value]}>{item[header.value]}</span>
                      </>

                    ): (
                      <span key={`comp-${indexA}`}>
                        <span className={item[header.value]?.toString()}>
                          {header.component}
                        </span>
                      </span>
                    )}
                    
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