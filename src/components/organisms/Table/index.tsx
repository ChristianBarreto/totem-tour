import { ReactNode, useEffect, useState } from "react"

type Filter = [string, string]

type Sort = string

type TableHeaderItem = {
  name: string,
  value: string,
  component?: ReactNode
}

interface MyObject {
  [key: string]: never  
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
  tableFetch: () => Promise<Array<any>>, // eslint-disable-line
  reloadTable?: number,
  filter?: Filter,
  sort?: Sort,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Array<MyObject>>([]);

  useEffect(() => {
    tableFetch().then((res: Array<MyObject>) => {
      setItems(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }, [reloadTable])

  const reload = () => {
    setIsLoading(true);
    tableFetch().then((res: Array<MyObject>) => {
      setItems(res);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
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
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <p>Loading</p>
            ): (
              <>
                {items
                ?.filter((item: Record<string, unknown>) => {
                  if (filter) {
                    if (eval(item[(filter[1])] + filter[0] + true)) {
                      return item
                    }
                  } else {
                    return item
                  }
                })
                .sort((a: Record<string, never>, b: Record<string, never>) => {
                  if (sort) {
                    if (a[sort] < b[sort]) {
                      return -1
                    } else if (a[sort] > b[sort]){
                      return 1
                    } else {
                      return 0
                    }
                  } else {
                    return 0
                  }
                })
                .map((item: Record<string, unknown>, indexA) => (
                  <tr className="hover" key={`row-${item.name}`}>
                    {tableHeader.map((header) => (
                      <td key={`${header.value}-${indexA}`}>
                        {!header.component ? (
                          <>
                            {item[header.value] === true && (<p>TRUE</p>)}
                            {item[header.value] === false && (<p>FALSE</p>)}
                            <span id={item[header.value] as string}>{item[header.value] as React.ReactElement}</span>
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
              </>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}