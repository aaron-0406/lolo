/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useMutation, useQuery } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { AxiosError } from 'axios'
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
import { GoalApiResponse, GoalsApiResponse, deleteGoalService, getGoals } from '@/services/extrajudicial/goal.service'
import MetasModal from '../MetasModal/MetasModal'
import useModal from '@/hooks/useModal'
import { notification } from '@/ui/notification/notification'
import Progress from '@/ui/Progress/Progress'
import MetasModalView from '../MetasModalView/MetasModalView'
import { CustomErrorResponse } from 'types/customErrorResponse'

const MetasTable = () => {
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

  const { isLoading: loadingDeleteGoal, mutate: onDeleteGoal } = useMutation<
    GoalApiResponse,
    AxiosError<CustomErrorResponse>
  >(
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
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

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
                        onClick={() => {
                          handleClickButton()
                          const dia = record.startDate.split('-')
                          const fecha = `${dia[2]}-${dia[1]}-${dia[0]}`
                          setValue('goal', record)
                          setValue('goal.startDate', fecha)
                        }}
                        shape="round"
                        leadingIcon="ri-pencil-fill"
                        permission="P04-02"
                      />
                      <Button
                        loading={loadingDeleteGoal}
                        onClick={() => {
                          setValue('goal', record)
                          onDeleteGoal()
                        }}
                        display="danger"
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
    </Container>
  )
}

export default MetasTable
