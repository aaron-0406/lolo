import { Dispatch, FC, useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { Opts } from '@/ui/Pagination/interfaces'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import useModal from '@/hooks/useModal'
import { getAllFuncionariosByCHB } from '@/services/extrajudicial/funcionario.service'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import FuncionariosModal from '../Modals/FuncionariosModal'
import { funcionariosColumns } from './utils/columns'
import DeleteFuncionariosModal from '../Modals/DeleteFuncionariosModal'
import { KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE } from './utils/ext-funcionarios.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type FuncionariosTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const FuncionariosTable: FC<FuncionariosTableProps> = ({ opts, setOpts }) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idFuncionario, setIdFuncionario] = useState<number>(0)
  const [idDeletedFuncionario, setIdDeletedFuncionario] = useState<number>(0)

  const {
    visible: visibleModalFuncionario,
    showModal: showModalFuncionario,
    hideModal: hideModalFuncionario,
  } = useModal()
  const {
    visible: visibleDeleteFuncionario,
    showModal: showDeleteFuncionario,
    hideModal: hideDeleteFuncionario,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdFuncionario(id)
    showModalFuncionario()
  }

  const handleClickDeleteUser = (id: number) => {
    setIdDeletedFuncionario(id)
    showDeleteFuncionario()
  }

  const onCloseDeleteFuncionario = () => {
    setIdDeletedFuncionario(0)
    hideDeleteFuncionario()
  }

  const onCloseModal = () => {
    setIdFuncionario(0)
    hideModalFuncionario()
  }

  const { isLoading, data } = useQuery(
    [KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllFuncionariosByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: FuncionarioType) => {
      return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const funcionarios = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={funcionarios.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={funcionariosColumns}
        loading={isLoading}
        isArrayEmpty={!funcionarios.length}
        emptyState={
          <EmptyStateCell colSpan={funcionariosColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!funcionarios?.length &&
          funcionarios.map((record: FuncionarioType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Funcionairo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P08-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteUser(record.id)
                        }}
                        messageTooltip="Eliminar Funcionario"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P08-03"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <FuncionariosModal
        visible={visibleModalFuncionario}
        onClose={onCloseModal}
        idFuncionario={idFuncionario}
        isEdit
      />
      <DeleteFuncionariosModal
        visible={visibleDeleteFuncionario}
        onClose={onCloseDeleteFuncionario}
        idAction={idDeletedFuncionario}
      />
    </Container>
  )
}

export default FuncionariosTable
