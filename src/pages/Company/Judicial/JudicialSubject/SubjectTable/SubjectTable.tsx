import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { subjectColumns } from './utils/columns'
import Button from '@/ui/Button'
import SubjectModal from '../Modals/SubjectModal'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_JUDICIAL_SUBJECT_CACHE } from './utils/judicial-subject.cache'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import DeleteSubjectModal from '../Modals/DeleteSubjectModal'
import EmptyState from '@/ui/EmptyState'

type SubjectTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const SubjectTable = ({ opts, setOpts }: SubjectTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [negotiationId, setSubjectId] = useState<number>(0)
  const [idDeletedSubject, setIdDeletedSubject] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const { visible: visibleDeleteSubject, showModal: showDeleteSubject, hideModal: hideDeleteSubject } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setSubjectId(id)
    showModalEdit()
  }

  const handleClickDeleteSubject = (id: number) => {
    setIdDeletedSubject(id)
    showDeleteSubject()
  }

  const onCloseDeleteSubject = () => {
    setIdDeletedSubject(0)
    hideDeleteSubject()
  }

  const onCloseModal = () => {
    setSubjectId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery([KEY_JUDICIAL_SUBJECT_CACHE, parseInt(chb.length ? chb : '0')], async () => {
    return await getSubjectByCHB(parseInt(chb.length ? chb : '0'))
  })

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialSubjectType) => {
      return filt.subject.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const subjects = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={subjects.length} opts={opts} setOpts={setOpts} />
      <Table
        top="230px"
        columns={subjectColumns}
        loading={isLoading}
        isArrayEmpty={!subjects.length}
        emptyState={
          <EmptyStateCell colSpan={subjectColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron materias, por favor seleccione otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={subjectColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron materias" />
          </EmptyStateCell>
        }
      >
        {!!subjects?.length &&
          subjects.map((record: JudicialSubjectType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.subject || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Materia"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P21-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteSubject(record.id)
                        }}
                        messageTooltip="Eliminar Materia"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P21-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteSubjectModal visible={visibleDeleteSubject} onClose={onCloseDeleteSubject} idSubject={idDeletedSubject} />
      <SubjectModal visible={visibleModalEdit} onClose={onCloseModal} idSubject={negotiationId} isEdit />
    </Container>
  )
}

export default SubjectTable
