import { TableHeaderItem } from "../types";

export const TableContent = ({
  header,
  indexA,
  item
}: {
  header: TableHeaderItem,
  indexA: number,
  item: Record<string, string>
}) => {
  let id = '';
  if (item[header.value] !== undefined) {
    id = item[header.value].toString();
  } 

  return (
    <td key={`${header.value}-${indexA}`}>
      {!header.component ? (
        <span id={item[header.value] as string}>{item[header.value]}</span>
      ): (
        <div key={`comp-${indexA}`} className={id} id={id}>
          {header.component}
        </div>
      )}
    </td>
  )
}