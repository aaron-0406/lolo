import { Controller, useFormContext } from 'react-hook-form'
import { CommentType } from '../../../../../../../shared/types/extrajudicial/comment.type'
import Container from '../../../../../../../ui/Container'
import Label from '../../../../../../../ui/Label'
import TextField from '../../../../../../../ui/fields/TextField'

const CobranzaCommentsInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CommentType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Fecha: " />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.date} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Negociación: " />
        <Controller
          name="negotiation"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.negotiation} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Comentario: " />
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField width="62%" value={field.value} onChange={field.onChange} hasError={!!errors.comment} />
          )}
        />
      </Container>
    </>
  )
}

export default CobranzaCommentsInfoForm
