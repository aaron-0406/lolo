import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import useModal from '@/hooks/useModal'
import { getSedeByCHB } from '@/services/judicial/judicial-sede.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import EmptyState from '@/ui/EmptyState'
import SedeModal from '../Modals/SedeModal'
import DeleteSedeModal from '../Modals/DeleteSedeModal'
import { JudicialSedeColumns } from './utils/columns'
import { KEY_JUDICIAL_SEDE_CACHE } from './utils/judicial-sede.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

const SedeTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idSede, setIdSede] = useState<number>(0)
  const [idDeletedSede, setIdDeletedSede] = useState<number>(0)

  const { visible: visibleModalSede, showModal: showModalSede, hideModal: hideModalSede } = useModal()
  const { visible: visibleDeleteSede, showModal: showDeleteSede, hideModal: hideDeleteSede } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdSede(id)
    showModalSede()
  }

  const handleClickDeleteSede = (id: number) => {
    setIdDeletedSede(id)
    showDeleteSede()
  }

  const onCloseDeleteSede = () => {
    setIdDeletedSede(0)
    hideDeleteSede()
  }

  const onCloseModal = () => {
    setIdSede(0)
    hideModalSede()
  }

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialSedeType>, Error>>(
    [KEY_JUDICIAL_SEDE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getSedeByCHB(parseInt(chb.length ? chb : '0'), true)
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

  const Sedes = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialSedeColumns}
        loading={isLoading}
        isArrayEmpty={!Sedes.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialSedeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron sedes judiciales disponibles, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialSedeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron sedes judiciales disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {!!Sedes?.length &&
          Sedes.map((record: JudicialSedeType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.sede || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar sede judicial"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P28-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteSede(record.id)
                        }}
                        messageTooltip="Eliminar sede judicial"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P28-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <SedeModal visible={visibleModalSede} onClose={onCloseModal} idSede={idSede} isEdit />
      <DeleteSedeModal visible={visibleDeleteSede} onClose={onCloseDeleteSede} idSede={idDeletedSede} />
    </Container>
  )
}

export default SedeTable
