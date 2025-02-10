
export default function TableFilter({
  filters,
  getData,
}: {
  filters?: React.ReactNode[],
  getData: () => void
}) {
  return (
    <div className="border p-2 flex justify-between">
      <div className="flex">
        <div className="m-1 flex gap-2">
          {filters?.map((component) => (
            component
          ))}
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm btn-secondary"
          onClick={getData}
        >
          Atualizar
        </button>
      </div>
    </div>
  )
}