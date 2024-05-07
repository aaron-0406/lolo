import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import { Opts } from '@/ui/Pagination/interfaces'
import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import { KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE } from './utils/judicial-bin-type-binnacle.cache'
import { getJudicialBinTypeBinnacleByCHB } from '@/services/judicial/judicial-bin-type-binnacle.service'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { binTypeBinnaclesColumns } from './utils/columns'
import moment from 'moment'
import Button from '@/ui/Button'
import DeleteJudicialBinTypeBinnacleModal from '../Modals/DeleteJudicialBinTypeBinnacleModal'
import JudicialBinTypeBinnacleModal from '../Modals/JudicialBinTypeBinnacleModal/JudicialBinTypeBinnacleModal'
import EmptyState from '@/ui/EmptyState'

type JudicialBinTypeBinnacleTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialBinTypeBinnacleTable = ({ opts, setOpts }: JudicialBinTypeBinnacleTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [binTypeBinnaleId, setBinTypeBinnacleId] = useState<number>(0)
  const [idDeletedJudicialBinTypeBinnacle, setIdDeletedJudicialBinTypeBinnacle] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteJudicialBinTypeBinnacle,
    showModal: showDeleteJudicialBinTypeBinnacle,
    hideModal: hideDeleteJudicialBinTypeBinnacle,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setBinTypeBinnacleId(id)
    showModalEdit()
  }

  const handleClickDeleteJudicialBinTypeBinnacle = (id: number) => {
    setIdDeletedJudicialBinTypeBinnacle(id)
    showDeleteJudicialBinTypeBinnacle()
  }

  const onCloseDeleteJudicialBinTypeBinnacle = () => {
    setIdDeletedJudicialBinTypeBinnacle(0)
    hideDeleteJudicialBinTypeBinnacle()
  }

  const onCloseModal = () => {
    setBinTypeBinnacleId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery(
    [KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialBinTypeBinnacleByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialBinTypeBinnacleType) => {
      return filt.typeBinnacle.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }

  const binTypeBinnacles = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={binTypeBinnacles.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={binTypeBinnaclesColumns}
        loading={isLoading}
        isArrayEmpty={!binTypeBinnacles.length}
        emptyState={
          <EmptyStateCell colSpan={binTypeBinnaclesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron tipos de bitacora disponibles, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState = {
          <EmptyStateCell colSpan={binTypeBinnaclesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontró el la bitacora solicitada"
            />
          </EmptyStateCell>
        }
      >
        {!!binTypeBinnacles?.length &&
          binTypeBinnacles.map((record: JudicialBinTypeBinnacleType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.typeBinnacle || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Negociación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P09-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteJudicialBinTypeBinnacle(record.id)
                        }}
                        messageTooltip="Eliminar Negociación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P09-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteJudicialBinTypeBinnacleModal
        visible={visibleDeleteJudicialBinTypeBinnacle}
        onClose={onCloseDeleteJudicialBinTypeBinnacle}
        idBinTypeBinnacle={idDeletedJudicialBinTypeBinnacle}
      />
      <JudicialBinTypeBinnacleModal
        visible={visibleModalEdit}
        onClose={onCloseModal}
        idBinTypeBinnacle={binTypeBinnaleId}
        isEdit
      />
    </Container>
  )
}

export default JudicialBinTypeBinnacleTable
