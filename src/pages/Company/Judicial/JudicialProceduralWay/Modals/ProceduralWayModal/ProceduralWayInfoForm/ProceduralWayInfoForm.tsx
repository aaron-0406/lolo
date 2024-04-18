import { Controller, useFormContext } from 'react-hook-form'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'

const ProceduralWayInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialProceduralWayType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="proceduralWay"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.proceduralWay} />
          )}
        />
      </Container>
    </>
  )
}

export default ProceduralWayInfoForm
