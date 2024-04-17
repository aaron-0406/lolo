/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { Dispatch, useEffect, useMemo, useState } from 'react'
import { judicialCaseFileColumns } from './utils/columns'
import { useLocation, useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'
import { Tooltip } from 'react-tooltip'
import { getFileCasesByCHB } from '@/services/judicial/judicial-file-case.service'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import DeleteExpedienteModal from './DeleteExpedienteModal'
import useModal from '@/hooks/useModal'
import { JudicialFileCaseTableRow, KEY_FILE_CASE_CACHE } from './utils/file-cases.cache'
import { KEY_JUDICIAL_COURTS_CACHE } from '../../JudicialCourt/CourtTable/utils/ext-court.cache'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'
import { KEY_JUDICIAL_SUBJECT_CACHE } from '../../JudicialSubject/SubjectTable/utils/ext-subject.cache'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { KEY_JUDICIAL_PROCEDURAL_WAY_CACHE } from '../../JudicialProceduralWay/ProceduralWayTable/utils/ext-procedural-way.cache'
import { getIDsByIdentifier } from './utils/methods'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import Text from '@/ui/Text'

type JudicialFileCasesTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialFileCasesTable = ({ opts, setOpts }: JudicialFileCasesTableProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const { visible: visibleDeleteFileCase, showModal: showDeleteFileCase, hideModal: hideDeleteFileCase } = useModal()

  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: {
      selectedBank: { idCHB: chb },
      selectedBank,
    },
    user: { users },
    customerUser: { user },
  } = useLoloContext()

  const {
    filterOptions: { getSelectedFilters, setSelectedFilters },
  } = useFiltersContext()

  const [fileCaseId, setFileCaseId] = useState<number>(0)

  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []

  const onClickRow = (code: string) => {
    navigate(`${paths.judicial.detallesExpediente(urlIdentifier, code)}`)
  }

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    setTimeout(() => {
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
    })
  }

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes('P13-01' ?? '')
  }, [user.permissions])

  const { data: dataCourts, isLoading: isLoadingCourts } = useQuery(
    [KEY_JUDICIAL_COURTS_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getCourtByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const optionsCourts = dataCourts?.data?.map((court: { id: number; court: string }) => {
    return {
      key: court.id,
      label: court.court,
    }
  })

  const { data: dataSubject, isLoading: isLoadingSubject } = useQuery(
    [KEY_JUDICIAL_SUBJECT_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getSubjectByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const optionsSubjects = dataSubject?.data?.map((subject: { id: number; subject: string }) => {
    return {
      key: subject.id,
      label: subject.subject,
    }
  })

  const { data: dataProceduralWay, isLoading: isLoadingProceduralWay } = useQuery(
    [KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getProceduralWayByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const optionsProceduralWay = dataProceduralWay?.data?.map((proceduralWay: { id: number; proceduralWay: string }) => {
    return {
      key: proceduralWay.id,
      label: proceduralWay.proceduralWay,
    }
  })

  const optionsUsers = users.map((user) => {
    return {
      key: user.id,
      label: user.name,
    }
  })

  const { refetch, data, isLoading } = useQuery<
    AxiosResponse<{
      caseFiles: Array<JudicialFileCaseTableRow>
      quantity: number
    }>,
    AxiosError<CustomErrorResponse>
  >(
    [KEY_FILE_CASE_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      const courts = getIDsByIdentifier('casesFiles.datatable.header.court', selectedFilterOptions)
      const subjects = getIDsByIdentifier('casesFiles.datatable.header.subject', selectedFilterOptions)
      const users = getIDsByIdentifier('casesFiles.datatable.header.user', selectedFilterOptions)
      const proceduralWays = getIDsByIdentifier('casesFiles.datatable.header.proceduralWay', selectedFilterOptions)

      //TODO: Add users
      return await getFileCasesByCHB(
        Number(selectedBank.idCHB),
        opts.page,
        opts.limit,
        JSON.stringify(courts),
        JSON.stringify(proceduralWays),
        JSON.stringify(subjects),
        JSON.stringify(users)
      )
    },
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const judicialFileCases = data?.data?.caseFiles ?? []
  const quantity = data?.data?.quantity ?? 0

  useEffect(() => {
    refetch()
  }, [getSelectedFilters(currentPath)?.filters, opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={quantity} opts={opts} setOpts={setOpts} />
      <Table
        filterOptions={[
          { identifier: 'casesFiles.datatable.header.court', options: optionsCourts },
          { identifier: 'casesFiles.datatable.header.subject', options: optionsSubjects },
          { identifier: 'casesFiles.datatable.header.proceduralWay', options: optionsProceduralWay },
          { identifier: 'casesFiles.datatable.header.user', options: optionsUsers },
        ]}
        top="260px"
        columns={judicialCaseFileColumns}
        selectedFilterOptions={selectedFilterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        loading={isLoading || isLoadingProceduralWay || isLoadingSubject || isLoadingCourts}
        isArrayEmpty={!judicialCaseFileColumns.length}
        emptyState={
          <EmptyStateCell colSpan={judicialCaseFileColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!judicialCaseFileColumns?.length &&
          judicialFileCases.map((record: JudicialFileCaseTableRow) => {
            return (
              <tr
                className="styled-data-table-row"
                key={record.id}
                onClick={() => {
                  hasAccessToTheButton && onClickRow(record.numberCaseFile)
                }}
              >
                <BodyCell textAlign="center">{`${record?.numberCaseFile || ''}`}</BodyCell>
                <BodyCell textAlign="left">
                  <Container
                    data-tooltip-id="cell-tooltip"
                    data-tooltip-content={record?.client?.name.length >= 25 ? record?.client?.name : ''}
                    width="17vw"
                    whiteSpace="nowrap"
                    overFlowX="hidden"
                    textOverflow="ellipsis"
                  >
                    <Text.Body size="m" weight="regular">
                      {record?.client?.name || '-'}
                    </Text.Body>
                  </Container>
                </BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialCourt?.court || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialSubject?.subject || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.customerUser?.name || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialVenue || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialProceduralWay?.proceduralWay || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        width="125px"
                        shape="round"
                        display="danger"
                        trailingIcon="ri-delete-bin-line"
                        onClick={(event) => {
                          event.stopPropagation()
                          setFileCaseId(record.id)
                          showDeleteFileCase()
                        }}
                        permission="P13-04"
                        messageTooltip="Eliminar expediente"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <Tooltip place="right" id="cell-tooltip" />

      <DeleteExpedienteModal visible={visibleDeleteFileCase} onClose={hideDeleteFileCase} idFileCase={fileCaseId} />
    </Container>
  )
}

export default JudicialFileCasesTable
