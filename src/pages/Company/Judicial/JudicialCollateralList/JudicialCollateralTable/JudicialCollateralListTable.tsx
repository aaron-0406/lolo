import { judicialCollateralColumns } from './utils/columns'

import Table from '@/ui/Table'
import { useQuery } from 'react-query'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider';
import { AxiosResponse } from 'axios';
import notification from '@/ui/notification';
import { getJudicialCollateralByCaseFileId } from '@/services/judicial/judicial-collateral.service';
import Container from '@/ui/Container';
import EmptyStateCell from '@/ui/Table/EmptyStateCell';
import EmptyState from '@/ui/EmptyState';
import BodyCell from '@/ui/Table/BodyCell';
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type';
import moment from 'moment';
import Button from '@/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import paths from 'shared/routes/paths';
import { KEY_JUDICIAL_COLLATERAL_CACHE } from './utils/judicial-collateral.cache';
import useModal from '@/hooks/useModal';
import DeleteCollateralModal from './DeleteExpedienteModal';
import { useEffect, useState } from 'react';

type JudicialCollateralListaTableProps = {
  id: number
}

const JudicialCollateralListTable = ({ id }: JudicialCollateralListaTableProps) => {
  const {
    client: {
      customer: { urlIdentifier },
    }, 
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext(); 
  const [ collateralId, setCollateralId ] = useState<number>(0)
  const { 
    hideModal: hideDeleteCollateralModal,
    showModal: showDeleteCollateralModal,
    visible: visibleDeleteCollateralModal,
  } = useModal()

  const code = useParams().code ?? ''

  const navigate = useNavigate(); 

  const onClickRow = (id: string) => {
    navigate(`${paths.judicial.detailCollateral(urlIdentifier, code, id)}`)
  }

  const { data, refetch } = useQuery<AxiosResponse<any, Error>>(
    [KEY_JUDICIAL_COLLATERAL_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getJudicialCollateralByCaseFileId(id)
    },
    {
      enabled: false, 
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  useEffect(() => {
    if (id) refetch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
          ? collaterals.map((collateral: JudicialCollateralType) => (
              <tr key={collateral?.id} onClick={() => onClickRow(collateral?.id.toString())}>
                <BodyCell>{collateral?.kindOfProperty}</BodyCell>
                <BodyCell>{collateral?.numberOfCollateral}</BodyCell>
                <BodyCell>{collateral?.propertyAddress}</BodyCell>
                <BodyCell>{collateral?.propertyFeatures}</BodyCell>
                <BodyCell>{collateral?.landArea}</BodyCell>
                <BodyCell>{collateral?.constructionArea}</BodyCell>
                <BodyCell>{collateral?.electronicRecord}</BodyCell>
                <BodyCell>{`${moment(collateral?.dateOfPublicDeed).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell>{collateral?.registrationSeat}</BodyCell>
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
        />
      ) : null}
    </Container>
  )
}

export default JudicialCollateralListTable