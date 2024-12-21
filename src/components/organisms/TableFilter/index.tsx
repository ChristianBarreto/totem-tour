type TableFilter = {
  field: string,
  component: React.ReactNode
}

export default function TableFilter({
  filters,
}: {
  filters?: TableFilter[]
}) {
  return (
    <div className="m-1">
      <p>Filters:</p>
      {filters?.map((filter) => (
        filter.component
      ))}
    </div>
  )
}