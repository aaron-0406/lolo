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
import { useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'
import { Tooltip } from 'react-tooltip'
import { getFileCasesByCHB } from '@/services/judicial/judicial-file-case.service'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import DeleteExpedienteModal from './DeleteExpedienteModal'
import useModal from '@/hooks/useModal'
import { JudicialFileCaseTableRow, KEY_FILE_CASE_CACHE } from './utils/file-cases.cache'

type JudicialFileCasesTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialFileCasesTable: FC<JudicialFileCasesTableProps> = ({ opts, setOpts }) => {
  const navigate = useNavigate()
  const { visible: visibleDeleteFileCase, showModal: showDeleteFileCase, hideModal: hideDeleteFileCase } = useModal()

  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: { selectedBank },
    customerUser: { user },
  } = useLoloContext()

  const [fileCaseId, setfileCaseId] = useState<number>(0)
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<FilterOptionsProps>>([])

  const onClickRow = (code: string) => {
    navigate(`${paths.judicial.detallesExpediente(urlIdentifier, code)}`)
  }

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

  const { refetch, data, isLoading } = useQuery<
    AxiosResponse<
      {
        caseFiles: Array<JudicialFileCaseTableRow>
        quantity: number
      },
      Error
    >
  >(
    KEY_FILE_CASE_CACHE,
    async () => {
      return await getFileCasesByCHB(Number(selectedBank.idCHB), opts.page, opts.limit)
    },
    {
      enabled: !!selectedBank.idCHB.length,
    }
  )

  useEffect(() => {
    if (selectedBank.idCHB.length) refetch()
  }, [refetch, opts, selectedFilterOptions, selectedBank.idCHB.length])

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes('P13-01' ?? '')
  }, [user.permissions])

  const judicialFileCases = data?.data.caseFiles ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={data?.data.quantity ?? 0} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={judicialCaseFileColumns}
        onChangeFilterOptions={onChangeFilterOptions}
        loading={isLoading}
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
                <BodyCell textAlign="center">{`${record.judge || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialSubject.subject || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.judicialCourt.court || ''}`}</BodyCell>
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
