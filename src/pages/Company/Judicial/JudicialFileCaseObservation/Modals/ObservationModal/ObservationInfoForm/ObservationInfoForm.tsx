import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { Controller, useFormContext } from 'react-hook-form'
import { getObsTypeByCHB } from '@/services/judicial/judicial-obs-type.service'
import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import { JudicialObsFileType } from '@/types/judicial/judicial-obs-file.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextAreaField from '@/ui/fields/TextAreaField'
import { KEY_JUDICIAL_OBS_TYPE_CACHE } from 'pages/Company/Judicial/JudicialObsType/ObsTypeTable/utils/judicial-obs-type.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import ObsTypeModal from 'pages/Company/Judicial/JudicialObsType/Modals/ObsTypeModal'

const ObservationInfoForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<
    Omit<JudicialObservationType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      judicialObsFiles: JudicialObsFileType[]
      filesDnD: File[]
    }
  >()
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data: dataObsType } = useQuery<AxiosResponse<Array<JudicialObsTypeType>>, AxiosError<CustomErrorResponse>>(
    [KEY_JUDICIAL_OBS_TYPE_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getObsTypeByCHB(Number(idCHB))
    }
  )

  const obsTypeOptions = dataObsType?.data ?? []

  const optionsObsType: Array<SelectItemType> = obsTypeOptions.map((obsType) => {
    return {
      key: String(obsType.id),
      label: obsType.type,
    }
  })

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
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
              placeholder="Fecha - observación:"
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
        name="judicialObsTypeId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
            <Select
              width="100%"
              label="Tipo:"
              value={String(field.value)}
              options={optionsObsType}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.judicialObsTypeId}
            />

            <Button
              shape="round"
              leadingIcon="ri-add-fill"
              size="small"
              onClick={onShowModal}
              disabled={!idCHB}
              permission="P08-01"
            />
          </Container>
        )}
      />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextAreaField
            rows={4}
            width="100%"
            label="Comentario:"
            value={String(field.value)}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.comment}
          />
        )}
      />
      <ObsTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </>
  )
}

export default ObservationInfoForm
