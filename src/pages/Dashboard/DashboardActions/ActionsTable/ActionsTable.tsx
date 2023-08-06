import React, { Dispatch, FC, useEffect, useState } from 'react'
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
import ActionsModal from '../ActionsModal/ActionsModal'
import { actionsColumns } from './utils/columns'

type ActionsTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  loading: boolean
  setLoadingGlobal: (state: boolean) => void
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const ActionsTable: FC<ActionsTableProps> = ({
  opts,
  setOpts,
  loading,
  setLoadingGlobal,
  selectedBank: { chb, setChb },
}) => {
  const [actions, setActions] = useState<Array<ManagementActionType>>([])
  const [idEdit, setIdEdit] = useState(0)
  const [actionsCount, setActionsCount] = useState<number>(0)

  const { visible: visibleModalAction, showModal: showModalAction, hideModal: hideModalAction } = useModal()

  const onCloseModal = () => {
    setIdEdit(0)
    hideModalAction()
  }

  const { refetch } = useQuery(
    'get-actions-all',
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
        setLoadingGlobal(false)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    if (loading) refetch()
  }, [refetch, loading, opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={actionsCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={actionsColumns}
        loading={loading}
        isArrayEmpty={!actions.length}
        emptyState={
          <EmptyStateCell colSpan={actionsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!actions?.length &&
          actions.map((record: ManagementActionType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                <BodyCell>{`${record.codeAction || ''}`}</BodyCell>
                <BodyCell>{`${record.nameAction || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.codeSubTypeManagement || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>

      <ActionsModal
        visible={visibleModalAction}
        onClose={onCloseModal}
        setLoadingGlobal={setLoadingGlobal}
        idAction={idEdit}
        isEdit
        chb={chb}
      />
    </Container>
  )
}

export default ActionsTable
