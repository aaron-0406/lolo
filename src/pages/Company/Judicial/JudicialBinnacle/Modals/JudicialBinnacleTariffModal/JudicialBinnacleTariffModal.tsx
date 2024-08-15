import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import JudicialBinnacleContentiousProcessTable from './JudicialBinnacleContentiousProcessTable'
import JudicialBinnalceByRequestOfTable from './JudicialBinnalceByRequestOfTable'
import Button from '@/ui/Button'
import Text from '@/ui/Text'
import { useQuery } from 'react-query'
import { getTariff } from '@/services/config/tariff.service'
import { judicialBinnacleContentiousProcessColumns } from './JudicialBinnacleContentiousProcessTable/utils/columns'
import { judicialBinnacleRequestOfColumns } from './JudicialBinnalceByRequestOfTable/utils/columns'
import { ColumProps } from '@/ui/Table/Table'
import { AxiosResponse } from 'axios'
import { useState } from 'react'

type JudicialBinnacleTariffModalProps = {
  visible: boolean
  amountDemanded?: string
  onClose: () => void
}

type TariffType = {
  contentiousProcessesHeaders: any[]
  contentiousProcesses: any[]
  requestOfHeaders: any[]
  requestOf: any[]
}

let ContentiousProcessColumns: ColumProps[] = []
let RequestOfColumns: ColumProps[] = []
let contentiousProcesses: any[] = []
let RequestOf: any[] = []

const JudicialBinnacleTariffModal = ({ visible, onClose, amountDemanded} : JudicialBinnacleTariffModalProps) => {

  const [totlaTariff, setTotlaTariff] = useState<number>(0)
  const [tariffHistory, setTariffHistory] = useState<any[]>([])
  
  const onSelectOption = (data: any) => {
    if (tariffHistory.some(item => item.id === data.id)) {
      setTariffHistory(tariffHistory.filter(item => item.id !== data.id));
    } else {
      setTariffHistory([...tariffHistory, data]);
    }
  };

  // const onSelectOption = (data: any) => {

    
  //   if(tariffHistory.some(item => item.id === data.id)) {
  //     setTariffHistory(tariffHistory.filter(item => item.id !== data.id))
  //     // data.tariffIntervalMatch.forEach((dataIntervalMatch: any) => {
  //     //   console.log(dataIntervalMatch)
  //     //   // if (!dataIntervalMatch.interval) return
  //     //   // const intervalArray = JSON.parse(dataIntervalMatch.interval ?? "")
  //     //   // console.log(intervalArray)
  //     //   // if (
  //     //   //   intervalArray[1] &&
  //     //   //   intervalArray[0] &&
  //     //   //   intervalArray[1] < Number(amountDemanded) &&
  //     //   //   intervalArray[0] > Number(amountDemanded)
  //     //   // ) {
  //     //   //   setTotlaTariff((prev) => prev - data.value)
  //     //   // } else if (
  //     //   //   intervalArray[1] &&
  //     //   //   !intervalArray[0] &&
  //     //   //   intervalArray[1] > Number(amountDemanded) &&
  //     //   //   0 <= Number(amountDemanded)
  //     //   // ) {
  //     //   //   setTotlaTariff((prev) => prev - data.value)
  //     //   // } else if (!intervalArray[1] && intervalArray[0] && intervalArray[0] < Number(amountDemanded)) {
  //     //   //   setTotlaTariff((prev) => prev - data.value)
  //     //   // }
  //     // })
  //   }
  //   else {
  //     setTariffHistory([...tariffHistory, data])
  //     // if(!Array.isArray(data.tariffIntervalMatch)) return
  //     // data.tariffIntervalMatch.forEach((dataIntervalMatch: any) => {
  //     //   console.log(dataIntervalMatch)
  //     //   // if (!dataIntervalMatch.interval) return
  //     //   // const intervalArray = JSON.parse(dataIntervalMatch.interval ?? "")
  //     //   // console.log(intervalArray)
  //     //   // if (
  //     //   //   intervalArray[1] &&
  //     //   //   intervalArray[0] &&
  //     //   //   intervalArray[1] < Number(amountDemanded) &&
  //     //   //   intervalArray[0] > Number(amountDemanded)
  //     //   // ) {
  //     //   //   setTotlaTariff((prev) => prev + data.value)
  //     //   // } else if (
  //     //   //   intervalArray[1] &&
  //     //   //   !intervalArray[0] &&
  //     //   //   intervalArray[1] > Number(amountDemanded) &&
  //     //   //   0 <= Number(amountDemanded)
  //     //   // ) {
  //     //   //   setTotlaTariff((prev) => prev + data.value)
  //     //   // } else if (!intervalArray[1] && intervalArray[0] && intervalArray[0] < Number(amountDemanded)) {
  //     //   //   setTotlaTariff((prev) => prev + data.value)
  //     //   // }
  //     // })
  //   }
  // }
  
  const { data:tariff } = useQuery<AxiosResponse<TariffType>>(["GET_TARIFF"], async () => await getTariff())
  
  ContentiousProcessColumns = tariff && Array.isArray(tariff?.data?.contentiousProcessesHeaders)
  ? tariff.data.contentiousProcessesHeaders.map((header: any, index) => ({
      id: `binnacle.datatable.interval${1 + index}`,
      title: header.headerTitle,
      width: '10%',
      justifyContent: 'center',
      tooltipMessage: header.description,
    }))
  : [];
  
  RequestOfColumns = tariff && Array.isArray(tariff?.data?.requestOfHeaders)
  ? tariff.data.requestOfHeaders.map((header: any, index) => ({
      id: `binnacle.datatable.interval${1 + index}`,
      title: header.headerTitle,
      width: '10%',
      justifyContent: 'center',
      tooltipMessage: header.description,
    }))
  : [];

ContentiousProcessColumns = [
  ...judicialBinnacleContentiousProcessColumns,
  ...ContentiousProcessColumns,
];

RequestOfColumns = [
  ...judicialBinnacleRequestOfColumns,
  ...RequestOfColumns,
];

contentiousProcesses = tariff?.data?.contentiousProcesses ?? []
RequestOf = tariff?.data?.requestOf ?? []


  return (
    <Modal
      id="judicial-binocular-tariff-modal"
      title="Cuadro de tarifas"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      size="large"
      contentOverflowY="auto"
      minHeight="140px"
      footer={
        <Container display="flex" width="100%" justifyContent="end" alignItems="center" gap="20px">
          <Container display="flex" gap="10px">
            <Text.Body size="l" color="Neutral6" weight="bold">
              Tarifa total:
            </Text.Body>
            <Text.Number size="xl" color="Neutral6" weight="bold">
              {tariffHistory}
            </Text.Number>
          </Container>
          <Button label="Guardar" trailingIcon="ri-save-3-line" />
        </Container>
      }
    >
      <Container width="100%" height="calc(100% - 80px)" padding="20px">
        <JudicialBinnacleContentiousProcessTable
          ContentiousProcessColumns={ContentiousProcessColumns}
          ContentiousProcessData={contentiousProcesses}
          onSelectOption={onSelectOption}
          tariffHistory={tariffHistory}
        />
        <JudicialBinnalceByRequestOfTable
          RequestOfColumns={RequestOfColumns}
          RequestOfData={RequestOf}
          onSelectOption={onSelectOption}
          tariffHistory={tariffHistory}
        />
      </Container>
    </Modal>
  )
}

export default JudicialBinnacleTariffModal