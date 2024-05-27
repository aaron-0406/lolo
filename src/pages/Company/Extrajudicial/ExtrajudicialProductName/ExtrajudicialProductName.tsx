import Container from '@/ui/Container'
import ProductNameActions from './ProductNameActions'
import ProductNameTable from './ProductNameTable'

const ExtrajudicialProductName = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <ProductNameActions />
      <ProductNameTable />
    </Container>
  )
}

export default ExtrajudicialProductName
