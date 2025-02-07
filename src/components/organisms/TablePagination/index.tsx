export default function FilterOptions({
  setQuery,
  query,
  defaultPage = 10,
  count,
}: {
  setQuery: (v: any) => void,
  query: any,
  defaultPage?: number
  count: number,
}) {
  const handleChange = (value: string | number) => {
    setQuery({...query, limit: value})
  }

  return (
    <div className="flex gap-4 border p-2" data-testid="table-pagination">
      <div data-testid="table-pagination-limit">
        <label className="form-control pb-4 w-fit">
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
      </div>
      <div data-testid="table-pagination-pages">
        <label className="form-control pb-4 w-fit">
          <span className="label-text">Páginas:</span>
          <div className="join">
            <button className="btn btn-sm" data-testid="pagination-button">1</button>
          </div>
        </label>
      </div>
    </div>
  )
}