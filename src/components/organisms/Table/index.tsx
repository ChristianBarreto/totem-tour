import { useEffect, useState } from "react"
import { AnyObject, Filter, Sort, TableHeaderItem } from "./types";
import { TableContent } from "./TableContent";

export default function Table({
  tableName,
  tableHeader,
  tableFetch,
  reloadTable = 0,
}: {
  tableName: string,
  tableHeader: TableHeaderItem[],
  tableFetch: (params?: any) => Promise<Array<any>>, // eslint-disable-line
  reloadTable?: number,
  filter?: Filter,
  sort?: Sort,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Array<AnyObject>>([]);
  const [order, setOrder] = useState<any>({orderBy: {desc: "timestamp"}});
  

  useEffect(() => {
    tableFetch({params: {...order}}).then((res: Array<AnyObject>) => {
      setItems(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }, [reloadTable]);

  const reload = () => {
    setIsLoading(true);
    tableFetch().then((res: Array<AnyObject>) => {
      setItems(res);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log("Table error", err)
    });
  }

  const handleOrder = (name: string) => {
    setOrder({orderBy: {asc: name}});
    reload();
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
                <th key={header.name} onClick={() => handleOrder(header.value)}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td><p>Loading...</p></td></tr>
            ): (
              <>
                {items.map((item: Record<string, string>, indexA) => (
                  <tr className="hover" key={`row-${indexA}`}>
                      {tableHeader.map((header, indexB) => (
                        <TableContent
                          key={`item-${indexA}-${indexB}`}
                          indexA={indexA}
                          header={header}
                          item={item}
                        />
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