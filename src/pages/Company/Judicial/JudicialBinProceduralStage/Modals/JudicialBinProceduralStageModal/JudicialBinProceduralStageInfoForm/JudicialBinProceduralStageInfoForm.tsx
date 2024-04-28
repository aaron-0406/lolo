import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinProceduralStageInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialBinProceduralStageType>()
  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Etapa Procedimental: " />
        <Controller
          name="proceduralStage"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.proceduralStage} />
          )}
        />
      </Container>
    </>
  )
}

export default JudicialBinProceduralStageInfoForm
