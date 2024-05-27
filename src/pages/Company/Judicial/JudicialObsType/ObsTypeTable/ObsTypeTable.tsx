import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import useModal from '@/hooks/useModal'
import { getObsTypeByCHB } from '@/services/judicial/judicial-obs-type.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import ObsTypeModal from '../Modals/ObsTypeModal'
import DeleteObsTypeModal from '../Modals/DeleteObsTypeModal'
import { ObsTypeColumns } from './utils/columns'
import { KEY_JUDICIAL_OBS_TYPE_CACHE } from './utils/judicial-obs-type.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import EmptyState from '@/ui/EmptyState'

const ObsTypeTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idObsType, setIdObsType] = useState<number>(0)
  const [idDeletedObsType, setIdDeletedObsType] = useState<number>(0)

  const { visible: visibleModalObsType, showModal: showModalObsType, hideModal: hideModalObsType } = useModal()
  const { visible: visibleDeleteObsType, showModal: showDeleteObsType, hideModal: hideDeleteObsType } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdObsType(id)
    showModalObsType()
  }

  const handleClickDeleteObsType = (id: number) => {
    setIdDeletedObsType(id)
    showDeleteObsType()
  }

  const onCloseDeleteObsType = () => {
    setIdDeletedObsType(0)
    hideDeleteObsType()
  }

  const onCloseModal = () => {
    setIdObsType(0)
    hideModalObsType()
  }

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialObsTypeType>, Error>>(
    [KEY_JUDICIAL_OBS_TYPE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getObsTypeByCHB(parseInt(chb.length ? chb : '0'), true)
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

  const ObsTypes = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="200px"
        columns={ObsTypeColumns}
        loading={isLoading}
        isArrayEmpty={!ObsTypes.length}
        emptyState={
          <EmptyStateCell colSpan={ObsTypeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron tipos de observaciones disponibles, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={ObsTypeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron tipos de observaciones disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {!!ObsTypes?.length &&
          ObsTypes.map((record: JudicialObsTypeType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.type || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar tipo de observación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P23-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteObsType(record.id)
                        }}
                        messageTooltip="Eliminar tipo de observación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P23-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <ObsTypeModal visible={visibleModalObsType} onClose={onCloseModal} idObsType={idObsType} isEdit />
      <DeleteObsTypeModal visible={visibleDeleteObsType} onClose={onCloseDeleteObsType} idObsType={idDeletedObsType} />
    </Container>
  )
}

export default ObsTypeTable
