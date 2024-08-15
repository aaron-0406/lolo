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
import { TariffType } from '@/types/config/tariff.type'
import { TariffIntervalMatchType } from '@/types/config/tariff-interval-match.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'

type JudicialBinnacleTariffModalProps = {
  visible: boolean
  amountDemanded?: string
  onClose: () => void
}

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

const JudicialBinnacleTariffModal = ({ visible, onClose, amountDemanded} : JudicialBinnacleTariffModalProps) => {

  const [totlaTariff, setTotlaTariff] = useState<number>(0)
  const [tariffHistory, setTariffHistory] = useState<TariffType[]>([])
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const { data:tariff } = useQuery<AxiosResponse<TariffTypeResponse>>(["GET_TARIFF"], async () => await getTariff())
  
  const onSelectOption = (data: TariffType) => {
    const amount = Number(amountDemanded);
  
    const updateTotalTariff = (value: number) => {
      setTotlaTariff((prev) => Number((prev + value).toFixed(2)));
    };
  
    const processTariffIntervalMatch = (dataIntervalMatch: TariffIntervalMatchType, multiplier: 1 | -1) => {
      if (!dataIntervalMatch.tariffInterval.interval) return;
  
      const intervalArray = JSON.parse(dataIntervalMatch.tariffInterval.interval ?? '');
      const value = Number(dataIntervalMatch.value);
  
      if (isNaN(value)) return;
  
      if (intervalArray[1] && intervalArray[0] && intervalArray[1] > amount && intervalArray[0] < amount) {
        updateTotalTariff(multiplier * value)
      } else if (intervalArray[1] && !intervalArray[0] && intervalArray[1] > amount && 0 <= amount) {
        updateTotalTariff(multiplier * value)
      } else if (!intervalArray[1] && intervalArray[0] && intervalArray[0] < amount) {
        updateTotalTariff(multiplier * value)
      }
    };
  
    if (!tariffHistory.length) {
      setTariffHistory([data]);
  
      data.tariffIntervalMatch.forEach((dataIntervalMatch: TariffIntervalMatchType) => {
        processTariffIntervalMatch(dataIntervalMatch, 1);
      });
    } else if (tariffHistory.some((item) => item.id === data.id)) {
      setTariffHistory(tariffHistory.filter((item) => item.id !== data.id));
  
      data.tariffIntervalMatch.forEach((dataIntervalMatch: TariffIntervalMatchType) => {
        processTariffIntervalMatch(dataIntervalMatch, -1);
      });
    } else {
      setTariffHistory([...tariffHistory, data]);
  
      data.tariffIntervalMatch.forEach((dataIntervalMatch: TariffIntervalMatchType) => {
        processTariffIntervalMatch(dataIntervalMatch, 1);
      });
    }
  };
  
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
        <Container
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent={greaterThanTabletL ? 'space-between' : 'end'}
          alignItems="center"
          gap="20px"
        >
          {!greaterThanTabletL ? null : (
            <Container display="flex" flexDirection="row" gap="10px">
              <Text.Body size="l" color="Neutral6" weight="bold">
                Monto demandado:
              </Text.Body>
              <Text.Number size="xl" color="Neutral6" weight="bold">
                {Number(amountDemanded ?? 0).toLocaleString('es-ES')}
              </Text.Number>
            </Container>
          )}
          <Container display="flex" flexDirection="row" gap="10px" alignItems="center">
            <Container display="flex" gap="10px">
              <Text.Body size="l" color="Neutral6" weight="bold">
                Tarifa total:
              </Text.Body>
              <Text.Number size="xl" color="Neutral6" weight="bold">
                {totlaTariff ?? 0}
              </Text.Number>
            </Container>
            <Button label="Guardar" trailingIcon="ri-save-3-line" />
          </Container>
        </Container>
      }
    >
      <Container width="100%" height="calc(100% - 80px)" padding="20px">
        <JudicialBinnacleContentiousProcessTable
          ContentiousProcessColumns={ContentiousProcessColumns ?? []}
          ContentiousProcessData={contentiousProcesses ?? []}
          onSelectOption={onSelectOption}
          tariffHistory={tariffHistory ?? []}
        />
        <JudicialBinnalceByRequestOfTable
          RequestOfColumns={RequestOfColumns}
          RequestOfData={RequestOf}
          onSelectOption={onSelectOption}
          tariffHistory={tariffHistory ?? []}
        />
      </Container>
    </Modal>
  )
}

export default JudicialBinnacleTariffModal