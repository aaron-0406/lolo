/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { Dispatch, FC, useEffect, useMemo, useState } from 'react'
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
import { KEY_EXT_JUDICIAL_COURTS_CACHE } from '../../JudicialCourt/CourtTable/utils/ext-court.cache'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'
import { KEY_EXT_JUDICIAL_SUBJECT_CACHE } from '../../JudicialSubject/SubjectTable/utils/ext-subject.cache'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { KEY_EXT_JUDICIAL_PROCEDURAL_WAY_CACHE } from '../../JudicialProceduralWay/ProceduralWayTable/utils/ext-procedural-way.cache'
import { getIDsByIdentifier } from './utils/methods'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'

type JudicialFileCasesTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialFileCasesTable: FC<JudicialFileCasesTableProps> = ({ opts, setOpts }) => {
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
    customerUser: { user },
  } = useLoloContext()

  const {
    filterOptions: { getSelectedFilters, setSelectedFilters },
  } = useFiltersContext()

  const [fileCaseId, setfileCaseId] = useState<number>(0)
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

  const { data: dataCourts, isLoading: isLoadingCourts } = useQuery(
    [KEY_EXT_JUDICIAL_COURTS_CACHE, parseInt(chb?.length ? chb : '0')],
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
    [KEY_EXT_JUDICIAL_SUBJECT_CACHE, parseInt(chb?.length ? chb : '0')],
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
    [KEY_EXT_JUDICIAL_PROCEDURAL_WAY_CACHE, parseInt(chb?.length ? chb : '0')],
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

  const { refetch, data, isLoading } = useQuery<
    AxiosResponse<{
      caseFiles: Array<JudicialFileCaseTableRow>
      quantity: number
    }>,
    AxiosError<CustomErrorResponse>
  >(
    [KEY_FILE_CASE_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      const courts = getIDsByIdentifier('customers.datatable.header.court', selectedFilterOptions)
      const subjects = getIDsByIdentifier('customers.datatable.header.subject', selectedFilterOptions)
      const proceduralWays = getIDsByIdentifier('customers.datatable.header.proceduralWay', selectedFilterOptions)

      return await getFileCasesByCHB(
        Number(selectedBank.idCHB),
        opts.page,
        opts.limit,
        JSON.stringify(courts),
        JSON.stringify(proceduralWays),
        JSON.stringify(subjects)
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

  useEffect(() => {
    refetch()
  }, [getSelectedFilters(currentPath)?.filters, opts])

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes('P13-01' ?? '')
  }, [user.permissions])

  const judicialFileCases = data?.data.caseFiles ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={data?.data.quantity ?? 0} opts={opts} setOpts={setOpts} />
      <Table
        filterOptions={[
          { identifier: 'casesFiles.datatable.header.court', options: optionsCourts },
          { identifier: 'casesFiles.datatable.header.subject', options: optionsSubjects },
          { identifier: 'casesFiles.datatable.header.proceduralWay', options: optionsProceduralWay },
        ]}
        top="260px"
        selectedFilterOptions={selectedFilterOptions}
        columns={judicialCaseFileColumns}
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
                <BodyCell textAlign="center">{`${record.judgmentNumber || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.numberCaseFile || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialCourt.court || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialSubject.subject || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialVenue || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialProceduralWay.proceduralWay || ''}`}</BodyCell>
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
                          setfileCaseId(record.id)
                          showDeleteFileCase()
                        }}
                        permission="P02-05"
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
