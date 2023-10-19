import { useEffect, useState } from 'react'
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

const UserLogsTable = () => {
  const {
    bank: { selectedBank },
    client: {
      customer: { id: customerId },
    },
    customerUser: {
      user: { permissions },
    },
    user: { users },
  } = useLoloContext()

  const [filterOptions, setFilterOptions] = useState<Array<FilterOptionsProps>>([])
  const [resetFilters, setResetFilters] = useState<boolean>(false)
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<FilterOptionsProps>>([])
  const [userLogs, setUserLogs] = useState([])

  const getPermission = (code: string) => {
    return permissions?.find((permission) => permission.code === code)
  }

  const { refetch, isLoading } = useQuery(
    ['key-ext-user-logs-cache', customerId],
    async () => {
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

      return await getAllUserFilterLogsByCustomerId(customerId, JSON.stringify(entities), JSON.stringify(users))
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: ({ data }) => {
        setUserLogs(data)
      },
    }
  )

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    setTimeout(() => {
      const position = selectedFilterOptions.find(
        (selectedFilterOption) => selectedFilterOption.identifier === filterOption.identifier
      )

      if (!position) {
        setSelectedFilterOptions((prev) => {
          return [...prev, filterOption]
        })
      } else {
        setSelectedFilterOptions((prev) => {
          return prev.map((selectedFilterOption) => {
            if (selectedFilterOption.identifier === filterOption.identifier) {
              return filterOption
            }

            return selectedFilterOption
          })
        })
      }
    })
  }

  useEffect(() => {
    if (permissions) {
      const optionsActions = permissions?.map((permission) => {
        return {
          key: permission.code,
          label: permission.name,
        }
      })

      setFilterOptions((prev) => {
        const filterOption = prev.find((filter) => filter.identifier === 'user.logs.datatable.header.action')

        if (filterOption) {
          return prev.map((filter) => {
            if (filter.identifier === 'user.logs.datatable.header.action') {
              return {
                identifier: filter.identifier,
                options: optionsActions,
              }
            }
            return filter
          })
        } else {
          return [
            ...prev,
            {
              identifier: 'user.logs.datatable.header.action',
              options: optionsActions,
            },
          ]
        }
      })
    }
  }, [permissions])

  useEffect(() => {
    setSelectedFilterOptions([])
    setResetFilters(!resetFilters)

    const optionsUsers = users.map((user) => {
      return {
        key: user.id,
        label: user.name,
      }
    })
    setFilterOptions((prev) => {
      const filterOption = prev.find((filter) => filter.identifier === 'user.logs.datatable.header.user')

      if (filterOption) {
        return prev.map((filter) => {
          if (filter.identifier === 'user.logs.datatable.header.user') {
            return {
              identifier: filter.identifier,
              options: optionsUsers,
            }
          }
          return filter
        })
      } else {
        return [
          ...prev,
          {
            identifier: 'user.logs.datatable.header.user',
            options: optionsUsers,
          },
        ]
      }
    })
    // eslint-disable-next-line
  }, [selectedBank.idCHB])

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      refetch()
    }
  }, [refetch, selectedFilterOptions, selectedBank.idCHB.length])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="160px"
        columns={userLogsColumns}
        filterOptions={filterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        resetFilters={resetFilters}
        loading={isLoading}
        isArrayEmpty={!userLogs?.length}
        emptyState={
          <EmptyStateCell colSpan={userLogsColumns.length}>
            <div>Vacio</div>
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
                <BodyCell textAlign="center">{`${record.ip || '-'}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default UserLogsTable
