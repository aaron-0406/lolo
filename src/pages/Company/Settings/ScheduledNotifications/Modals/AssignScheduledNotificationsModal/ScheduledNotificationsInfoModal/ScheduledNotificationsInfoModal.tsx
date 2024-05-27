import ScheduledNotficationForm from './ScheduledNotficationForm'
import Container from '@/ui/Container'
import ScheduledNotificationsUsersTable from './ScheduledNoticationsUsersTable/ScheduledNotificationsUsersTable'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE } from './ScheduledNoticationsUsersTable/utils/users.cache'
import { getAllUsersByID } from '@/services/dash/customer-user.service'
import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type ScheduledNotificationsInfoModalProps = {
  modalActions: 'edit' | 'add'
}

const ScheduledNotificationsInfoModal = ({ modalActions }: ScheduledNotificationsInfoModalProps) => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 10, page: 1 })
  const {
    client: {
      customer: { id: customerId },
    },
  } = useLoloContext()

  const { data, isLoading, refetch } = useQuery(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, async () => {
    return await getAllUsersByID(customerId)
  })
  const greaterThanTabletS = useMediaQuery(device.desktopL)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const users = data?.data ?? []

  return (
    <Container width="100%" display="flex" flexDirection={greaterThanTabletS ? 'row' : 'column'} height="100%">
      <ScheduledNotficationForm />
      {modalActions === 'edit' ? (
        <ScheduledNotificationsUsersTable users={users} isLoading={isLoading} opts={opts} setOpts={setOpts} />
      ) : null}
    </Container>
  )
}

export default ScheduledNotificationsInfoModal
