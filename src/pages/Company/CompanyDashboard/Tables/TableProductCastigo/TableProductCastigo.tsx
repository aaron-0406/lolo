import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DashFormType } from '../../Dashboard/hookform.type'
import { Columns } from './utils/columns'
import { ProductType } from '../../../../../shared/types/product.type'
import { Props } from '../Props.type'
import Container from '../../../../../ui/Container'
import Table from '../../../../../ui/Tables/Table'
import BodyCell from '../../../../../ui/Tables/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Tables/Table/EmptyStateCell'

const TableProductCastigo = ({ globalLoad }: Props) => {
  const { watch } = useFormContext<DashFormType>()
  const [products, setProducts] = useState(watch('productsCastigo'))

  useEffect(() => {
    setProducts(watch('productsCastigo'))
  }, [watch])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0">
      <Table
        top="300px"
        columns={Columns}
        loading={globalLoad}
        isArrayEmpty={!products}
        emptyState={
          <EmptyStateCell colSpan={Columns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!products?.length &&
          products.map((record: ProductType, index: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                <BodyCell>{`${record.clientCode || ''}`}</BodyCell>
                <BodyCell>{`${record.code || ''}`}</BodyCell>
                <BodyCell>{`${record.name || ''}`}</BodyCell>
                <BodyCell>{`${record.state || ''}> CASTIGO`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default TableProductCastigo