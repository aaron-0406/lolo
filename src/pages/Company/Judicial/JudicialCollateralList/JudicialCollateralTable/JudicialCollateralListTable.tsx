import { judicialCollateralColumns } from './utils/columns'

import Table from '@/ui/Table'
import { useQuery } from 'react-query'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import { getJudicialCollateralByCaseFileId } from '@/services/judicial/judicial-collateral.service'
import Container from '@/ui/Container'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import EmptyState from '@/ui/EmptyState'
import BodyCell from '@/ui/Table/BodyCell'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import moment from 'moment'
import Button from '@/ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import { KEY_JUDICIAL_COLLATERAL_CACHE } from './utils/judicial-collateral.cache'
import useModal from '@/hooks/useModal'
import DeleteCollateralModal from './DeleteCollareralModal'
import { useState } from 'react'
import Text from '@/ui/Text'

type JudicialCollateralListaTableProps = {
  id: number
}

const JudicialCollateralListTable = ({ id }: JudicialCollateralListaTableProps) => {
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const [collateralId, setCollateralId] = useState<number>(0)
  const {
    hideModal: hideDeleteCollateralModal,
    showModal: showDeleteCollateralModal,
    visible: visibleDeleteCollateralModal,
  } = useModal()

  const code = useParams().code ?? ''

  const navigate = useNavigate()

  const onClickRow = (id: string) => {
    navigate(`${paths.judicial.detailCollateral(urlIdentifier, code, id)}`)
  }

  const { data } = useQuery<AxiosResponse<any, Error>>(
    [KEY_JUDICIAL_COLLATERAL_CACHE, id],
    async () => {
      return await getJudicialCollateralByCaseFileId(id)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const collaterals = data?.data ?? []

  return (
    <Container width="100%" height="100%" padding="0px 20px 0px 20px">
      <Table
        top="240px"
        columns={judicialCollateralColumns}
        isArrayEmpty={!collaterals.length}
        emptyState={
          <EmptyStateCell colSpan={judicialCollateralColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron expedientes, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialCollateralColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron expedientes" />
          </EmptyStateCell>
        }
      >
        {Array.isArray(collaterals) && collaterals.length
          ? collaterals.map((collateral: JudicialCollateralType, index: number) => (
              <tr key={collateral?.id} onClick={() => onClickRow(collateral?.id.toString())}>
                <BodyCell textAlign="center">{index + 1}</BodyCell>
                <BodyCell textAlign="center">{collateral?.kindOfProperty}</BodyCell>
                <BodyCell textAlign="center">{collateral?.numberOfCollateral}</BodyCell>
                <BodyCell textAlign="left">
                  <Container
                    margin="20px 0"
                    minWidth="300px"
                    maxHeight="130px"
                    whiteSpace="normal"
                    wordBreak="break-all"
                    overFlowY="auto"
                  >
                    <Text.Body size="m" weight="regular">
                      {collateral?.propertyAddress || '-'}
                    </Text.Body>
                  </Container>
                </BodyCell>
                <BodyCell textAlign="center">{collateral?.electronicRecord}</BodyCell>
                <BodyCell textAlign="center">{`${
                  moment(collateral?.dateOfPublicDeed).format('DD-MM-YYYY') || ''
                }`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container
                    padding="10px"
                    width="100%"
                    maxWidth="300px"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overFlowX="hidden"
                    data-tooltip-content={collateral?.registrationSeat}
                    data-tooltip-id="cell-tooltip"
                  >
                    <Text.Body size="m" weight="regular">
                      {collateral?.registrationSeat || '-'}
                    </Text.Body>
                  </Container>
                </BodyCell>
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
                          setCollateralId(collateral?.id)
                          showDeleteCollateralModal()
                        }}
                        permission="P13-01-05-04"
                        messageTooltip="Eliminar garantía"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            ))
          : null}
      </Table>
      {visibleDeleteCollateralModal ? (
        <DeleteCollateralModal
          onClose={hideDeleteCollateralModal}
          visible={visibleDeleteCollateralModal}
          id={collateralId}
          caseFileId={id}
        />
      ) : null}
    </Container>
  )
}

export default JudicialCollateralListTable
