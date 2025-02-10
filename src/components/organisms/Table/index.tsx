import { AnyObject, TableHeaderItem } from "./types";
import { TableContent } from "./TableContent";

export default function Table({
  tableHeader,
  data,
  isLoading
}: {
  tableHeader: TableHeaderItem[],
  data: Array<AnyObject>,
  isLoading: boolean
}) {
  return (
    <div className="border border-t-0 border-b-0 p-2">
      <div className="overflow-x-auto border">
        <table className="table table-xs">
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td><p>Loading...</p></td></tr>
            ): (
              <>
                {data.map((item: Record<string, string>, indexA) => (
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