import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinProceduralStageInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialBinProceduralStageType>()
  return (
    <>
      <Controller
        name="proceduralStage"
        control={control}
        render={({ field }) => (
          <TextField
            label="Etapa Procedimental: "
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.proceduralStage}
          />
        )}
      />
    </>
  )
}

export default JudicialBinProceduralStageInfoForm
