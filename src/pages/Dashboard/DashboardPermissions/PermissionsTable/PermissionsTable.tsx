import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getAllPermissions } from '@/services/dash/permission.service'
import { PermissionType } from '@/types/dash/permission.type'
import Button from '@/ui/Button/Button'
import Container from '@/ui/Container/Container'
import BodyCell from '@/ui/Table/BodyCell/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell/EmptyStateCell'
import Table from '@/ui/Table/Table'
import PermissionModal from '../Modals/PermissionModal/PermissionModal'
import { permissionColumns } from './utils/columns'
import { KEY_DASH_PERMISOS_CACHE } from './utils/dash-permisos.cache'
import useModal from '@/hooks/useModal'
import Icon from '@/ui/Icon/Icon'
import DeletePermissionModal from '../Modals/DeletePermissionModal/DeletePermissionModal'
import Text from '@/ui/Text/Text'
import { notification } from '@/ui/notification/notification'

const PermissionsTable = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code') ?? ''

  const [permissionId, setPermissionId] = useState<number>(0)
  const [idDeletedPermission, setIdDeletedPermission] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeletePermission,
    showModal: showDeletePermission,
    hideModal: hideDeletePermission,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setPermissionId(id)
    showModalEdit()
  }

  const handleClickDeletePermission = (id: number) => {
    setIdDeletedPermission(id)
    showDeletePermission()
  }

  const onCloseDeletePermission = () => {
    setIdDeletedPermission(0)
    hideDeletePermission()
  }

  const onCloseModal = () => {
    setPermissionId(0)
    hideModalEdit()
  }

  const onClickCell = (permission: PermissionType) => {
    navigate(`/dash/permisos?code=${permission.code}`)
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<PermissionType>>>(
    [KEY_DASH_PERMISOS_CACHE, code],
    async () => {
      return await getAllPermissions(code === null ? '' : code)
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

  const permissions = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 50px)" padding="20px">
      <Table
        top="240px"
        columns={permissionColumns}
        loading={isLoading}
        isArrayEmpty={!permissions.length}
        emptyState={
          <EmptyStateCell colSpan={permissionColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!permissions?.length &&
          permissions.map((record: PermissionType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">
                  <Icon remixClass={record.icon} color="Primary5"></Icon>
                </BodyCell>
                <BodyCell textAlign="left">{`${record.name || ''}`}</BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="bold" color="Primary5">{`${record.link || ''}`}</Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold">
                    {`${record.code || ''}`}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          onClickCell(record)
                        }}
                        messageTooltip="Ver Subpermisos"
                        shape="round"
                        size="small"
                        leadingIcon="ri-eye-line"
                      />

                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Permiso"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                      />

                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeletePermission(record.id)
                        }}
                        messageTooltip="Eliminar Permiso"
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

      <DeletePermissionModal
        visible={visibleDeletePermission}
        onClose={onCloseDeletePermission}
        idPermission={idDeletedPermission}
      />

      {visibleModalEdit && (
        <PermissionModal visible={visibleModalEdit} onClose={onCloseModal} idPermission={permissionId} />
      )}
    </Container>
  )
}

export default PermissionsTable
