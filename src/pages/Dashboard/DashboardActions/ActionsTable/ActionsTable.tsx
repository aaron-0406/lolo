import { Dispatch, FC, useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { Opts } from '@/ui/Pagination/interfaces'
import { ManagementActionType } from '@/types/dash/management-action.type'
import useModal from '@/hooks/useModal'
import {
  getAllManagementActionsByCHB,
  getAllManagementActionsByCHBPaginated,
} from '@/services/dash/management-action.service'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import ActionsModal from '../Modals/ActionsModal/ActionsModal'
import { actionsColumns } from './utils/columns'
import DeleteActionsModal from '../Modals/DeleteActionsModal'
import dashAccionesCache, { KEY_DASH_ACCIONES_CACHE } from './utils/dash-acciones.cache'

type ActionsTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const ActionsTable: FC<ActionsTableProps> = ({ opts, setOpts, selectedBank: { chb } }) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedAction, setIdDeletedAction] = useState<number>(0)

  // const queryClient = useQueryClient()
  // const {
  //   data: page
  // } = dashAccionesCache(queryClient)

  const { visible: visibleModalAction, showModal: showModalAction, hideModal: hideModalAction } = useModal()
  const { visible: visibleDeleteAction, showModal: showDeleteAction, hideModal: hideDeleteAction } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdEdit(id)
    showModalAction()
  }
  const handleClickDeleteUser = (id: number) => {
    setIdDeletedAction(id)
    showDeleteAction()
  }
  const onCloseDeleteAction = () => {
    setIdDeletedAction(0)
    hideDeleteAction()
  }

  const onCloseModal = () => {
    setIdEdit(0)
    hideModalAction()
  }

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [KEY_DASH_ACCIONES_CACHE, `${chb}, ${opts.limit}`],
    async ({ pageParam = 1 }) => {
      return await getAllManagementActionsByCHBPaginated(String(chb), pageParam, opts.limit)
    },
    {
      getNextPageParam: (lastPage) => {
        const nextPage = opts.page
        return opts.page <= lastPage.data?.numberPages ? nextPage : undefined
      },
      refetchOnMount: false,
      enabled: chb !== 0,
    }
  )

  const actions = data?.pages[0].data
  console.log(data?.pages)
  // console.log(page)

  useEffect(() => {
    if (chb !== 0) {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }, [opts.page])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={actions?.quantity} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={actionsColumns}
        loading={isLoading}
        isArrayEmpty={!actions?.data?.length}
        emptyState={
          <EmptyStateCell colSpan={actionsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!actions?.data?.length &&
          actions?.data.map((record: ManagementActionType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.codeAction || ''}`}</BodyCell>
                <BodyCell>{`${record.nameAction || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.codeSubTypeManagement || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar acción"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteUser(record.id)
                        }}
                        messageTooltip={'Eliminar acción'}
                        shape="round"
                        size="small"
                        leadingIcon={'ri-delete-bin-line'}
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <ActionsModal visible={visibleModalAction} onClose={onCloseModal} idAction={idEdit} chb={chb} isEdit />
      <DeleteActionsModal
        visible={visibleDeleteAction}
        onClose={onCloseDeleteAction}
        chb={chb}
        idAction={idDeletedAction}
      />
    </Container>
  )
}

export default ActionsTable
