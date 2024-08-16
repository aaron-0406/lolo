import Container from "@/ui/Container"
import TariffActions from "./TariffActions"
import { useQuery } from "react-query"
import { AxiosResponse } from "axios"
import { TariffType } from "@/types/config/tariff.type"
import { getTariff } from "@/services/config/tariff.service"
import { ColumProps } from "@/ui/Table/Table"
import { judicialBinnacleContentiousProcessColumns } from "./TariffContentiousProcessTable/utils/columns"
import { judicialBinnacleRequestOfColumns } from "./TariffByRequestOfTable/utils/columns"
import TariffContentiousProcessTable from "./TariffContentiousProcessTable"
import TariffByRequestOfTable from "./TariffByRequestOfTable"

type TariffTypeResponse = {
  contentiousProcessesHeaders: any[]
  contentiousProcesses: any[]
  requestOfHeaders: TariffType[]
  requestOf: TariffType[]
}
let ContentiousProcessColumns: ColumProps[] = []
let RequestOfColumns: ColumProps[] = []
let contentiousProcesses: TariffType[] = []
let RequestOf: TariffType[] = []

const Tariff = () => {
  const { data: tariff } = useQuery<AxiosResponse<TariffTypeResponse>>(['GET_TARIFF'], async () => await getTariff())
  ContentiousProcessColumns =
  tariff && Array.isArray(tariff?.data?.contentiousProcessesHeaders)
    ? tariff.data.contentiousProcessesHeaders.map((header: any, index) => ({
        id: `binnacle.datatable.interval${1 + index}`,
        title: header.headerTitle,
        width: '10%',
        justifyContent: 'center',
        tooltipMessage: header.description,
      }))
    : []

RequestOfColumns =
  tariff && Array.isArray(tariff?.data?.requestOfHeaders)
    ? tariff.data.requestOfHeaders.map((header: any, index) => ({
        id: `binnacle.datatable.interval${1 + index}`,
        title: header.headerTitle,
        width: '10%',
        justifyContent: 'center',
        tooltipMessage: header.description,
      }))
    : []

  ContentiousProcessColumns = [...judicialBinnacleContentiousProcessColumns, ...ContentiousProcessColumns]
  RequestOfColumns = [...judicialBinnacleRequestOfColumns, ...RequestOfColumns]
  contentiousProcesses = tariff?.data?.contentiousProcesses ?? []
  RequestOf = tariff?.data?.requestOf ?? []  

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <TariffActions />
      <Container width="100%" height="calc(100% - 80px)" padding="0px 20px">
        <TariffContentiousProcessTable
          ContentiousProcessColumns={ContentiousProcessColumns}
          ContentiousProcessData={contentiousProcesses}
        />
        <TariffByRequestOfTable RequestOfColumns={RequestOfColumns} RequestOfData={RequestOf} />
      </Container>
    </Container>
  )
}

export default Tariff