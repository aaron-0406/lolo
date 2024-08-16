import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import JudicialBinnacleContentiousProcessTable from './JudicialBinnacleContentiousProcessTable'
import JudicialBinnalceByRequestOfTable from './JudicialBinnalceByRequestOfTable'
import Button from '@/ui/Button'
import Text from '@/ui/Text'
import judicialBinnacleCache from '../../JudicialBinnacleTable/utils/judicial-binnacle.cache'
import notification from '@/ui/notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTariff } from '@/services/config/tariff.service'
import { judicialBinnacleContentiousProcessColumns } from './JudicialBinnacleContentiousProcessTable/utils/columns'
import { judicialBinnacleRequestOfColumns } from './JudicialBinnalceByRequestOfTable/utils/columns'
import { ColumProps } from '@/ui/Table/Table'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { TariffType } from '@/types/config/tariff.type'
import { TariffIntervalMatchType } from '@/types/config/tariff-interval-match.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { updateBinnacleTariff } from '@/services/judicial/judicial-binnacle.service'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { CustomErrorResponse } from 'types/customErrorResponse'

type JudicialBinnacleTariffModalProps = {
  visible: boolean
  onClose: () => void
  amountDemanded?: string
  idBinnacle:number 
  clientCode: string
  JudicialFileCaseId?: number  
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


const JudicialBinnacleTariffModal = ({ visible, onClose, amountDemanded, idBinnacle, clientCode, JudicialFileCaseId} : JudicialBinnacleTariffModalProps) => {

  const [totlaTariff, setTotlaTariff] = useState<number>(0)
  const [tariffHistory, setTariffHistory] = useState<any[]>([])
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const queryClient = useQueryClient()

  const {
    actions: { editJudicialBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialBinnacleCache(queryClient)

  const { data: tariff } = useQuery<AxiosResponse<TariffTypeResponse>>(['GET_TARIFF'], async () => await getTariff())

  const { isLoading: loadingEditJudicialBinnacle, mutate: editJudicialBinnacle } = useMutation<
    AxiosResponse<JudicialBinnacleType & { judicialBinFiles: File[] }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await updateBinnacleTariff(idBinnacle, totlaTariff ?? 0, JSON.stringify(tariffHistory ?? []))
    },
    {
      onSuccess: (result) => {
        editJudicialBinnacleCache(result.data)
        notification({ type: 'success', message: 'Bitacora editada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(JudicialFileCaseId ?? 0)
      },
      onSettled: () => {
        onSettledCache(JudicialFileCaseId ?? 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, JudicialFileCaseId ?? 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onSelectOption = (data: TariffType) => {
    const amount = Number(amountDemanded);
  
    const updateTotalTariff = (value: number) => {
      setTotlaTariff((prev) => Number((prev + value).toFixed(2)));
    };
  
    const processTariffIntervalMatch = (
      dataIntervalMatch: TariffIntervalMatchType,
      multiplier: 1 | -1
    ) => {
      if (!dataIntervalMatch.tariffInterval.interval) return;
  
      const intervalArray = JSON.parse(dataIntervalMatch.tariffInterval.interval ?? '');
      const value = Number(dataIntervalMatch.value)
  
      if (isNaN(value)) return;
  
      const withinInterval =
        (intervalArray[1] && intervalArray[0] && intervalArray[1] > amount && intervalArray[0] < amount) ||
        (intervalArray[1] && !intervalArray[0] && intervalArray[1] > amount && 0 <= amount) ||
        (!intervalArray[1] && intervalArray[0] && intervalArray[0] < amount);
  
      if (withinInterval) {
        updateTotalTariff(multiplier * value);
  
        if (multiplier === 1) {
          setTariffHistory((prev) => [
            ...prev,
            {
              ...data,
              tariffIntervalMatch: dataIntervalMatch,
            },
          ])
        } else {
          setTariffHistory((prev) =>
            prev.filter((item) => item.id !== data.id || item.tariffIntervalMatch !== dataIntervalMatch)
          )
        }
      }
    };
  
    if (tariffHistory.some((item) => item.id === data.id)) {
      data.tariffIntervalMatch.forEach((dataIntervalMatch) => {
        processTariffIntervalMatch(dataIntervalMatch, -1);
      });
    } else {
      data.tariffIntervalMatch.forEach((dataIntervalMatch) => {
        processTariffIntervalMatch(dataIntervalMatch, 1);
      });
    }
  };

  const handelEditTariff = () => {
    editJudicialBinnacle()
  }

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
    <Modal
      id="judicial-binnacle-tariff-modal"
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
            <Button
              label="Guardar"
              trailingIcon="ri-save-3-line"
              onClick={handelEditTariff}
              loading={loadingEditJudicialBinnacle}
            />
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