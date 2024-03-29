import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useDashContext } from '@/contexts/DashProvider'
import { banksNoSelectColumns } from './utils/columnsNoSelect'
import dashBanksCache, { KEY_DASH_BANKS_CACHE } from './utils/dash-banks.cache'
import { createBank, getAllBanks } from '@/services/dash/bank.service'
import { BankType } from '@/types/dash/bank.type'
import { SelectedElementType } from '../bankModal.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useModal from '@/hooks/useModal'
import { device } from '@/breakpoints/responsive'
import { KEY_DASH_CUSTOMER_BANK_CACHE } from '../BankSelected/utils/dash-customer-banks.cache'
import BankModalEdit from './BankModals/BankModalEdit'
import BankModalDelete from './BankModals/BankModalDelete'
import { CustomerHasBankType } from '@/types/dash/customer-has-bank'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import notification from '@/ui/notification'
import Table from '@/ui/Table'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'

type BankNoSelectedProps = {
  setGlobalElement: (element: SelectedElementType) => void
  elementSelected: SelectedElementType
}

const defaultValuesBank = {
  id: 0,
  name: '',
  description: '-',
  state: true,
  createdAt: new Date(),
}

const BankNoSelected = ({ setGlobalElement, elementSelected }: BankNoSelectedProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const {
    actions: { addBankCache },
    onMutateBankCache,
    onSettledBankCache,
    onErrorBankCache,
  } = dashBanksCache(queryClient)

  const formMethods = useForm<BankType>({
    mode: 'all',
    defaultValues: defaultValuesBank,
  })

  const { getValues, setValue } = formMethods

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

  const { isLoading: loadingCreateBank, mutate: addBank } = useMutation<
    AxiosResponse<BankType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restBank } = getValues()
      return await createBank({ ...restBank })
    },
    {
      onSuccess: (result) => {
        addBankCache(result.data)
        notification({ type: 'success', message: 'Banco creado' })
      },
      onMutate: () => {
        return onMutateBankCache()
      },
      onSettled: () => {
        onSettledBankCache()
      },
      onError: (error, _, context: any) => {
        onErrorBankCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value)
  }

  const handleClickEdit = (idBank: number) => {
    setIdBank(idBank)
    showBankEdit()
  }

  const handleClickDelete = (idBank: number) => {
    setIdDeletedBank(idBank)
    showDeleteBank()
  }

  const onAddBank = () => {
    addBank()
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
    <Container width={greaterThanMobile ? '49%' : '100%'} height="100%">
      <Container height="calc(100% - 60px)">
        <Table
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
              const className =
                elementSelected.bank.id === record.id && elementSelected.key === 'BANK_NOT_SELECTED' && 'active'

              return (
                <tr
                  className={`styled-data-table-row ${className}`}
                  key={key}
                  onClick={() => {
                    onHandleClick({ bank: record, key: 'BANK_NOT_SELECTED' })
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
      </Container>

      <Container display="flex" justifyContent="space-between" gap="10px" padding="10px">
        <TextField onChange={onHandleChange} width="100%" placeholder="Agregar Banco: " />
        <Button onClick={onAddBank} size="small" shape="round" trailingIcon="ri-add-fill" loading={loadingCreateBank} />
      </Container>

      {visibleBankEdit && (
        <BankModalEdit visible={visibleBankEdit} onClose={onCloseModal} idBank={idBank}></BankModalEdit>
      )}

      {visibleDeleteBank && (
        <BankModalDelete visible={visibleDeleteBank} onClose={onCloseDeleteBank} idBank={idDeletedBank} />
      )}
    </Container>
  )
}

export default BankNoSelected
