import { Controller, useFormContext } from 'react-hook-form'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { useLoloContext } from '@/contexts/LoloProvider'

const CourtInfoForm = () => {
  const {
    city: { cities },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialCourtType>()

  const optionsCities: Array<SelectItemType> = cities.map((city) => {
    return {
      key: String(city.id),
      label: city.name,
    }
  })

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="court"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.court} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Controller
          name="cityId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              label="Jurisdicción:"
              value={String(field.value)}
              options={optionsCities}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.cityId}
            />
          )}
        />
      </Container>
    </>
  )
}

export default CourtInfoForm
