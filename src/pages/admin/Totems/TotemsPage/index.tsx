import Table from "../../../../components/organisms/Table";
import { getTotems } from "../../../../api/totems/api";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableTotemPing } from "../../../../components/organisms/Table/TableTotemPing";
import { TableBooleanToText } from "../../../../components/organisms/Table/TableBooleanToText";
import { AnyObject } from "../../../../components/organisms/Table/types";
import { useEffect, useState } from "react";
import TableFilter from "../../../../components/organisms/TableFilter";
import TablePagination from "../../../../components/organisms/TablePagination";

export default function TotemsPage() {
  const [data, setData] = useState<Array<AnyObject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({orderBy: {asc: 'nickName'}, limit: 10});
  const navigate = useNavigate();
  
  const handleClick = (id: string) => {
    navigate(`/admin/totems/${id}`)
  }

  useEffect(() => {
    getData()
  }, [query]);

  const getData = () => {
    setIsLoading(true);
    getTotems(query).then((res: Array<AnyObject>) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }

  const tableHeader = [
    {name: "Totem", value: "nickName"},
    {name: "Estabelecimento", value: "locationDescription"},
    {name: "Responsável", value: "responsiblePerson"},
    {name: "Região", value: "regionName"},
    {name: "Cidade", value: "cityName"},
    {
      name: "Ping",
      value: 'lastPing',
      component: <TableTotemPing />
    },
    {
      name: "Mostrar testes",
      value: 'showTestProduct',
      component: (<>
        <TableBooleanToText textTrue="MOSTRAR!" textFalse="Não mostrar"/>
      </>)
    },
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
      <p>Totems</p>
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
        <button className="btn btn-primary" onClick={() => navigate('/admin/totems/add')}>Novo totem</button>
      </div>
    </div>
  )
}