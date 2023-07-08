import Container from '../../../ui/Container/Container'
import CompanyMetasActions from './CompanyMetasActions/CompanyMetasActions'
import CompanyMetasTable from './CompanyMetasTable/CompanyMetasTable'
import { useForm, FormProvider } from 'react-hook-form'
import { GoalFormType } from './hookform.type'
import { useLoloContext } from '../../../shared/contexts/LoloProvider'

const CompanyMetas = () => {
  
  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()
  const formMethods = useForm<GoalFormType>({
    defaultValues: {
      goals: [],
      goal: {
        id: 0,
        createdAt: new Date(),
        customerId: id,
        endDate: new Date(),
        startDate: new Date(),
        week: 0,
      },
      loading: true,
      quantity: 0,
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="100%" display="flex" flexDirection="column" padding="15px" gap="30px">
        <CompanyMetasActions />
        <CompanyMetasTable />
      </Container>
    </FormProvider>
  )
}

export default CompanyMetas
