import { Controller, useFormContext } from 'react-hook-form'
import { CommentType } from '../../../../../../../shared/types/extrajudicial/comment.type'
import Container from '../../../../../../../ui/Container'
import Label from '../../../../../../../ui/Label'
import DatePicker from '../../../../../../../ui/DatePicker/DatePicker'
import Select from '../../../../../../../ui/Select'
import { SelectItemType } from '../../../../../../../ui/Select/interfaces'
import { useLoloContext } from '../../../../../../../shared/contexts/LoloProvider'
import TextAreaField from '../../../../../../../ui/fields/TextAreaField'

type CobranzaCommentsInfoFormProps = {
  clientId: number
}

const CobranzaCommentsInfoForm = ({ clientId }: CobranzaCommentsInfoFormProps) => {
  const {
    managementAction: { managementActions },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<CommentType>()

  const optionsStates: Array<SelectItemType> = [
    { key: 'CORREO', label: 'CORREO' },
    { key: 'VISITA', label: 'VISITA' },
    { key: 'LLAMADA', label: 'LLAMADA' },
    { key: 'REUNIÓN OFICINA', label: 'REUNIÓN OFICINA' },
    { key: 'MENSAJE WHATSAPP', label: 'MENSAJE WHATSAPP' },
  ]

  const optionsActions: Array<SelectItemType> = managementActions.map((managementAction) => {
    return {
      key: String(managementAction.id),
      label: managementAction.nameAction,
    }
  })

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
                field.onChange('date', e)
              }}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Negociación: " />
        <Controller
          name="negotiation"
          control={control}
          render={({ field }) => (
            <Select
              disabled={!clientId}
              width="100%"
              value={field.value}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.negotiation}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Acción: " />
        <Controller
          name="managementActionId"
          control={control}
          render={({ field }) => (
            <Select
              disabled={!clientId}
              width="100%"
              value={!!field.value ? String(field.value) : ''}
              options={optionsActions}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.managementActionId}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Comentario: " />
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextAreaField
              disabled={!clientId}
              width="100%"
              rows={5}
              value={field.value}
              hasError={!!errors.comment}
              onChange={(e) => {
                field.onChange(e.target.value)
              }}
            />
          )}
        />
      </Container>
    </>
  )
}

export default CobranzaCommentsInfoForm
