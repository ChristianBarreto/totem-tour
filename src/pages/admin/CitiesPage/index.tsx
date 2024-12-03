import Table from "../../../components/organisms/Table";

export default function CitiesPage() {

  const tableHeader = [
    {name: "Data", value: "date"},
    {name: "Produto", value: "productName"},
    {name: "Qtd", value: "qty"},
    {name: "Cidade", value: "location"},
    {name: "Pagamento", value: "paymentCaptured"},
    {name: "Cliente comm", value: "customerComm"},
    {name: "Agência comm", value: "agencyComm"},
  ]

  

  return (
    <div>
      <p>Cidades</p>
      {/* <Table
        tableName="Vendas"
        tableHeader={tableHeader}
        tableFetch={}
      /> */}
    </div>
  )
}