import { Controller, useFormContext } from 'react-hook-form'
import { CommentType } from '@/types/extrajudicial/comment.type'
import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { useLoloContext } from '@/contexts/LoloProvider'
import TextAreaField from '@/ui/fields/TextAreaField'

type CobranzaCommentsInfoFormProps = {
  clientId: number
}

const CobranzaCommentsInfoForm = ({ clientId }: CobranzaCommentsInfoFormProps) => {
  const {
    extrajudicial: {
      managementAction: { managementActions },
    },
  } = useLoloContext()

  const {
    control,
    setValue,
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
                setValue('date', e)
              }}
            />
          )}
        />
      </Container>

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
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextAreaField
            disabled={!clientId}
            width="100%"
            label="Comentario:"
            rows={5}
            value={field.value}
            hasError={!!errors.comment}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />
    </>
  )
}

export default CobranzaCommentsInfoForm
