/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useFormContext } from 'react-hook-form'
import Button from '@/ui/Button/Button'
import Container from '@/ui/Container/Container'
import Pagination from '@/ui/Pagination/Pagination'
import BodyCell from '@/ui/Table/BodyCell/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell/EmptyStateCell'
import Table from '@/ui/Table/Table'
import { GoalFormType } from '../hookform.type'
import { Opts } from '@/ui/Pagination/interfaces'
import { goalsColumns } from './utils/columns'
import { GoalType } from '@/types/extrajudicial/goal.type'
import { GoalsApiResponse, getGoals } from '@/services/extrajudicial/goal.service'
import MetasModal from '../MetasModal/MetasModal'
import useModal from '@/hooks/useModal'
import Progress from '@/ui/Progress/Progress'
import MetasModalView from '../MetasModalView/MetasModalView'
import DeleteMetaModal from './DeleteMetaModal'

const MetasTable = () => {
  const { watch, setValue } = useFormContext<GoalFormType>()
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  const { visible: visibleModalView, showModal: showModalView, hideModal: hideModalView } = useModal()
  const { visible: visibleModalDelete, showModal: showModalDelete, hideModal: hideModalDelete } = useModal()

  const handleClickButton = () => {
    showModalAdd()
  }
  const handleClickProgress = () => {
    showModalView()
  }
  const handleClickModal = () => {
    hideModalAdd()
  }

  const handleClickModalView = () => {
    hideModalView()
  }

  const { refetch } = useQuery<GoalsApiResponse>(
    'get-goals-all',
    async () => {
      return await getGoals({
        limit: opts.limit,
        page: opts.page,
      })
    },
    {
      onSuccess: ({ data }) => {
        setValue('goals', data.goals)
        setValue('quantity', data.quantity)
        setValue('loading', false)
      },
    }
  )

  const handleClickDeleteGoal = (data: GoalType) => {
    setValue('goal', data)
    showModalDelete()
  }

  useEffect(() => {
    refetch()
  }, [opts])

  return (
    <Container width="100%" height="calc(100% - 78px)">
      <Pagination count={watch('goals').length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={goalsColumns}
        loading={watch('loading')}
        isArrayEmpty={!watch('goals').length}
        emptyState={
          <EmptyStateCell colSpan={goalsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!watch('goals')?.length &&
          watch('goals').map((record: GoalType, i) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${i + 1}`}</BodyCell>
                <BodyCell>{`${record.name || '-'}`}</BodyCell>
                <BodyCell>{`${moment(record.startDate).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell>{`${moment(record.endDate).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell>{`${record.totalMeta}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container onClick={() => {}} width="100%" display="flex" justifyContent="center">
                    <Progress
                      value={
                        record.totalMeta === 0
                          ? 0
                          : Number(((Number(record.total) * 100) / Number(record.totalMeta)).toFixed(2)) >= 100
                          ? 100
                          : Number(((Number(record.total) * 100) / Number(record.totalMeta)).toFixed(2))
                      }
                      bgColorInit="#FF7875"
                      bgColorEnd="#51AB2B"
                      bgColorMid="#F3BD5B"
                    />
                  </Container>
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" justifyContent="center" gap="15px">
                      <Button
                        onClick={() => {
                          setValue('goal', record)
                          handleClickProgress()
                        }}
                        shape="round"
                        messageTooltip="Ver resultados"
                        leadingIcon="ri-eye-line"
                        permission=""
                      />
                      <Button
                        onClick={() => {
                          handleClickButton()
                          const dia = record.startDate.split('-')
                          const fecha = `${dia[2]}-${dia[1]}-${dia[0]}`
                          setValue('goal', record)
                          setValue('goal.startDate', fecha)
                        }}
                        messageTooltip="Actualizar meta"
                        shape="round"
                        leadingIcon="ri-pencil-fill"
                        permission="P04-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteGoal(record)
                        }}
                        display="danger"
                        messageTooltip="Eliminar meta"
                        shape="round"
                        leadingIcon="ri-delete-bin-line"
                        permission="P04-03"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <MetasModal visible={visibleModalAdd} onClose={handleClickModal} />
      <MetasModalView visible={visibleModalView} onClose={handleClickModalView} />
      <DeleteMetaModal visible={visibleModalDelete} onClose={hideModalDelete} />
    </Container>
  )
}

export default MetasTable
