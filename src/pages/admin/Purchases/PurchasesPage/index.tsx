import Table from "../../../../components/organisms/Table";
import { getAdminPurchases } from "../../../../api/purchases/api";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../../../../components/organisms/Table/TableButton";
import { TableBeacon } from "../../../../components/organisms/Table/TableBeacon";
import { TablePrice } from "../../../../components/organisms/Table/TablePrice";
import { TableDateTime } from "../../../../components/organisms/Table/TableDateTime";
import { useEffect, useState } from "react";
import FilterOptions from "../../../../components/organisms/TableFilter/FilterOptions";
import TableFilter from "../../../../components/organisms/TableFilter";
import TablePagination from "../../../../components/organisms/TablePagination";
import { AnyObject } from "../../../../components/organisms/Table/types";

const initQuery = {
  orderBy: {timestamp: 'desc'},
  count: "true",
  sum: "paymentValue",
  limit: 10,
  offset: 0,
}

export default function PurchasesPage() {
  const [data, setData] = useState<Array<AnyObject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(initQuery);
  const navigate = useNavigate();
  const handleClick = (purchaseId: string) => {
    navigate(`/admin/purchases/${purchaseId}`)
  }

  useEffect(() => {
    getData()
  }, [query]);

  const getData = () => {
    setIsLoading(true);
    getAdminPurchases(query).then((res: Array<AnyObject>) => {
      setData(res);
      setIsLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsLoading(false);
    });
  }

  const tableHeader = [
    {name: "Data da compra", value: "timestamp", component: <TableDateTime /> },
    {name: "Valor", value: "paymentValue", component: <TablePrice />},
    {name: "Com. parc", value: "totalPartnerComm", component: <TablePrice />},
    {name: "Com. empr", value: "totalCompanyComm", component: <TablePrice />},
    {name: "Totem venda", value: "totemNickName"},
    {name: "Pagamento", value: "payementCaptured", component: <TableBeacon />},
    {name: "Msg cliente", value: "customerMsg", component: <TableBeacon />},
    {name: "Msg ops.", value: "operatorsMsg", component: <TableBeacon />},
    {name: "Msg parceiro", value: "partnerMsg", component: <TableBeacon />},
    {name: "Ops. conf.", value: "operatorsConfirmed", component: <TableBeacon />},
    {name: "Actions", value: "id", component: (<TableButton label="Editar" onClickEvent={(id) => handleClick(id)} />)},
  ];

  const filters = [
    <FilterOptions
      key='0'
      name="Pago"
      options={[
        {name: 'Sim', value: true},
        {name: 'Não', value: false}
      ]}
      setQuery={setQuery}
      query={query}
      field="payementCaptured"
      type="boo"
      defaultValue="all"
    />,
    <FilterOptions
      key='1'
      name="Totem"
      options={[
        {name: '00 - Padrão - Totem', value: 'kYlHD8Z2n0d36AW0MEtS'},
        {name: '01 - Christian - Manual', value: 'JoQXupKkB4DrHZX9h9Xs'},
        {name: '02 - Allan - Totem', value: '1LoQvuu4KzHC1ux7qfOR'},
        {name: '03 - Allan - Manual', value: 'zT9Nsl8CTSy3c1PZcS4g'},
        {name: '04 - Rep. Vict - Totem', value: 'nsdxT95YRo4J7KaWoYek'},
        {name: '05 - Resp. - Totem', value: 'sLZe3sq93SXfK7g6Yjaj'}
      ]}
      setQuery={setQuery}
      query={query}
      field="totemId"
      type="string"
      defaultValue="all"
    />,
  ];
  
  return (
    <div>
      <p>Vendas</p>
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
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/purchases/add')}
        >
          Nova venda
        </button>
      </div>
    </div>
  )
}