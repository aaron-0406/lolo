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
import { GoalsApiResponse, getGoals } from '../../../../shared/services/goal.service'
import { useQuery } from 'react-query'
import CompanyMetasModal from '../CompanyMetasModal/CompanyMetasModal'
import useModal from '../../../../shared/hooks/useModal'

const CompanyMetasTable = () => {
  const { watch, setValue } = useFormContext<GoalFormType>()
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const handleClickButton = () => {
    showModalAdd()
  }
  const handleClickModal = () => {
    hideModalAdd()
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
        console.log(data)
        setValue('goals', data.goals)
        setValue('quantity', data.quantity)
        setValue('loading', false)
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
                <BodyCell>{``}</BodyCell>
                <BodyCell textAlign="center">{``}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Button
                      onClick={() => {
                        handleClickButton()
                        setValue('goal', record)
                      }}
                      shape="round"
                      leadingIcon="ri-pencil-fill"
                    />
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <CompanyMetasModal visible={visibleModalAdd} onClose={handleClickModal} />
    </Container>
  )
}

export default CompanyMetasTable
