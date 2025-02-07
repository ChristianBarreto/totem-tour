
export default function TableFilter({
  filters,
}: {
  filters?: React.ReactNode[],
}) {
  return (
    <div className="border p-2 flex">
      <div>
        <p>Filtros:</p>
        <div className="m-1 flex gap-2">
          {filters?.map((component) => (
            component
          ))}
        </div>
      </div>
    </div>
  )
}