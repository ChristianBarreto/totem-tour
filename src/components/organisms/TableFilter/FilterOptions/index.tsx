type FilterOptionsParams = {
  name: string,
  value: any,
}

export default function FilterOptions({
  name,
  options,
  setQuery,
  query,
  field,
  type,
}: {
  name: string,
  options: FilterOptionsParams[],
  setQuery: (v: any) => void,
  query: any,
  field: string
  type: string,
}) {
  return (
    <label className="form-control pb-4">
      <span className="label-text">{name}</span>
      <select
        className="select select-bordered"
        onChange={(e) => setQuery({...query, [field]: {[type]: e.target.value}})}
        // value={product.regionId}
        defaultValue=""
      >
        <option value="" disabled>Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </label>
  )
}