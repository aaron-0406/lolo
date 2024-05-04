import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinDefendantProceduralActionInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialBinDefendantProceduralActionType>()
  return (
    <>
      <Controller
        name="defendantProceduralAction"
        control={control}
        render={({ field }) => (
          <TextField
            label="Actuación procesal demandada: "
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.defendantProceduralAction}
          />
        )}
      />
    </>
  )
}

export default JudicialBinDefendantProceduralActionInfoForm
