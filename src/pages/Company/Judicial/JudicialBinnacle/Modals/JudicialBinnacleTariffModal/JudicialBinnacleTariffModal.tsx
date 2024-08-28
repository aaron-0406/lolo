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
import JudicialBinnacelByExhortProcessTable from './JudicialBinnacleByExhortProcessTable'
import JudicialBinnacleCustomTariffTable from './JudicialBinnacleCustomTariffTable'

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
  byExhortProcessHeaders: TariffType[]
  requestOfHeaders: TariffType[]
  requestOf: TariffType[]
  byExhortProcess: TariffType[]
  customTariff: TariffType[]
}

let ContentiousProcessColumns: ColumProps[] = []
let RequestOfColumns: ColumProps[] = []
let contentiousProcesses: TariffType[] = []
let RequestOf: TariffType[] = []


const JudicialBinnacleTariffModal = ({ visible, onClose, amountDemanded, idBinnacle, JudicialFileCaseId} : JudicialBinnacleTariffModalProps) => {

  const [totlaTariff, setTotlaTariff] = useState<number>(0)
  const [tariffHistory, setTariffHistory] = useState<any[]>([])
  const [byExhortProcess, setByExhortProcess] = useState<TariffType[]>([])
  const [byExhortProcessDefault, setByExhortProcessDefault] = useState<TariffType[]>([])
  const [customTariff, setCustomTariff] = useState<TariffType[]>([])
  const [customTariffDefault, setCustomTariffDefault] = useState<TariffType[]>([])
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const queryClient = useQueryClient()

  const {
    actions: { editJudicialBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialBinnacleCache(queryClient)

  const { data: tariff } = useQuery<AxiosResponse<TariffTypeResponse>>(['GET_TARIFF'], async () => await getTariff(), {
    onSuccess: (result) => {
      setByExhortProcessDefault(result?.data?.byExhortProcess ?? [])
      setByExhortProcess(result?.data?.byExhortProcess.map((byExhortProcessData: any) => {
        return {
          ...byExhortProcessData,
          tariffIntervalMatch: [
            {
              ...byExhortProcessData.tariffIntervalMatch[0],
              value: '0',
            },
          ],
        }
      }) ?? [])

      setCustomTariff((prev) => {
        return [
          ...prev,
          ...result?.data?.customTariff.map((customTariffData: any) => {
            return {
              ...customTariffData,
              tariffIntervalMatch: [
                {
                  ...customTariffData.tariffIntervalMatch[0],
                  value: '0',
                },
              ],
            }
          }) ?? [],
        ]
      })
      
      setCustomTariffDefault((prev) => {
        return [
          ...prev,
          ...result?.data?.customTariff.map((customTariffData: any) => {
            return {
              ...customTariffData,
              tariffIntervalMatch: [
                {
                  ...customTariffData.tariffIntervalMatch[0],
                  value: '0',
                },
              ],
            }
          }) ?? [],
        ]
      })

      setTariffHistory((prev) => {
        return [
          ...prev,
          ...result?.data?.byExhortProcess.map((item) => ({
            ...item,
            tariffIntervalMatch: {
              ...item.tariffIntervalMatch[0],
              value: '0',
            }
          })),
          ...result?.data?.customTariff.map((item) => ({
            ...item,
            tariffIntervalMatch: {
              ...item.tariffIntervalMatch[0],
              value: '0',
            }
          })),
        ]
      })
    }
  })

  const { isLoading: loadingEditJudicialBinnacle, mutate: editJudicialBinnacle } = useMutation<
    AxiosResponse<JudicialBinnacleType & { judicialBinFiles: File[] }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await updateBinnacleTariff(
        idBinnacle,
        totlaTariff ?? 0,
        JSON.stringify(tariffHistory.filter((data) => data.tariffIntervalMatch.value !== '0') ?? [])
      )
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

  const onSelectByExhortProcess = (data: TariffType) => {
    const defaultValue = Number(byExhortProcessDefault.find((item) => item.id === data.id)?.tariffIntervalMatch[0].value ?? 0);
    const currentItem = byExhortProcess.find((item) => item.id === data.id);
    const currentValue = Number(currentItem?.tariffIntervalMatch[0].value ?? 0);

    const processTariffIntervalMatch = (
      dataIntervalMatch: TariffIntervalMatchType,
      multiplier: 1 | -1
    ) => {
      if (!dataIntervalMatch.tariffInterval.interval) return;
  
      if (multiplier === 1) {

        setTariffHistory((prev) => [
          ...prev,
          {
            ...data,
            tariffIntervalMatch: dataIntervalMatch,
          },
        ]);
  
        setTotlaTariff((prev) => Number((prev + defaultValue).toFixed(2)));
      } else {
        if (Number(currentItem?.tariffIntervalMatch[0].value) > 0)
          setTotlaTariff((prev) => Number((prev - currentValue).toFixed(2)));
        const newByExhortProcessList = byExhortProcess.map((item: any) => {
          if (item.id !== data.id) return item;
          return {
            ...item,
            tariffIntervalMatch: [
              {
                ...item.tariffIntervalMatch[0],
                value: String(defaultValue),
              },
            ],
          };
        });
  
        setByExhortProcess(newByExhortProcessList);
  
        setTariffHistory((prev) =>
          prev.filter((item) => !(item.id === data.id))
        );
  
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
  

  const onChangeExhortProcess = (id: number, index: 1 | -1) => {
    // Verifica si el item existe en tariffHistory antes de proceder
    const tariffHistoryItem = tariffHistory.find((item) => item.id === id);
    if (!tariffHistoryItem) return;
  
    const value = Number(
      byExhortProcessDefault.find((item) => item.id === id)?.tariffIntervalMatch[0].value ?? 0
    );

    if (index === 1) {
      const tariffIntervalMatchValue = Number(byExhortProcess.find((item) => item.id === id)?.tariffIntervalMatch[0].value ?? 0);
      const newTariffIntervalMatchValue = tariffIntervalMatchValue + value;
      // Actualiza el historial
      const newHistoryList = tariffHistory.map((item: any) => {
        if (item.id !== id) return item;
        return {
          ...item,
          tariffIntervalMatch: {
            ...item.tariffIntervalMatch,
            value: String(newTariffIntervalMatchValue),
          },
        };
      });
  
      // Actualiza la lista de exhortos
      const newByExhortProcessList = byExhortProcess.map((item: any) => {
        if (item.id !== id) return item;
        return {
          ...item,
          tariffIntervalMatch: [
            {
              ...item.tariffIntervalMatch[0],
              value: String(newTariffIntervalMatchValue),
            },
          ],
        };
      });
  
      // Actualiza el estado
      setTotlaTariff((prev) => Number((prev + value).toFixed(2)));
      setTariffHistory(newHistoryList);
      setByExhortProcess(newByExhortProcessList);
  
    } else if (index === -1) {
      const tariffIntervalMatchValue = Number(tariffHistoryItem.tariffIntervalMatch.value);
      if (tariffIntervalMatchValue === 0) return;
  
      const newTariffIntervalMatchValue = tariffIntervalMatchValue - value;
  
      // Actualiza el historial
      const newHistoryList = tariffHistory.map((item: any) => {
        if (item.id !== id) return item;
        return {
          ...item,
          tariffIntervalMatch: {
            ...item.tariffIntervalMatch,
            value: String(newTariffIntervalMatchValue),
          },
        };
      });
  
      // Actualiza la lista de exhortos
      const newByExhortProcessList = byExhortProcess.map((item: any) => {
        if (item.id !== id) return item;
        return {
          ...item,
          tariffIntervalMatch: [
            {
              ...item.tariffIntervalMatch[0],
              value: String(newTariffIntervalMatchValue),
            },
          ],
        };
      });
  
      // Actualiza el estado
      setTotlaTariff((prev) => Number((prev - value).toFixed(2)));
      setTariffHistory(newHistoryList);
      setByExhortProcess(newByExhortProcessList);
    }
  };

  const onChangeCustomTariff = (id: number, index: 1 | -1) => {
    
  }

  const onAddCustomTariff = () => {
    const lastCustomTariffDefault = customTariffDefault[0];
    const lastCustomTariff = customTariff[customTariff.length - 1];
    const codeNumberLastCustomTariff = lastCustomTariff.code.split('-')[2];
    const newCustomTariffCode =
      Number(codeNumberLastCustomTariff) < 10
        ? `TP-00004-0${Number(codeNumberLastCustomTariff) + 1}`
        : `TP-00004-${Number(codeNumberLastCustomTariff) + 1}`
    setCustomTariff((prev) => [
      ...prev,
      {
        code: newCustomTariffCode,
        description: '',
        id: lastCustomTariff.id + 1,
        type: lastCustomTariffDefault.type,
        tariffIntervalMatch: [
          {
            ...lastCustomTariffDefault.tariffIntervalMatch[0],
          },
        ],
      },
    ])

    setTariffHistory((prev) => [
      ...prev,
      {
        code: newCustomTariffCode,
        description: '',
        id: lastCustomTariff.id + 1,
        type: lastCustomTariffDefault.type,
        tariffIntervalMatch: {
          ...lastCustomTariffDefault.tariffIntervalMatch[0],
        },
      }
     ]);


  }
  

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
        />
        <JudicialBinnalceByRequestOfTable
          RequestOfColumns={RequestOfColumns}
          RequestOfData={RequestOf}
          onSelectOption={onSelectOption}
        />
        <JudicialBinnacelByExhortProcessTable
          byExhortProcessData={byExhortProcess ?? []}
          onChange={onChangeExhortProcess}
        />
        <JudicialBinnacleCustomTariffTable 
          customTariffData={customTariff ?? []}
          onChange={onChangeCustomTariff}
          onAddCustomTariff={onAddCustomTariff}
        />
      </Container>
    </Modal>
  )
}

export default JudicialBinnacleTariffModal