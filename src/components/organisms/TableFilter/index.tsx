
export default function TableFilter({
  filters,
}: {
  filters?: React.ReactNode[]
}) {
  return (
    <div className="border p-2">
      <p>Filters:</p>
      <div className="m-1 flex gap-2">
        {filters?.map((component) => (
          component
        ))}
      </div>
    </div>

  )
}