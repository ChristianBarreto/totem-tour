
export default function TableFilter({
  filters,
}: {
  filters?: React.ReactNode[]
}) {
  return (
    <div className="m-1">
      <p>Filters:</p>
      {filters?.map((component) => (
        component
      ))}
    </div>
  )
}