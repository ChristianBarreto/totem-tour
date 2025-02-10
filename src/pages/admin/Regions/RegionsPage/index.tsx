import Table from "../../../../components/organisms/Table";
import { useNavigate } from "react-router-dom";
import { getRegions } from "../../../../api/regions/api";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { AnyObject } from "../../../../components/organisms/Table/types";
import { useEffect, useState } from "react";
import TableFilter from "../../../../components/organisms/TableFilter";
import TablePagination from "../../../../components/organisms/TablePagination";

export default function RegionsPage() {
  const [data, setData] = useState<Array<AnyObject>>([]);
  const [query, setQuery] = useState({orderBy: {desc: 'timestamp'}, limit: 10});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/admin/regions/${id}`)
  }

  useEffect(() => {
    getData()
  }, [query]);

  const getData = () => {
    setIsLoading(true);
    getRegions(query).then((res: Array<AnyObject>) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }

  const tableHeader = [
    {name: "Nome", value: "name"},
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
      <p>Regiões</p>
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
        <button className="btn btn-primary" onClick={() => navigate('/admin/regions/add')}>Nova região</button>
      </div>
    </div>
  )
}