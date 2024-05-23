import { useLoloContext } from '@/contexts/LoloProvider'
import { getJudicialBinProceduralStageByCHB } from '@/services/judicial/judicial-bin-procedural-stage.service'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Select from '@/ui/Select'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import JudicialBinTypeBinnacleModal from 'pages/Company/Judicial/JudicialBinTypeBinnacle/Modals/JudicialBinTypeBinnacleModal'
import JudicialBinProceduralStageModal from 'pages/Company/Judicial/JudicialBinProceduralStage/Modals/JudicialBinProceduralStageModal'
import { SelectItemType } from '@/ui/Select/interfaces'
import { AxiosResponse } from 'axios'
import { KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE } from 'pages/Company/Judicial/JudicialBinProceduralStage/JudicialBinProceduralStageTable/utils/judicial-bin-procedural-stage.cache'
import { Controller, useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import TextAreaField from '@/ui/fields/TextAreaField'
import { KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE } from 'pages/Company/Judicial/JudicialBinTypeBinnacle/JudicialBinTypeBinnacleTable/utils/judicial-bin-type-binnacle.cache'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { getJudicialBinTypeBinnacleByCHB } from '@/services/judicial/judicial-bin-type-binnacle.service'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE } from 'pages/Company/Judicial/JudicialBinDefendantProceduralAction/JudicialBinDefendantProceduralActionTable/utils/judicial-bin-defendant-procedural-action.cache'
import { getJudicialBinDefendantProceduralActionByCHB } from '@/services/judicial/judicial-bin-defendant-procedural-action.service'

const JudicialBinnacleInfoForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<
    Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      judicialBinFiles: JudicialBinFileType[]
      filesDnD: File[]
    }
  >()
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<Array<JudicialBinProceduralStageType>>>(
    [KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getJudicialBinProceduralStageByCHB(Number(idCHB))
    }
  )

  const { data: dataBinDefendatProceduralAction } = useQuery<
    AxiosResponse<Array<JudicialBinDefendantProceduralActionType>>
  >([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, parseInt(idCHB.length ? idCHB : '0')], async () => {
    return await getJudicialBinDefendantProceduralActionByCHB(Number(idCHB))
  })

  const { data: dataBinTypeBinnacle } = useQuery<AxiosResponse<Array<JudicialBinTypeBinnacleType>>>(
    [KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getJudicialBinTypeBinnacleByCHB(Number(idCHB))
    }
  )

  const binProceduralStagesOptions = data?.data ?? []
  const binDefendatProceduralActionsOptions = dataBinDefendatProceduralAction?.data ?? []

  const binTypeBinnacleOptions = dataBinTypeBinnacle?.data ?? []

  const optionsActions: Array<SelectItemType> = binProceduralStagesOptions.map((binProceduralStage) => {
    return {
      key: String(binProceduralStage.id),
      label: binProceduralStage.proceduralStage,
    }
  })

  const optionsBinType: Array<SelectItemType> = binTypeBinnacleOptions.map((binTypeBinnacle) => {
    return {
      key: String(binTypeBinnacle.id),
      label: binTypeBinnacle.typeBinnacle,
    }
  })

  const optionsDefendant: Array<SelectItemType> = binDefendatProceduralActionsOptions.map((binTypeBinnacle) => {
    return {
      key: String(binTypeBinnacle.id),
      label: binTypeBinnacle.defendantProceduralAction,
    }
  })

  const { visible: visibleModalAddEta, showModal: showModalAddEta, hideModal: hideModalAddEta } = useModal()

  const onShowModalEta = () => {
    showModalAddEta()
  }

  const onCloseModalEta = () => {
    hideModalAddEta()
  }

  const { visible: visibleModalAddTi, showModal: showModalAddTi, hideModal: hideModalAddTi } = useModal()

  const onShowModalTi = () => {
    showModalAddTi()
  }

  const onCloseModalTi = () => {
    hideModalAddTi()
  }

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
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
      </Container>

      <Controller
        name="judicialBinProceduralStageId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
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
              onClick={onShowModalEta}
              disabled={!idCHB}
              permission="P08-01"
            />
          </Container>
        )}
      />

      <Controller
        name="binnacleTypeId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
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
              onClick={onShowModalTi}
              disabled={!idCHB}
              permission="P08-01"
            />
          </Container>
        )}
      />
      <Controller
        name="judicialDefendantProceduralActionId"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            label="Actuación Procesal Demandada:"
            value={String(field.value)}
            options={optionsDefendant}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.judicialDefendantProceduralActionId}
          />
        )}
      />
      <Controller
        name="lastPerformed"
        control={control}
        render={({ field }) => (
          <TextAreaField
            rows={4}
            width="100%"
            label="Último Actuado:"
            value={String(field.value)}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.lastPerformed}
          />
        )}
      />
      <JudicialBinProceduralStageModal visible={visibleModalAddEta} onClose={onCloseModalEta} />
      <JudicialBinTypeBinnacleModal visible={visibleModalAddTi} onClose={onCloseModalTi} />
    </>
  )
}

export default JudicialBinnacleInfoForm
