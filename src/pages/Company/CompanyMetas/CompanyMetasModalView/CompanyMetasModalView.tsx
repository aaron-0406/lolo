/* eslint-disable react-hooks/exhaustive-deps */
import { useFormContext } from 'react-hook-form'
import Container from '../../../../ui/Container/Container'
import Modal from '../../../../ui/Modal/Modal'
import TextField from '../../../../ui/fields/TextField/TextField'
import { GoalFormType } from '../hookform.type'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import {
  GoalApiResponse,
  GoalCustomerUserResponse,
  getCustomerUserGoals,
  updateCustomerUserGoals,
} from '../../../../shared/services/goal.service'
import Progress from '../../../../ui/Progress/Progress'
import Text from '../../../../ui/Text/Text'
import moment from 'moment'
import Button from '../../../../ui/Button/Button'
import { notification } from '../../../../ui/notification/notification'

type PModalAddGoal = {
  visible: boolean
  onClose: () => void
}

const CompanyMetasModalView = ({ onClose, visible }: PModalAddGoal) => {
  const handleClickCloseModal = () => {
    onClose()
  }
  const { watch, setValue } = useFormContext<GoalFormType>()

  const { mutate: getGoalsCustomers } = useMutation<GoalCustomerUserResponse>(
    async () => {
      return await getCustomerUserGoals(watch('goal').id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('goalUsers', data)
      },
    }
  )
  const { mutate: onUpdateGoalUsers } = useMutation<GoalApiResponse>(
    async () => {
      return await updateCustomerUserGoals(watch('goal').id, watch('goalUsers'))
    },
    {
      onSuccess: ({ data }) => {
        notification({ type: 'success', message: 'Metas actualizadas' })
        setValue(
          'goals',
          watch('goals').map((item) => {
            if (item.id === data.id) return data
            return item
          })
        )
        handleClickCloseModal()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
        handleClickCloseModal()
      },
    }
  )

  useEffect(() => {
    if (watch('goal.id') !== 0) getGoalsCustomers()
    return () => {}
  }, [watch('goal.id')])

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-goal-view"
      title="Metas de los usuarios"
      contentOverflowY="auto"
      footer={
        <Container width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              onUpdateGoalUsers()
            }}
            leadingIcon="ri-save-line"
            label="Guardar"
          />
        </Container>
      }
    >
      <Container width="100%" height="100%" display="flex" flexDirection="column" padding="20px" gap="30px">
        <Container width="100%" display="flex" flexDirection="column" gap="25px">
          {watch('goalUsers').map((goalUser, key) => {
            return (
              <Container
                key={key}
                width="100%"
                display="flex"
                gap="10px"
                justifyContent="space-around"
                alignItems="center"
              >
                <Container width="33%">{`${goalUser.customerUser.name} ${goalUser.customerUser.lastName}`}</Container>
                <Container>{goalUser.totalRealizados} de</Container>
                <TextField
                  width="70px"
                  value={goalUser.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(
                      'goalUsers',
                      watch('goalUsers').map((item) => {
                        if (item.id === goalUser.id) return { ...item, quantity: Number(e.target.value) }
                        return item
                      })
                    )
                  }}
                />
                <Container width="40%">
                  <Progress
                    value={
                      goalUser.quantity === 0
                        ? 0
                        : Number(((Number(goalUser.totalRealizados) * 100) / Number(goalUser.quantity)).toFixed(2)) >=
                          100
                        ? 100
                        : Number(((Number(goalUser.totalRealizados) * 100) / Number(goalUser.quantity)).toFixed(2))
                    }
                    bgColorInit="#FF7875"
                    bgColorEnd="#51AB2B"
                    bgColorMid="#F3BD5B"
                  />
                </Container>
              </Container>
            )
          })}
        </Container>
        <Container display="flex" gap="10px">
          <Container width="9rem">
            <Text.Body size="m" weight="bold">
              Fecha Inicio:
            </Text.Body>
          </Container>
          <Text.Body size="m" weight="bold">
            {`${moment(watch('goal.startDate')).format('DD-MM-YYYY') || ''}`}
          </Text.Body>
        </Container>
        <Container display="flex" gap="10px">
          <Container width="9rem">
            <Text.Body size="m" weight="bold">
              Fecha Fin:
            </Text.Body>
          </Container>
          <Text.Body size="m" weight="bold">
            {`${moment(watch('goal.endDate')).format('DD-MM-YYYY') || ''}`}
          </Text.Body>
        </Container>
      </Container>
    </Modal>
  )
}

export default CompanyMetasModalView
