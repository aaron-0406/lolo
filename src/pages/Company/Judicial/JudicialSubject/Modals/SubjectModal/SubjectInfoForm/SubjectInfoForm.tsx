import { Controller, useFormContext } from 'react-hook-form'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'

const SubjectInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialSubjectType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.subject} />
          )}
        />
      </Container>
    </>
  )
}

export default SubjectInfoForm
