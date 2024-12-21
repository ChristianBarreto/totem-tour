import Table from "../../../../components/organisms/Table";
import { getProducts } from "../../../../api/products/api";
import { useNavigate } from "react-router-dom";
import { TableShortText } from "../../../../components/organisms/Table/TableShortText";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import FilterOptions from "../../../../components/organisms/TableFilter/FilterOptions";
import TableFilter from "../../../../components/organisms/TableFilter";
import { useState } from "react";

export default function ProductsPage() {
  const [query, setQuery] = useState({orderBy: {asc: 'cityId'}})
  const navigate = useNavigate()
  const handleClick = (productId: string) => {
    navigate(`/admin/products/${productId}`)
  }

  const tableHeader = [
    {name: "Nome", value: "name"},
    {name: "Local", value: "address", component: (<TableShortText />)},
    {name: "Localiz.", value: "location", component: (<TableShortText />)},
    {name: "Horário", value: "time", component: (<TableShortText size={5}/>)},
    {name: "Duração", value: "duration"},
    {name: "Nome op.", value: "operatorName", component: (<TableShortText size={23} />)},
    {name: "Tel. op.", value: "operatorPhone"},
    {name: "Show", value: "showDisplay", component: (<TableBeacon />)},
    {name: "Disp.", value: "isAvailable", component: (<TableBeacon />)},
    {name: "Opções", value: 'id', component: (<TableButton label="Editar" onClickEvent={(id) => handleClick(id)} />)}
  ]

  const filters = [
    {
      field: 'isTest',
      type: 'boo',
      component: 
        <FilterOptions
          name="Produto de teste"
          options={[{name: 'É teste', value: true}, {name: 'Não é teste', value: false}]}
          setQuery={setQuery}
          query={query}
          field="isTest"
          type="boo"
        />
    }
  ]

  console.log("Q", query)

  return (
    <div>
      <p>Produtos</p>
      <TableFilter filters={filters}/>
      <Table
        tableName="Produtos"
        tableHeader={tableHeader}
        tableFetch={() => getProducts(query)}
        sort="cityId"
      />

      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/products/add')}>Novo produto</button>
      </div>
    </div>
  )
}