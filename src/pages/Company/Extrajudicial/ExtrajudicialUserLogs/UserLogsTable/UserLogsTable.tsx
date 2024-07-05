import { Dispatch, FC, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getAllUserFilterLogsByCustomerId } from '@/services/dash/user-log.service'
import { UserLogType } from '@/types/dash/user-log.type'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { userLogsColumns } from './utils/columns'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { Opts } from '@/ui/Pagination/interfaces'
import Pagination from '@/ui/Pagination'
import { AxiosResponse } from 'axios'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import { getAllIpAddress } from '@/services/extrajudicial/ext-ip-address-bank.service'
import { KEY_EXT_IP_ADDRESS_BANK_CACHE } from '../../ExtrajudicialIpAddressBank/IpAddressBankTable/utils/dash-ip-address-bank.cache'
import notification from '@/ui/notification'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLocation } from 'react-router-dom'
import { KEY_EXT_USUARIOS_CACHE } from '../../ExtrajudicialUsers/UsersTable/utils/ext-usuarios.cache'
import { getAllUsersByID } from '@/services/dash/customer-user.service'
import EmptyState from '@/ui/EmptyState'

type UserLogsTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const UserLogsTable: FC<UserLogsTableProps> = ({ opts, setOpts }) => {
  const {
    bank: { selectedBank },
    client: {
      customer: { id: customerId },
    },
    customerUser: {
      user: { permissions },
    },
  } = useLoloContext()

  const {
    filterOptions: { getSelectedFilters, setSelectedFilters },
    clearAllFilters,
  } = useFiltersContext()

  const location = useLocation()
  const currentPath = location.pathname

  const [userLogs, setUserLogs] = useState([])
  const [userLogsCount, setUserLogsCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState(false)

  const getPermission = (code: string) => {
    return permissions?.find((permission) => permission.code === code)
  }

  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []

  const { refetch } = useQuery(
    ['key-ext-user-logs-cache', customerId],
    async () => {
      setIsLoading(true)
      const entities = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'user.logs.datatable.header.action')
        ?.options.map((option) => {
          return option.key
        })

      const users = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'user.logs.datatable.header.user')
        ?.options.map((option) => {
          return option.key
        })

      return await getAllUserFilterLogsByCustomerId(
        opts.page,
        opts.limit,
        customerId,
        JSON.stringify(entities),
        JSON.stringify(users)
      )
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: ({ data }) => {
        setUserLogs(data.logs)
        setUserLogsCount(data.quantity)
        setIsLoading(false)
      },
    }
  )
  const { data: dataUsers } = useQuery(KEY_EXT_USUARIOS_CACHE, async () => {
    return await getAllUsersByID(customerId)
  })

  const userOptions = dataUsers?.data.map((customerUser: CustomerUserType) => {
    return {
      key: customerUser.id,
      label: customerUser.name,
    }
  })
  const permissionsOptions = permissions?.map((permission) => {
    return {
      key: permission.code,
      label: permission.name,
    }
  })

  const { data } = useQuery<AxiosResponse<Array<ExtIpAddressBankType>, Error>>(
    KEY_EXT_IP_ADDRESS_BANK_CACHE,
    async () => {
      return await getAllIpAddress(customerId)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const ipAddresses = data?.data ?? []

  const findAddressByIP = (ip: string) => {
    return ipAddresses.find((address) => address.ip === ip)?.addressName
  }

  const findAddressByNameMemoized = useMemo(() => {
    return (ip: string) => findAddressByIP(ip)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipAddresses.length, findAddressByIP])

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    const position = selectedFilterOptions.find(
      (selectedFilterOption) => selectedFilterOption.identifier === filterOption.identifier
    )

    if (!position) {
      setSelectedFilters({ url: currentPath, filters: [...selectedFilterOptions, filterOption] })
    } else {
      const selectedFilterOptionsTestCopy = selectedFilterOptions
      const selectedFiltersUpdated = selectedFilterOptionsTestCopy.map((selectedFilterOption) => {
        if (selectedFilterOption.identifier === filterOption.identifier) {
          return filterOption
        }

        return selectedFilterOption
      })
      setSelectedFilters({ url: currentPath, filters: selectedFiltersUpdated })
    }
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSelectedFilters(currentPath)?.filters])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.page, opts.limit])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={userLogsCount} opts={opts} setOpts={setOpts} />
      <Table
        top="200px"
        columns={userLogsColumns}
        filterOptions={[
          { identifier: 'user.logs.datatable.header.user', options: userOptions },
          { identifier: 'user.logs.datatable.header.action', options: permissionsOptions },
        ]}
        selectedFilterOptions={selectedFilterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        loading={isLoading}
        isArrayEmpty={!userLogs?.length}
        emptyState={
          <EmptyStateCell colSpan={userLogsColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={clearAllFilters}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={userLogsColumns.length}>
            <EmptyState title="Recurso no encontrado" description="Aún no se han registrado logs" />
          </EmptyStateCell>
        }
      >
        {!!userLogs?.length &&
          userLogs.map((record: UserLogType & { customerUser: CustomerUserType }, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.codeAction || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${getPermission(record.codeAction)?.name || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.entity || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.entityId || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.customerUser?.name || '-'} ${
                  record.customerUser?.lastName || '-'
                }`}</BodyCell>
                <BodyCell textAlign="center">{moment(record.createAt).format('DD-MM-YYYY') || ''}</BodyCell>
                <BodyCell textAlign="center">{moment(record.createAt).format('HH:mm:ss') || ''}</BodyCell>
                <BodyCell textAlign="center">{`${
                  findAddressByNameMemoized(record.ip) ?? (record.ip || '-')
                }`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default UserLogsTable
