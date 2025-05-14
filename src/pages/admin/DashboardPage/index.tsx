import { useEffect, useState } from "react";
import Table from "../../../components/organisms/Table";
import { AnyObject } from "../../../components/organisms/Table/types";
import { TableDateTime } from "../../../components/organisms/Table/TableDateTime";
import { TablePrice } from "../../../components/organisms/Table/TablePrice";
import { TableBeacon } from "../../../components/organisms/Table/TableBeacon";
import { getAdminPurchases } from "../../../api/purchases/api";
import { TableTotemPing } from "../../../components/organisms/Table/TableTotemPing";
import { TableBooleanToText } from "../../../components/organisms/Table/TableBooleanToText";
import { TableButton } from "../../../components/organisms/Table/TableButton";
import { getTotems } from "../../../api/totems/api";

export default function DashboardPage() {
  const [purchases, setPurchases] = useState<Array<AnyObject>>([]);
  const [isPurchasesLoading, setIsPurchasesLoading] = useState(true);
  const [purchasesQuery,] = useState({orderBy: {desc: 'timestamp'}, limit: 10, payementCaptured: {eq: {boo: 'true'}}});

  const [totens, setTotens] = useState<Array<AnyObject>>([]);
  const [isTotensLoading, setIsTotenLoading] = useState(true);
  const [TotensQuery,] = useState({orderBy: {asc: 'nickName'}, limit: 10});


  const purchaseTableHeader = [
    {name: "Data da compra", value: "timestamp", component: <TableDateTime /> },
    {name: "Valor", value: "paymentValue", component: <TablePrice />},
    {name: "Totem venda", value: "totemNickName"},
    {name: "Pagamento", value: "payementCaptured", component: <TableBeacon />},
  ];

    const totensTableHeader = [
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
      }
    ]

  useEffect(() => {
    getData()
  }, [purchasesQuery]);

  const getData = () => {
    setIsPurchasesLoading(true);
    setIsTotenLoading(true);
    getAdminPurchases(purchasesQuery).then((res: Array<AnyObject>) => {
      setPurchases(res);
      setIsPurchasesLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsPurchasesLoading(false);
    });

    getTotems(TotensQuery).then((res: Array<AnyObject>) => {
      setTotens(res);
      setIsTotenLoading(false);
    }).catch((err) => {
      console.log("Table error", err)
      setIsTotenLoading(false);
    });
    

  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Últimas vendas:</p>
      <Table
        tableHeader={purchaseTableHeader}
        data={purchases}
        isLoading={isPurchasesLoading}
      />
      <p>Totens conectados</p>
      <Table
        tableHeader={totensTableHeader}
        data={totens}
        isLoading={isTotensLoading}
      />
    </div>
  )
}