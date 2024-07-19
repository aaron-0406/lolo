import { useLoloContext } from '@/contexts/LoloProvider'
import { ReactNode, useEffect, useState } from 'react'
import useModal from '@/hooks/useModal'

import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import EmptyState from '@/ui/EmptyState'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import BodyCell from '@/ui/Table/BodyCell'

import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { JudicialCollateralFilesColumns } from './utils/columns'
import moment from 'moment'
import { KEY_JUDICIAL_COLLATERAL_FILES_CACHE } from './utils/judicial-collateral-files.cache'

import { JudicialCollateralFilesType } from '@/types/judicial/judicial-collateral-files.type'

import { getJudicialCollateralFiles } from '@/services/judicial/judicial-collateral-files.service'

import DeleteCollateralFilesModal from '../Modals/DeleteCollateralFilesModal'
import { useLocation, useParams } from 'react-router-dom'
import JudicialFileViewerModal from './Modals/JudicialFileViewerModal'
import Img from '@/ui/Img'

import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import Text from '@/ui/Text'
import { useFiltersContext } from '@/contexts/FiltersProvider'

const JudicialCollateralFilesTable = () => {
  const location = useLocation()
  
  const currentPath = location.pathname
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const {
    filterSearch: { getSearchFilters },
  } = useFiltersContext(); 
  const opts = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const [idCollateralFile, setIdCollateralFile] = useState<number | undefined>(undefined)
  const [judicialCollateralFile, setJudicialCollateralFile] = useState<JudicialCollateralFilesType | undefined>(
    undefined
  )
  const collateralId = useParams().collateralCode ?? ''
  const {
    visible: visibleModalCollateralFiles,
    showModal: showModalCollateralFiles,
    hideModal: hideModalCollateralFiles,
  } = useModal()
  const {
    visible: visibleModalDeleteCollateralFiles,
    showModal: showModalDeleteCollateralFiles,
    hideModal: hideModalDeleteCollateralFiles,
  } = useModal()

  const {refetch, isLoading, data } = useQuery<AxiosResponse<Array<JudicialCollateralFilesType>, Error>>(
    [KEY_JUDICIAL_COLLATERAL_FILES_CACHE, Number(collateralId), parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialCollateralFiles(
        Number(collateralId), parseInt(chb.length ? chb : '0'), opts.filter)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener los archivos.',
        })
      },
    }
  )

  const getIconFile = (name: string): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img width="30px" placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img width="30px" placeholderImage="" src={pdfIcon} />
    return <Img width="30px" placeholderImage="type-file" src={fileIcon} />
  }

  const onOpenModalCollateralFiles = (file: JudicialCollateralFilesType) => {
    setJudicialCollateralFile(file)
    showModalCollateralFiles()
  }
  const onOpenDeleteModalCollateralFiles = (id: number) => {
    setIdCollateralFile(id)
    showModalDeleteCollateralFiles()
  }
  const onCloseModalDeleteCollateralFiles = () => {
    hideModalDeleteCollateralFiles()
    setIdCollateralFile(undefined)
  }

  const onCloseModalCollateralFiles = () => {
    hideModalCollateralFiles()
    setJudicialCollateralFile(undefined)
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [getSearchFilters(currentPath)?.opts.filter])

  const judicialCollateralFiles = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="0px 20px 20px 20px">
      <Table
        top="190px"
        columns={JudicialCollateralFilesColumns}
        loading={isLoading}
        isArrayEmpty={!judicialCollateralFiles.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialCollateralFilesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialCollateralFilesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {Array.isArray(judicialCollateralFiles)
          ? judicialCollateralFiles.map((CollateralFiles, index) => {
              return (
                <tr key={CollateralFiles.id} className="styled-data-table-row">
                  <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
                  <BodyCell textAlign="center">{getIconFile(CollateralFiles.originalName)}</BodyCell>
                  <BodyCell textAlign="center">
                    <Container
                      padding="10px"
                      width="100%"
                      maxWidth="300px"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overFlowX="hidden"
                      data-tooltip-content={CollateralFiles.originalName}
                      data-tooltip-id="cell-tooltip"
                    >
                      <Text.Body size="m" weight="regular">
                        {CollateralFiles.originalName || '-'}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">{`${
                    moment(CollateralFiles.createdAt).format('DD-MM-YYYY') || ''
                  }`}</BodyCell>
                  <BodyCell textAlign="center">
                    <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">
                      <Button
                        onClick={() => {
                          onOpenModalCollateralFiles(CollateralFiles)
                        }}
                        messageTooltip="Editar notaria"
                        shape="round"
                        size="small"
                        leadingIcon="ri-eye-line"
                        permission="P13-01-06-01-03-03"
                      />
                      <Button
                        onClick={() => {
                          onOpenDeleteModalCollateralFiles(CollateralFiles.id)
                        }}
                        messageTooltip="Eliminar notaria"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P13-01-06-01-03-04"
                        display="danger"
                      />
                    </Container>
                  </BodyCell>
                </tr>
              )
            })
          : null}
      </Table>

      {visibleModalCollateralFiles ? (
        <JudicialFileViewerModal
          isOpen={visibleModalCollateralFiles}
          onClose={onCloseModalCollateralFiles}
          file={judicialCollateralFile}
        />
      ) : null}
      {visibleModalDeleteCollateralFiles ? (
        <DeleteCollateralFilesModal
          id={idCollateralFile ?? 0}
          isOpen={visibleModalDeleteCollateralFiles}
          onClose={onCloseModalDeleteCollateralFiles}
        />
      ) : null}
    </Container>
  )
}

export default JudicialCollateralFilesTable
