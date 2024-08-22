import Button from '@/ui/Button'
import Container from '@/ui/Container/Container'
import Select from '@/ui/Select'
import { Controller, useFormContext } from 'react-hook-form'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import DatePicker from '@/ui/DatePicker/DatePicker'
import { SelectItemType } from '@/ui/Select/interfaces'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { getJudicialBinProceduralStageByCHB } from '@/services/judicial/judicial-bin-procedural-stage.service'
import { KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE } from '../../JudicialBinProceduralStage/JudicialBinProceduralStageTable/utils/judicial-bin-procedural-stage.cache'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE } from '../../JudicialBinTypeBinnacle/JudicialBinTypeBinnacleTable/utils/judicial-bin-type-binnacle.cache'
import { getJudicialBinTypeBinnacleByCHB } from '@/services/judicial/judicial-bin-type-binnacle.service'
import { useParams } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import TextAreaField from '@/ui/fields/TextAreaField'
import JudicialBinProceduralStageModal from '../../JudicialBinProceduralStage/Modals/JudicialBinProceduralStageModal'
import JudicialBinTypeBinnacleModal from '../../JudicialBinTypeBinnacle/Modals/JudicialBinTypeBinnacleModal'
import JudicialBinnacleInfoFileForm from './JudicialBinnacleInfoFileForm'
import notification from '@/ui/notification'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import { getBinnacleById } from '@/services/judicial/judicial-binnacle.service'
import moment from 'moment'
import { useEffect } from 'react'

const JudicialBinnacleInfo = () => {
  const { control, formState: { errors }, setValue, reset } = useFormContext()
  const greaterThanMobile = useMediaQuery(device.desktopL)
  const codeParams = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const idBinnacle = useParams().binnacleCode ?? ''

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data: caseFileData } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', relatedProcessCodeParams ? relatedProcessCodeParams : codeParams],
    async () => {
      return await getFileCaseByNumberFile(
        relatedProcessCodeParams ? relatedProcessCodeParams : codeParams,
        Number(idCHB)
      )
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetJudicialBinnacleById } = useQuery(
    [`GET_BINNACLE_BY_ID`],
    async () => {
      return getBinnacleById(Number(idBinnacle))
    },
    {
      onSuccess: ({ data }) => {
        if (!!idBinnacle) {
          setValue('binnacleTypeId', data.binnacleTypeId, { shouldValidate: true })
          setValue('judicialBinProceduralStageId', data.judicialBinProceduralStageId, { shouldValidate: true })
          setValue('customerHasBankId', data?.customerHasBankId, { shouldValidate: true })
          setValue('date', moment(data.date.split('T')[0]).format('DD-MM-YYYY'), { shouldValidate: true })
          setValue('lastPerformed', data.lastPerformed, { shouldValidate: true })
          setValue('judicialFileCaseId', data.judicialFileCaseId, { shouldValidate: true })
          setValue('judicialBinFiles', data.judicialBinFiles, { shouldValidate: true })
          setValue('tariffHistory', data.tariffHistory, { shouldValidate: true })
          setValue('totalTariff', data.totalTariff, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )


  const { data } = useQuery<AxiosResponse<Array<JudicialBinProceduralStageType>>>(
    [KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getJudicialBinProceduralStageByCHB(Number(idCHB))
    }
  )

  const { data: dataBinTypeBinnacle } = useQuery<AxiosResponse<Array<JudicialBinTypeBinnacleType>>>(
    [KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getJudicialBinTypeBinnacleByCHB(Number(idCHB))
    }
  )

  const binProceduralStagesOptions = data?.data ?? []

  const binTypeBinnacleOptions = dataBinTypeBinnacle?.data ?? []

  const optionsBinType: Array<SelectItemType> = binTypeBinnacleOptions.map((binTypeBinnacle) => {
    return {
      key: String(binTypeBinnacle.id),
      label: binTypeBinnacle.typeBinnacle,
    }
  })

  const optionsActions: Array<SelectItemType> = binProceduralStagesOptions.map((binProceduralStage) => {
    return {
      key: String(binProceduralStage.id),
      label: binProceduralStage.proceduralStage,
    }
  })
  const {
    visible: visibleModalAddProceduralStage,
    showModal: showModalAddProceduralStage,
    hideModal: hideModalAddProceduralStage,
  } = useModal()

  const onShowModalProceduralStage = () => {
    showModalAddProceduralStage()
  }

  const onCloseModalProceduralStage = () => {
    hideModalAddProceduralStage()
  }

  const {
    visible: visibleModalAddTypeBinnacle,
    showModal: showModalAddTypeBinnacle,
    hideModal: hideModalAddTypeBinnacle,
  } = useModal()

  const onShowModalTypeBinnacle = () => {
    showModalAddTypeBinnacle()
  }

  const onCloseModalTypeBinnacle = () => {
    hideModalAddTypeBinnacle()
  }

  useEffect(() => {
    if (!!idBinnacle && idBinnacle !== '000000000') {
      refetchGetJudicialBinnacleById()
    }
  }, [idBinnacle, refetchGetJudicialBinnacleById])

  const judicialFileCaseId = caseFileData?.data.id
  const clientCode = caseFileData?.data.client.code

  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection={greaterThanMobile ? 'row' : 'column'}
      padding="20px 40px"
      gap="20px"
      overFlowY="auto"
    >
      <Container display="flex" flexDirection="column" width={greaterThanMobile ? '50%' : '100%'} gap="10px">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              required
              label="Fecha"
              selectedDate={field.value}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value}
              getDate={(e) => {
                setValue('date', e)
              }}
            />
          )}
        />
        <Controller
          name="judicialBinProceduralStageId"
          control={control}
          render={({ field }) => (
            <Container
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="nowrap"
              width="100%"
              alignItems="flex-end"
            >
              <Select
                width="100%"
                label="Etapa Procesal:"
                value={String(field.value)}
                options={optionsActions}
                onChange={(key) => {
                  field.onChange(key)
                }}
                hasError={!!errors.judicialBinProceduralStageId}
              />

              <Button
                shape="round"
                leadingIcon="ri-add-fill"
                size="small"
                onClick={onShowModalProceduralStage}
                disabled={!idCHB}
                permission="P24-01"
              />
            </Container>
          )}
        />
        <Controller
          name="binnacleTypeId"
          control={control}
          render={({ field }) => (
            <Container
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="nowrap"
              width="100%"
              alignItems="flex-end"
            >
              <Select
                width="100%"
                label="Tipo:"
                value={String(field.value)}
                options={optionsBinType}
                onChange={(key) => {
                  field.onChange(key)
                }}
                hasError={!!errors.binnacleTypeId}
              />

              <Button
                shape="round"
                leadingIcon="ri-add-fill"
                size="small"
                onClick={onShowModalTypeBinnacle}
                disabled={!idCHB}
                permission="P25-01"
              />
            </Container>
          )}
        />
        <Controller
          name="lastPerformed"
          control={control}
          render={({ field }) => (
            <TextAreaField
              rows={4}
              width='100%'
              label="Último Actuado:"
              value={String(field.value)}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.lastPerformed}
            />
          )}
        />

      </Container>

      {/** Files DND */}

      <Container
        display="flex"
        flexDirection="column"
        width={greaterThanMobile ? '50%' : '100%'}
        gap="10px"
      >
        <JudicialBinnacleInfoFileForm judicialFileCaseId={judicialFileCaseId} clientCode={clientCode} />
      </Container>

      { /* Modals */}

      {visibleModalAddProceduralStage ? (
        <JudicialBinProceduralStageModal
          visible={visibleModalAddProceduralStage}
          onClose={onCloseModalProceduralStage}
        />
      ) : null}
      {visibleModalAddTypeBinnacle ? (
        <JudicialBinTypeBinnacleModal visible={visibleModalAddTypeBinnacle} onClose={onCloseModalTypeBinnacle} />
      ) : null}

    </Container>
  )
}

export default JudicialBinnacleInfo