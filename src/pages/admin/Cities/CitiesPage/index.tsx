import Table from "../../../../components/organisms/Table";
import { useNavigate } from "react-router-dom";
import { getCities } from "../../../../api/cities/api";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TableThumb } from "../../../../components/organisms/Table/TableThumb";
import { useEffect, useState } from "react";
import { AnyObject } from "../../../../components/organisms/Table/types";
import TablePagination from "../../../../components/organisms/TablePagination";
import TableFilter from "../../../../components/organisms/TableFilter";

export default function CitiesPage() {
  const [data, setData] = useState<Array<AnyObject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({orderBy: {desc: 'timestamp'}, limit: 10});
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/admin/cities/${id}`)
  }

  useEffect(() => {
    getData()
  }, [query]);

  const getData = () => {
    setIsLoading(true);
    getCities(query).then((res: Array<AnyObject>) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }

  const tableHeader = [
    {name: "Imagem", value: "imgUrl", component: <TableThumb />},
    {name: "Nome", value: "name"},
    {name: "Região", value: "regionName"},
    {name: "Ativo",value: 'active', component: <TableBeacon />},
    {
      name: "Ações",
      value: 'id',
      component: (<>
        <TableButton label="Editar" onClickEvent={(id) => handleClick(id)} />
      </>)
    },
  ]

  return (
    <div className="">
      <p>Cidades</p>
      <TableFilter
        filters={[]}
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
        <button className="btn btn-primary" onClick={() => navigate('/admin/cities/add')}>Nova cidade</button>
      </div>
    </div>
  )
}