import { Dispatch, FC, useState } from 'react'
import { Opts } from '../../../../ui/Pagination/interfaces'
import { FuncionarioType } from '../../../../shared/types/dash/funcionario.type'
import useModal from '../../../../shared/hooks/useModal'
import { useQuery } from 'react-query'
import { getAllFuncionariosByCHB } from '../../../../shared/services/dash/funcionario.service'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import Table from '../../../../ui/Table'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import Button from '../../../../ui/Button'
import FuncionariosModal from '../Modals/FuncionariosModal'
import { funcionariosColumns } from './utils/columns'
import moment from 'moment'
import DeleteFuncionariosModal from '../Modals/DeleteFuncionariosModal'
import { KEY_DASH_FUNCIONARIOS_CACHE } from './utils/dash-funcionarios.cache'

type FuncionariosTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const FuncionariosTable: FC<FuncionariosTableProps> = ({ opts, setOpts, selectedBank: { chb } }) => {
  const [funcionarios, setFuncionarios] = useState<Array<FuncionarioType>>([])
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

  const { isLoading } = useQuery(
    [KEY_DASH_FUNCIONARIOS_CACHE, chb],
    async () => {
      return await getAllFuncionariosByCHB(chb)
    },
    {
      onSuccess: ({ data }) => {
        if (opts.filter !== '') {
          data = data.filter((filt: FuncionarioType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setFuncionarios(data)
      },
    }
  )

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
          funcionarios.map((record: FuncionarioType, key) => {
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
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteUser(record.id)
                        }}
                        messageTooltip="Eliminar Funcionario"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
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
        chb={chb}
        isEdit
      />
      <DeleteFuncionariosModal
        visible={visibleDeleteFuncionario}
        onClose={onCloseDeleteFuncionario}
        chb={chb}
        idAction={idDeletedFuncionario}
      />
    </Container>
  )
}

export default FuncionariosTable
