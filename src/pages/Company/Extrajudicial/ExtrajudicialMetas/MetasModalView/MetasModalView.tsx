/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useFormContext } from 'react-hook-form'
import moment from 'moment'
import { AxiosError } from 'axios'
import Container from '@/ui/Container/Container'
import Modal from '@/ui/Modal/Modal'
import TextField from '@/ui/fields/TextField/TextField'
import { GoalFormType } from '../hookform.type'
import {
  GoalApiResponse,
  GoalCustomerUserResponse,
  getCustomerUserGoals,
  updateCustomerUserGoals,
} from '@/services/extrajudicial/goal.service'
import Progress from '@/ui/Progress/Progress'
import Text from '@/ui/Text/Text'
import Button from '@/ui/Button/Button'
import { notification } from '@/ui/notification/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'

type MetasModalViewProps = {
  visible: boolean
  onClose: () => void
}

const MetasModalView = ({ onClose, visible }: MetasModalViewProps) => {
  const handleClickCloseModal = () => {
    onClose()
  }
  const { watch, setValue } = useFormContext<GoalFormType>()

  const { mutate: getGoalsCustomers } = useMutation<GoalCustomerUserResponse, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getCustomerUserGoals(watch('goal').id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('goalUsers', data)
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )
  const { mutate: onUpdateGoalUsers } = useMutation<GoalApiResponse, AxiosError<CustomErrorResponse>>(
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
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
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
            permission="P04-04"
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

export default MetasModalView
