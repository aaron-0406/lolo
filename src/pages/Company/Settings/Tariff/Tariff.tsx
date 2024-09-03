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
import { useLoloContext } from "@/contexts/LoloProvider"
import TariffByExhortProcessTable from "./TariffByExhortProcessTable"
import TariffCustomTableTable from "./TariffCustomTable"
import { KEY_TARIFF_CACHE } from "./utils/tariff.cache"

export type TariffTypeResponse = {
  contentiousProcessesHeaders: any[]
  contentiousProcesses: TariffType[]
  requestOfHeaders: any[]
  requestOf: TariffType[]
  byExhortProcess: TariffType[]
  customTariff: TariffType[]
}

export enum TariffModalType {
  byExhortProcess = 'POR TRAMITE DE EXHORTO',
  customTariff = 'TARIFA PERSONALIZADA',
  contentiousProcess = 'PROCESOS CONTENCIOSOS',
  requestOf = 'POR SOLICITUD DE',
}


let ContentiousProcessColumns: ColumProps[] = []
let RequestOfColumns: ColumProps[] = []
let contentiousProcesses: TariffType[] = []
let RequestOf: TariffType[] = []
let byExhortProcess: TariffType[] = []
let customTariff: TariffType[] = []


const Tariff = () => {
  const {
    bank: { selectedBank: { idCHB: chb }}
  } = useLoloContext()

  const { data: tariff } = useQuery<AxiosResponse<TariffTypeResponse>>(
    [KEY_TARIFF_CACHE, Number(chb) ?? 0],
    async () => await getTariff(Number(chb))
  )
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
  byExhortProcess = tariff?.data?.byExhortProcess ?? []
  customTariff = tariff?.data?.customTariff ?? []

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <TariffActions />
      <Container width="100%" height="cal" display="flex" flexDirection="column" justifyContent="space-between">
        <TariffContentiousProcessTable
          ContentiousProcessColumns={ContentiousProcessColumns}
          ContentiousProcessData={contentiousProcesses}
        />
        <TariffByRequestOfTable RequestOfColumns={RequestOfColumns} RequestOfData={RequestOf} />
        <TariffByExhortProcessTable byExhortProcessData={byExhortProcess} type={TariffModalType.byExhortProcess} />
        <TariffCustomTableTable customTariffData={customTariff} type={TariffModalType.customTariff} />
      </Container>
    </Container>
  )
}

export default Tariff