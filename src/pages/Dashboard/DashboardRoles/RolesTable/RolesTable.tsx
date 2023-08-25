import { useEffect, useState } from 'react'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import Button from '../../../../ui/Button/Button'
import Container from '../../../../ui/Container'
import Table from '../../../../ui/Table'
import Text from '../../../../ui/Text'
import Icon from '../../../../ui/Icon'
import { RoleType } from '../../../../shared/types/dash/role.type'
import { roleColumns } from './utils/columns'
import { useQuery } from 'react-query'
import { KEY_DASH_ROLES_CACHE } from './utils/dash-role.cache'
import { getAllRolesByCustomerId } from '../../../../shared/services/dash/role.service'
import { useDashContext } from '../../../../shared/contexts/DashProvider'

const RolesTable = () => {
  const [roles, setRoles] = useState<Array<RoleType>>([])
  const {
    dashCustomer: {
      selectedCustomer: { id },
    },
  } = useDashContext()

  const { isLoading, refetch } = useQuery(
    [KEY_DASH_ROLES_CACHE],
    async () => {
      return await getAllRolesByCustomerId(id)
    },
    {
      onSuccess: ({ data }) => {
        setRoles(data)
      },
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

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
          roles.map((record: RoleType, key) => {
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
                          // handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Rol"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                      />

                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          // handleClickDeleteRole(recRoleTypeord.id)
                        }}
                        messageTooltip="Eliminar Rol"
                        shape="round"
                        size="small"
                        leadingIcon="ri-user-unfollow-fill"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      {/* <DeleteRoleModaRoleTypel
    visible={visibleDeleteRole}
  RoleType  onClose={onCloseDeleteRole}
  RoleType  idRole={idRoleTypeDeletedRole}
  RoleType/>
  <RoleModaRoleTypel visible={visibleModalEdit} onClose={onCloseModal} idRole={peRoleTyroleId} /> roleColumns*/}
    </Container>
  )
}

export default RolesTable
