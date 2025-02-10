import Table from "../../../../components/organisms/Table";
import { getProducts } from "../../../../api/products/api";
import { useNavigate } from "react-router-dom";
import { TableShortText } from "../../../../components/organisms/Table/TableShortText";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import FilterOptions from "../../../../components/organisms/TableFilter/FilterOptions";
import TableFilter from "../../../../components/organisms/TableFilter";
import { useEffect, useState } from "react";
import { AnyObject } from "../../../../components/organisms/Table/types";
import TablePagination from "../../../../components/organisms/TablePagination";

export default function ProductsPage() {
  const [data, setData] = useState<Array<AnyObject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [query, setQuery] = useState({orderBy: {asc: 'cityId'}, isTest: {eq: {boo: "false"}}, showDisplay: {eq: {boo: "true"}}, limit: "10"});
  const navigate = useNavigate();
  const handleClick = (productId: string) => {
    navigate(`/admin/products/${productId}`);
  };

  useEffect(() => {
    getData()
  }, [query]);

  const getData = () => {
    setIsLoading(true);
    getProducts(query).then((res: Array<AnyObject>) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
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
    <FilterOptions
      key='0'
      name="É teste"
      options={[
        {name: 'É teste', value: true},
        {name: 'Não é teste', value: false}
      ]}
      setQuery={setQuery}
      query={query}
      field="isTest"
      type="boo"
      defaultValue="false"
    />,
    <FilterOptions
      key='1'
      name="Show display"
      options={[
        {name: 'Mostrar', value: true},
        {name: 'Não mostrar', value: false}
      ]}
      setQuery={setQuery}
      query={query}
      field="showDisplay"
      type="boo"
      defaultValue="true"
    />,
    <FilterOptions
      key='2'
      name="Cidade"
      options={[
        {name: 'Arraial do Cabo', value: 'OiCHcy7zKcp2uU3zlMPU'},
        {name: 'Cabo Frio', value: 'XVlT0cMHLGoCcyVkoHTO'},
        {name: 'Búzios', value: 'VO33TX8ZiYJLGszVRb7I'},
        {name: 'Vitória', value: 'IkGcVCdzOfEiUZ6nWYfZ'}
      ]}
      setQuery={setQuery}
      query={query}
      field="cityId"
      type="str"
    />
  ]

  return (
    <div>
      <p>Produtos</p>
      <TableFilter
        filters={filters}
        getData={getData}
      />
      <Table
        tableHeader={tableHeader}
        data={data}
        isLoading={isLoading}
      />
      <TablePagination
        setQuery={setQuery}
        query={query}
        count={1}
      />

      <div className="p-4 flex justify-end">
        <button className="btn btn-primary" onClick={() => navigate('/admin/products/add')}>Novo produto</button>
      </div>
    </div>
  )
}