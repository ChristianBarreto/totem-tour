export default function FilterOptions({
  setQuery,
  query,
  defaultPage = 10,
}: {
  setQuery: (v: any) => void,
  query: any,
  defaultPage?: number
}) {
  const handleChange = (value: string | number) => {
    setQuery({...query, limit: value})
  }

  return (
    <label className="form-control pb-4 w-fit" data-testid="table-pagination">
      <span className="label-text">Qtd. linhas:</span>
      <select
        className="select select-bordered select-sm "
        onChange={(e) => handleChange(e.target.value)}
        // value={product.regionId}
        defaultValue={defaultPage}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </label>
  )
}