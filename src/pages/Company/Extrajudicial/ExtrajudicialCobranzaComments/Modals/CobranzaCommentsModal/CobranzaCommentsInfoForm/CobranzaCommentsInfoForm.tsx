import { Controller, useFormContext } from 'react-hook-form'
import { CommentType } from '@/types/extrajudicial/comment.type'
import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { useLoloContext } from '@/contexts/LoloProvider'
import TextAreaField from '@/ui/fields/TextAreaField'
import Label from '@/ui/Label'
import { useQuery } from 'react-query'
import { KEY_EXT_COBRANZA_ACCIONES_CACHE } from '@/pages/extrajudicial/ExtrajudicialActions/ActionsTable/utils/ext-acciones.cache'
import { getAllManagementActionsByCHB } from '@/services/extrajudicial/management-action.service'
import { AxiosResponse } from 'axios'
import { ManagementActionType } from '@/types/extrajudicial/management-action.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import ActionsModal from '@/pages/extrajudicial/ExtrajudicialActions/Modals/ActionsModal'

type CobranzaCommentsInfoFormProps = {
  clientId: number
}

const CobranzaCommentsInfoForm = ({ clientId }: CobranzaCommentsInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CommentType & { managementAction: { nameAction: string; customerHasBankId: string } }>()

  const managementAction = getValues('managementAction')
  const showManagementAction = managementAction && managementAction.customerHasBankId != idCHB

  const optionsStates: Array<SelectItemType> = [
    { key: 'CORREO', label: 'CORREO' },
    { key: 'VISITA', label: 'VISITA' },
    { key: 'LLAMADA', label: 'LLAMADA' },
    { key: 'REUNIÓN OFICINA', label: 'REUNIÓN OFICINA' },
    { key: 'MENSAJE WHATSAPP', label: 'MENSAJE WHATSAPP' },
  ]

  const { data } = useQuery<AxiosResponse<Array<ManagementActionType>>>(
    [KEY_EXT_COBRANZA_ACCIONES_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getAllManagementActionsByCHB(idCHB.length ? idCHB : '0')
    }
  )

  const managementActions = data?.data ?? []

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const optionsActions: Array<SelectItemType> = managementActions.map((managementAction) => {
    return {
      key: String(managementAction.id),
      label: managementAction.nameAction,
    }
  })

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const textAreaSize = greaterThanTabletL ? 13 : 6
  const mainContainer = greaterThanDesktopS ? 'row' : 'column'

  return (
    <>
      <Container display="flex" flexDirection={mainContainer} gap="20px">
        <Container width="100%" display="flex" flexDirection="column" gap="10px">
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
            name="negotiation"
            control={control}
            render={({ field }) => (
              <Select
                disabled={!clientId}
                width="100%"
                label="Negociación:"
                value={field.value}
                options={optionsStates}
                onChange={(key) => {
                  field.onChange(key)
                }}
                hasError={!!errors.negotiation}
              />
            )}
          />

          <Controller
            name="managementActionId"
            control={control}
            render={({ field }) => (
              <Container display="flex" flexDirection="column">
                <Container
                  display="flex"
                  flexDirection="row"
                  gap="10px"
                  flexWrap="nowrap"
                  width="100%"
                  alignItems="flex-end"
                >
                  <Select
                    disabled={!clientId}
                    width="100%"
                    label="Acción:"
                    value={!!field.value ? String(field.value) : ''}
                    options={optionsActions}
                    onChange={(key) => {
                      field.onChange(parseInt(key))
                    }}
                    hasError={!!errors.managementActionId}
                  />

                  <Button
                    shape="round"
                    leadingIcon="ri-add-fill"
                    size="small"
                    onClick={onShowModal}
                    disabled={!idCHB}
                    permission="P07-01"
                  />
                </Container>

                {showManagementAction && <Label label={`Acción: ${managementAction?.nameAction}`} color="Primary5" />}
              </Container>
            )}
          />
        </Container>

        <Container width="100%" height="fit-content">
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextAreaField
                disabled={!clientId}
                width="100%"
                label="Comentario:"
                rows={textAreaSize}
                value={field.value}
                hasError={!!errors.comment}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
              />
            )}
          />
        </Container>
      </Container>

      <ActionsModal visible={visibleModalAdd} onClose={onCloseModal} />
    </>
  )
}

export default CobranzaCommentsInfoForm
