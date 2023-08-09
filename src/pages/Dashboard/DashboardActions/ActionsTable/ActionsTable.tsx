import { Dispatch, FC, useState } from 'react'
import { Opts } from '../../../../ui/Pagination/interfaces'
import { ManagementActionType } from '../../../../shared/types/management-action.type'
import useModal from '../../../../shared/hooks/useModal'
import { useQuery } from 'react-query'
import { getAllManagementActionsByCHB } from '../../../../shared/services/management-action.service'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import Table from '../../../../ui/Tables/Table'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import Button from '../../../../ui/Button'
import ActionsModal from '../Modals/ActionsModal/ActionsModal'
import { actionsColumns } from './utils/columns'
import DeleteActionsModal from '../Modals/DeleteActionsModal'
import { KEY_DASH_ACCIONES_CACHE } from './utils/dash-acciones.cache'

type ActionsTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const ActionsTable: FC<ActionsTableProps> = ({ opts, setOpts, selectedBank: { chb } }) => {
  const [actions, setActions] = useState<Array<ManagementActionType>>([])
  const [idEdit, setIdEdit] = useState<number>(0)
  const [actionsCount, setActionsCount] = useState<number>(0)
  const [idDeletedAction, setIdDeletedAction] = useState<number>(0)

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

  const { isLoading } = useQuery(
    [KEY_DASH_ACCIONES_CACHE, chb],
    async () => {
      return await getAllManagementActionsByCHB(String(chb))
    },
    {
      onSuccess: ({ data }) => {
        if (opts.filter !== '') {
          data = data.filter((filt: ManagementActionType) => {
            return filt.nameAction.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setActions(data)
        setActionsCount(data.length)
      },
    }
  )

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={actionsCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={actionsColumns}
        loading={isLoading}
        isArrayEmpty={!actions.length}
        emptyState={
          <EmptyStateCell colSpan={actionsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!actions?.length &&
          actions.map((record: ManagementActionType, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
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
