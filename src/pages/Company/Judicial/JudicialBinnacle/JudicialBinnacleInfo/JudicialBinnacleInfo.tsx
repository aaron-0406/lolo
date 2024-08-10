import Button from '@/ui/Button'
import Container, { StyledContainer } from '@/ui/Container/Container'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinnacleInfo = () => {
  const { control, formState: { errors } } = useFormContext()
  return (
    <StyledContainer
      width="100%"
      height="calc(100% - 40px)"
      display="flex"
      flexDirection="column"
      padding="20px"
      gap="20px"
      overFlowY="auto"
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <TextField
            value={field.value}
            onChange={field.onChange}
            width="100%"
            label="Fecha"
            placeholder="Fecha"
            required
          />
        )}
      />
      <Controller
        name="judicialBinProceduralStageId"
        control={control}
        render={({ field }) => (
          <TextField
            value={field.value}
            onChange={field.onChange}
            width="100%"
            label="Último Actuado"
            placeholder="Último Actuado"
            required
          />
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
              // options={optionsBinType}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.binnacleTypeId}
            />

            <Button
              shape="round"
              leadingIcon="ri-add-fill"
              size="small"
              // onClick={onShowModalTypeBinnacle}
              // disabled={!idCHB}
              permission="P25-01"
            />
          </Container>
        )}
      />
    </StyledContainer>
  )
}

export default JudicialBinnacleInfo