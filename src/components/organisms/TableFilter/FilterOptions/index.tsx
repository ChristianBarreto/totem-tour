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
  defaultValue,
}: {
  name: string,
  options: FilterOptionsParams[],
  setQuery: (v: any) => void,
  query: any,
  field: string
  type: string,
  defaultValue?: string
}) {
  const handleOptionChange = (value: string | number) => {
    if (value !== "all") {
      setQuery({...query, [field]: {eq: {[type]: value}}})
    } else {
      const newQuery = {...query};
      delete newQuery[field];
      setQuery(newQuery)
    }
  }

  return (
    <label className="form-control pb-4">
      <span className="label-text">{name}</span>
        <select
          className="select select-bordered select-sm max-w-sm"
          onChange={(e) => handleOptionChange(e.target.value)}
          // value={product.regionId}
          defaultValue={defaultValue}
        >
          <option value="all">Todos</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
      </select>
    </label>
  )
}