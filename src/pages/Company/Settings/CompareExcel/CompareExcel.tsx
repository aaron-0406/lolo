import Container from '@/ui/Container'
import CompareExcelInfo from './CompareExcelInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { CompareResponse } from '@/types/config/compare-excels.type'

const CompareExcel = () => {

  const formMethods = useForm<{
    prevFile: File | undefined,
    newFile: File | undefined
    resultFile: CompareResponse | undefined
  }>({
    defaultValues: {
      prevFile: undefined,
      newFile: undefined,
      resultFile: undefined
    }
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="100%" display='flex' justifyContent='center' alignItems='center'>
        <CompareExcelInfo />
      </Container> 
    </FormProvider>
  )
}

export default CompareExcel