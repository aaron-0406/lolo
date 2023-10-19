import { useState } from 'react'
import { useQuery } from 'react-query'
import RolesModal from '../Modals/RolesModal'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button/Button'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import { RoleType } from '@/types/dash/role.type'
import { roleColumns } from './utils/columns'
import { KEY_EXT_ROLES_CACHE } from './utils/ext-role.cache'
import { getAllRolesByCustomerId } from '@/services/dash/role.service'
import useModal from '@/hooks/useModal'
import DeleteRoleModal from '../Modals/DeleteRoleModal/DeleteRoleModal'
import notification from '@/ui/notification'
import { useLoloContext } from '@/contexts/LoloProvider'

const RolesTable = () => {
  const [roleId, setRoleId] = useState<number>(0)
  const [idDeletedRole, setIdDeletedRole] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const { visible: visibleDeleteRole, showModal: showDeleteRole, hideModal: hideDeleteRole } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setRoleId(id)
    showModalEdit()
  }

  const handleClickDeleteRole = (id: number) => {
    setIdDeletedRole(id)
    showDeleteRole()
  }

  const onCloseDeleteRole = () => {
    setIdDeletedRole(0)
    hideDeleteRole()
  }

  const onCloseModal = () => {
    setRoleId(0)
    hideModalEdit()
  }

  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()

  const { data, isLoading } = useQuery(
    [KEY_EXT_ROLES_CACHE, id],
    async () => {
      return await getAllRolesByCustomerId(id)
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

  const roles = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 50px)" padding="20px">
      <Table
        top="240px"
        columns={roleColumns}
        loading={isLoading}
        isArrayEmpty={!roles.length}
        emptyState={
          <EmptyStateCell colSpan={roleColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!roles?.length &&
          roles.map((record: RoleType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Rol"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P11-02"
                      />

                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteRole(record.id)
                        }}
                        messageTooltip="Eliminar Rol"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P11-03"
                        display='danger'
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteRoleModal visible={visibleDeleteRole} onClose={onCloseDeleteRole} idRole={idDeletedRole} />
      <RolesModal visible={visibleModalEdit} onClose={onCloseModal} idRole={roleId} />
    </Container>
  )
}

export default RolesTable
