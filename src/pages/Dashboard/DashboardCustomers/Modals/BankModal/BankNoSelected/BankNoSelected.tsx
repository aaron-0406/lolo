import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { useDashContext } from '@/contexts/DashProvider'
import { banksNoSelectColumns } from './utils/columnsNoSelect'
import Table from '@/ui/Table'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { KEY_DASH_BANKS_CACHE } from './utils/dash-banks.cache'
import { getAllBanks } from '@/services/dash/bank.service'
import { BankType } from '@/types/dash/bank.type'
import { SelectedElementType } from '../bankModal.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { KEY_DASH_CUSTOMER_BANK_CACHE } from '../BankSelected/utils/dash-customer-banks.cache'
import BankModalEdit from './BankModals/BankModalEdit'
import BankModalDelete from './BankModals/BankModalDelete'
import useModal from '../../../../../../shared/hooks/useModal'

type BankNoSelectedProps = {
  setGlobalElement: (element: SelectedElementType) => void
}

const BankNoSelected = ({ setGlobalElement }: BankNoSelectedProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [idBank, setIdBank] = useState<number>(0)
  const [idDeletedBank, setIdDeletedBank] = useState<number>(0)

  const { visible: visibleBankEdit, showModal: showBankEdit, hideModal: hideBankEdit } = useModal()
  const { visible: visibleDeleteBank, showModal: showDeleteBank, hideModal: hideDeleteBank } = useModal()

  const { data: dataBanks, isLoading } = useQuery<AxiosResponse<Array<BankType>, Error>>(
    KEY_DASH_BANKS_CACHE,
    async () => {
      return await getAllBanks()
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { data: dataCHBs } = useQuery([KEY_DASH_CUSTOMER_BANK_CACHE, selectedCustomer.id], () =>
    queryClient.getQueryData([KEY_DASH_CUSTOMER_BANK_CACHE, selectedCustomer.id])
  )

  const chbs = dataCHBs as AxiosResponse<CustomerHasBankType[]>
  const banks = dataBanks?.data.filter((bank: BankType) => !chbs?.data.some((cb) => cb.idBank === bank.id)) ?? []

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const handleClickEdit = (idBank: number) => {
    setIdBank(idBank)
    showBankEdit()
  }

  const handleClickDelete = (idBank: number) => {
    setIdDeletedBank(idBank)
    showDeleteBank()
  }

  const onCloseDeleteBank = () => {
    setIdDeletedBank(0)
    hideDeleteBank()
  }

  const onHandleClick = (element: SelectedElementType) => {
    setGlobalElement(element)
  }

  const onCloseModal = () => {
    hideBankEdit()
  }

  return (
    <Container width={greaterThanMobile ? '49%' : '100%'}>
      <Table
        top={greaterThanMobile ? '280px' : '410px'}
        columns={banksNoSelectColumns}
        loading={isLoading}
        isArrayEmpty={!banks.length}
        emptyState={
          <EmptyStateCell colSpan={banksNoSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!banks.length &&
          banks.map((record: BankType, key: number) => {
            return (
              <tr
                className="styled-data-table-row"
                key={key}
                onClick={() => {
                  onHandleClick({ bank: record, key: 'BNS' })
                }}
              >
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
                <BodyCell>
                  <Container width="100%" textAlign="center" display="flex" justifyContent="space-around">
                    <Button
                      onClick={() => {
                        handleClickEdit(record.id)
                      }}
                      messageTooltip="Editar Banco"
                      shape="round"
                      size="small"
                      leadingIcon="ri-pencil-fill"
                    />
                    <Button
                      onClick={() => {
                        handleClickDelete(record.id)
                      }}
                      messageTooltip="Eliminar Banco"
                      shape="round"
                      size="small"
                      leadingIcon="ri-delete-bin-line"
                    />
                  </Container>
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <Container display="flex" justifyContent="space-between" padding="10px">
        <TextField onChange={onHandleChange} width="100%" placeholder="Agregar Banco: " />
        <Button size="small" shape="round" trailingIcon="ri-add-fill" />
      </Container>

      {visibleBankEdit && (
        <BankModalEdit visible={visibleBankEdit} onClose={onCloseModal} idBank={idBank}></BankModalEdit>
      )}

      {visibleDeleteBank && (
        <BankModalDelete
          visible={visibleDeleteBank}
          onClose={onCloseDeleteBank}
          idBank={idDeletedBank}
        ></BankModalDelete>
      )}
    </Container>
  )
}

export default BankNoSelected
