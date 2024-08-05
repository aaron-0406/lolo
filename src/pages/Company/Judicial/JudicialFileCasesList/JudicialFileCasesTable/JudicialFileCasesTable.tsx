/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { useEffect, useMemo, useState } from 'react'
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
import { KEY_JUDICIAL_COURTS_CACHE } from '../../JudicialCourt/CourtTable/utils/judicial-court.cache'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'
import { KEY_JUDICIAL_SUBJECT_CACHE } from '../../JudicialSubject/SubjectTable/utils/judicial-subject.cache'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { KEY_JUDICIAL_PROCEDURAL_WAY_CACHE } from '../../JudicialProceduralWay/ProceduralWayTable/utils/judicial-procedural-way.cache'
import { getIDsByIdentifier } from './utils/methods'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import Text from '@/ui/Text'
import EmptyState from '@/ui/EmptyState'
import Checkbox from '@/ui/Checkbox'
import FloatingContainer from '@/ui/FloatingContainer'
import type { FloatingContainerButtonsType } from '@/ui/FloatingContainer/interfaces'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { getSedeByCHB } from '@/services/judicial/judicial-sede.service'
import { KEY_JUDICIAL_SEDE_CACHE } from '../../JudicialSede/SedeTable/utils/judicial-sede.cache'

const JudicialFileCasesTable = () => {
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
    filterSearch: { getSearchFilters, setSearchFilters },
    sorting: { getSortingOptions, setSortingOptions },
    clearAllFilters,
  } = useFiltersContext()

  const [fileCaseId, setFileCaseId] = useState<number>(0)
  const [caseFileSelected, setCaseFileSelected] = useState<Array<JudicialCaseFileType>>([])

  const sortingOptions = getSortingOptions(currentPath)?.opts ?? { sortBy: '', order: 'ASC' }
  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []
  const opts = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const onClickRow = (code: string) => {
    navigate(`${paths.judicial.detallesExpediente(urlIdentifier, code)}`)
  }

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

  const onChangeSortingOptions = (sortBy: string, order: 'ASC' | 'DESC') => {
    setSortingOptions({ url: currentPath, opts: { sortBy, order } })
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

  const { data: dataSede, isLoading: isLoadingSede } = useQuery(
    [KEY_JUDICIAL_SEDE_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getSedeByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const optionsSede = dataSede?.data?.map((sede: { id: number; sede: string }) => {
    return {
      key: sede.id,
      label: sede.sede,
    }
  })

  const optionsUsers = users.map((user) => {
    return {
      key: user.id,
      label: user.name,
    }
  })

  let optionsResponsibles = users.map((user) => {
    return {
      key: user.id,
      label: user.name,
    }
  })

  optionsResponsibles.push({
    key: 0,
    label: 'No asignado',
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
      const responsibles = getIDsByIdentifier('casesFiles.datatable.header.responsible', selectedFilterOptions)
      const sedes = getIDsByIdentifier('casesFiles.datatable.header.sede', selectedFilterOptions)

      //TODO: Add users
      return await getFileCasesByCHB(
        Number(selectedBank.idCHB),
        opts.page,
        opts.limit,
        opts.filter,
        sortingOptions,
        JSON.stringify(courts),
        JSON.stringify(proceduralWays),
        JSON.stringify(subjects),
        JSON.stringify(users),
        JSON.stringify(responsibles),
        JSON.stringify(sedes)
      
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

  const funt = () => {
    console.log('acción')
  }

  const buttons: FloatingContainerButtonsType[] = [
    {
      onClick: funt,
      label: 'ARCHIVAR',
    },
    {
      onClick: funt,
      label: 'ASIGNAR',
    },
  ]

  const onChangeCheckBox = (state: boolean, caseFile: JudicialCaseFileType) => {
    let arr = caseFileSelected

    if (state) {
      setCaseFileSelected([...arr, caseFile])
    } else {
      arr = arr.filter((cf) => cf !== caseFile)
      setCaseFileSelected(arr)
    }
  }

  const onChangeCheckBoxAll = (state: boolean) => {
    if (state) {
      setCaseFileSelected(judicialFileCases)
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.file-case-check-box')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true
      })
    } else {
      setCaseFileSelected([])
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.file-case-check-box')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
    }
  }

  const onCloseFloatingContainer = () => {
    setCaseFileSelected([])
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.file-case-check-box')
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
  }

  useEffect(() => {
    refetch()
  }, [getSelectedFilters(currentPath)?.filters])

  useEffect(() => {
    refetch()
  }, [opts.filter.length, opts.page])

  useEffect(() => {
    refetch()
  }, [sortingOptions.order])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 20px">
      <Pagination count={quantity} opts={opts} setOptsFilter={setSearchFilters} url={currentPath} />
      <Table
        filterOptions={[
          { identifier: 'casesFiles.datatable.header.court', options: optionsCourts },
          { identifier: 'casesFiles.datatable.header.subject', options: optionsSubjects },
          { identifier: 'casesFiles.datatable.header.proceduralWay', options: optionsProceduralWay },
          { identifier: 'casesFiles.datatable.header.responsible', options: optionsResponsibles },
          { identifier: 'casesFiles.datatable.header.user', options: optionsUsers },
          { identifier: 'casesFiles.datatable.header.sede', options: optionsSede },
        ]}
        top="230px"
        columns={judicialCaseFileColumns}
        selectedFilterOptions={selectedFilterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        onChangeSortingOptions={onChangeSortingOptions}
        loading={isLoading || isLoadingProceduralWay || isLoadingSubject || isLoadingCourts || isLoadingSede}
        isArrayEmpty={!judicialFileCases.length}
        isCheckboxChecked={!!caseFileSelected.length}
        onChangeCheckBoxAll={onChangeCheckBoxAll}
        emptyState={
          <EmptyStateCell colSpan={judicialCaseFileColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron expedientes, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={clearAllFilters}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialCaseFileColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron expedientes" />
          </EmptyStateCell>
        }
      >
        {!!judicialCaseFileColumns?.length &&
          judicialFileCases.map((record: JudicialFileCaseTableRow, key) => {
            const cfs = caseFileSelected.find((cs) => cs.numberCaseFile === record.numberCaseFile)

            return (
              <tr
                className={cfs ? 'styled-data-table-row select-table' : 'styled-data-table-row'}
                key={key}
                onClick={() => {
                  hasAccessToTheButton && onClickRow(record.numberCaseFile)
                }}
              >
                <BodyCell textAlign="left">
                  {
                    <Container
                      display="flex"
                      justifyContent="end"
                      alignItems="center"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      <Checkbox
                        className="file-case-check-box"
                        width="100%"
                        onChange={(event) => {
                          onChangeCheckBox(event.currentTarget.checked, record)
                        }}
                      />
                    </Container>
                  }
                </BodyCell>
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
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">{`${
                    record?.processStatus?.toUpperCase() || '-'
                  }`}</Text.Body>
                </BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialCourt?.court || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialSubject?.subject || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.customerUser?.name || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.responsibleUser?.name ?? '-'}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.secretary || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record?.judicialSede?.sede || ''}`}</BodyCell>
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
      {caseFileSelected.length !== 0 && (
        <FloatingContainer numberItems={caseFileSelected.length} buttons={buttons} onClose={onCloseFloatingContainer} />
      )}

      <DeleteExpedienteModal visible={visibleDeleteFileCase} onClose={hideDeleteFileCase} idFileCase={fileCaseId} />
    </Container>
  )
}

export default JudicialFileCasesTable
