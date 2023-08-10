/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'
import Container from '../../../../ui/Container'
import Progress from '../../../../ui/Progress/Progress'
import Text from '../../../../ui/Text'
import { useMutation } from 'react-query'
import { GoalApiResponse, getGlobalGoal, getPersonalGoal } from '../../../../shared/services/goal.service'
import { GoalType } from '../../../../shared/types/goal-type'
import moment from 'moment'

const GoalInfo = () => {
  const [personalGoal, setPersonalGoal] = useState<GoalType>({
    id: 0,
    createdAt: moment(new Date()).format('DD-MM-YYYY'),
    customerId: 0,
    endDate: moment(new Date()).format('DD-MM-YYYY'),
    startDate: moment(new Date()).format('DD-MM-YYYY'),
    week: 0,
    total: 0,
    totalMeta: 0,
  })

  const [globalGoal, setGlobalGoal] = useState<GoalType>({
    id: 0,
    createdAt: moment(new Date()).format('DD-MM-YYYY'),
    customerId: 0,
    endDate: moment(new Date()).format('DD-MM-YYYY'),
    startDate: moment(new Date()).format('DD-MM-YYYY'),
    week: 0,
    total: 0,
    totalMeta: 0,
  })

  const {
    customerUser: {
      user: { privilege },
    },
  } = useLoloContext()

  const { mutate: onGetPersonalGoal } = useMutation<GoalApiResponse, Error>(
    async () => {
      return await getPersonalGoal()
    },
    {
      onSuccess: ({ data }) => {
        setPersonalGoal(data)
      },
      onError: (error: any) => {},
    }
  )

  const { mutate: onGetGlobalGoal } = useMutation<GoalApiResponse, Error>(
    async () => {
      return await getGlobalGoal()
    },
    {
      onSuccess: ({ data }) => {
        setGlobalGoal(data)
      },
      onError: (error: any) => {},
    }
  )
  useEffect(() => {
    onGetPersonalGoal()
    if (privilege === 'EDITOR') onGetGlobalGoal()

    return () => {}
  }, [])
  return (
    <Container width="100%"  display="flex" flexDirection="column" justifyContent="center" gap="1rem">
      <Container display="flex" justifyContent="space-between" width="100%" padding="0 2rem">
        <Text.Body size="m" weight="bold">
          {globalGoal.id !== 0
            ? `Meta del ${moment(globalGoal.startDate).format('DD-MM-YYYY')} al ${moment(globalGoal.endDate).format('DD-MM-YYYY')}`
            : 'No hay meta registrada para esta semana!'}
        </Text.Body>
      </Container>
      {privilege === 'EDITOR' && (
        <Container width="100%" display="flex" flexDirection="column" padding="0 2rem" gap="20px">
          <Container width="100%" display="flex">
            <Container display="flex" justifyContent="space-between" width="100%">
              <Text.Body size="m" weight="bold">
                Progreso Global
              </Text.Body>
              <Text.Body size="m" weight="bold">
                Total: {globalGoal.totalMeta}
              </Text.Body>
            </Container>
          </Container>
          <Progress
            quantity={globalGoal.total}
            value={
              globalGoal.totalMeta === 0
                ? 0
                : Number(((Number(globalGoal.total) * 100) / Number(globalGoal.totalMeta)).toFixed(2)) >= 100
                ? 100
                : Number(((Number(globalGoal.total) * 100) / Number(globalGoal.totalMeta)).toFixed(2))
            }
            bgColorInit="#FF7875"
            bgColorEnd="#51AB2B"
            bgColorMid="#F3BD5B"
          />
        </Container>
      )}
      <Container width="100%" display="flex" flexDirection="column" padding="0 2rem" gap="20px">
        <Container width="100%" display="flex">
          <Container display="flex" justifyContent="space-between" width="100%">
            <Text.Body size="m" weight="bold">
              Progreso Personal
            </Text.Body>
            <Text.Body size="m" weight="bold">
              Total: {personalGoal.totalMeta}
            </Text.Body>
          </Container>
        </Container>
        <Progress
          value={
            personalGoal.totalMeta === 0
              ? 0
              : Number(((Number(personalGoal.total) * 100) / Number(personalGoal.totalMeta)).toFixed(2)) >= 100
              ? 100
              : Number(((Number(personalGoal.total) * 100) / Number(personalGoal.totalMeta)).toFixed(2))
          }
          quantity={personalGoal.total}
          bgColorInit="#FF7875"
          bgColorEnd="#51AB2B"
          bgColorMid="#F3BD5B"
        />
      </Container>
    </Container>
  )
}

export default GoalInfo
