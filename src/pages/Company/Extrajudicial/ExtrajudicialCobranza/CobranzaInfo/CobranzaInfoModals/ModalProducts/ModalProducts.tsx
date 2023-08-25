import { ProductFormType } from './hookforms.interfaces'
import { useForm, FormProvider } from 'react-hook-form'
import { ModalProductsResolver } from './ModalProducts.yup'
import { useLoloContext } from '@/contexts/LoloProvider'
import Container from '@/ui/Container'
import ModalProductsActions from './ModalProductsActions'
import ModalProductsInfo from './ModalProductsInfo'
import ModalProductsTable from './ModalProductsTable'

type ModalAddressesProps = {
  clientCode: string
}

const ModalProducts: React.FC<ModalAddressesProps> = ({ clientCode }) => {
  const {
    client: {
      customer: { id: customerId },
    },
  } = useLoloContext()

  const formMethods = useForm<ProductFormType>({
    resolver: ModalProductsResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      clientCode: clientCode,
      code: '',
      customerId: customerId,
      name: '',
      products: [],
      state: '',
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%">
        <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="20px">
          <ModalProductsActions />

          <ModalProductsInfo />

          <ModalProductsTable />
        </Container>
      </Container>
    </FormProvider>
  )
}

export default ModalProducts
