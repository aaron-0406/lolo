import { useForm, FormProvider } from 'react-hook-form'
import moment from 'moment'
import Container from '@/ui/Container/Container'
import MetasActions from './MetasActions/MetasActions'
import MetasTable from './MetasTable/MetasTable'
import { GoalFormType } from './hookform.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ExtrajudicialGoalResolver } from './ExtrajudicialMetas.yup'

const ExtrajudicialMetas = () => {
  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()
  const formMethods = useForm<GoalFormType>({
    resolver: ExtrajudicialGoalResolver,
    defaultValues: {
      goals: [],
      goal: {
        id: 0,
        createdAt: moment(new Date()).format('DD-MM-YYYY'),
        customerId: id,
        endDate: moment(new Date()).format('DD-MM-YYYY'),
        startDate: moment(new Date()).format('DD-MM-YYYY'),
        week: 0,
      },
      goalUsers: [],
      loading: true,
      quantity: 0,
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="100%" display="flex" flexDirection="column" padding="20px" gap="30px">
        <MetasActions />
        <MetasTable />
      </Container>
    </FormProvider>
  )
}

export default ExtrajudicialMetas
