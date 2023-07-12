/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import Button from '../../../../ui/Button/Button'
import Container from '../../../../ui/Container/Container'
import Pagination from '../../../../ui/Pagination/Pagination'
import BodyCell from '../../../../ui/Tables/Table/BodyCell/BodyCell'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell/EmptyStateCell'
import Table from '../../../../ui/Tables/Table/Table'
import { useFormContext } from 'react-hook-form'
import { GoalFormType } from '../hookform.type'
import { Opts } from '../../../../ui/Pagination/interfaces'
import { useEffect, useState } from 'react'
import { goalsColumns } from './utils/columns'
import { GoalType } from '../../../../shared/types/goal-type'
import {
  GoalApiResponse,
  GoalsApiResponse,
  deleteGoalService,
  getGoals,
} from '../../../../shared/services/goal.service'
import { useMutation, useQuery } from 'react-query'
import CompanyMetasModal from '../CompanyMetasModal/CompanyMetasModal'
import useModal from '../../../../shared/hooks/useModal'
import { notification } from '../../../../ui/notification/notification'
import Progress from '../../../../ui/Progress/Progress'
import CompanyMetasModalView from '../CompanyMetasModalView/CompanyMetasModalView'

const CompanyMetasTable = () => {
  const { watch, setValue } = useFormContext<GoalFormType>()
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  const { visible: visibleModalView, showModal: showModalView, hideModal: hideModalView } = useModal()

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

  const { isLoading: loadingDeleteGoal, mutate: onDeleteGoal } = useMutation<GoalApiResponse, Error>(
    async () => {
      const {
        goal: { id },
      } = watch()
      return await deleteGoalService(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue(
          'goals',
          watch('goals').filter((goal) => {
            return goal.id !== data.id
          })
        )
        notification({ type: 'success', message: 'Meta eliminada' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
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
                <BodyCell>{`${moment(record.startDate).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell>{`${moment(record.endDate).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell>{`${record.totalMeta}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container onClick={() => {}} width="100%" display="flex" justifyContent="center">
                    <Progress
                      onClick={() => {
                        setValue('goal', record)
                        handleClickProgress()
                      }}
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
                        display="warning"
                        onClick={() => {
                          handleClickButton()
                          const dia = record.startDate.split('-')
                          const fecha = `${dia[2]}-${dia[1]}-${dia[0]}`
                          setValue('goal', record)
                          setValue('goal.startDate', fecha)
                        }}
                        shape="round"
                        leadingIcon="ri-pencil-fill"
                      />
                      <Button
                        loading={loadingDeleteGoal}
                        onClick={() => {
                          setValue('goal', record)
                          onDeleteGoal()
                        }}
                        display="danger"
                        shape="round"
                        leadingIcon="ri-close-line"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <CompanyMetasModal visible={visibleModalAdd} onClose={handleClickModal} />
      <CompanyMetasModalView visible={visibleModalView} onClose={handleClickModalView} />
    </Container>
  )
}

export default CompanyMetasTable
