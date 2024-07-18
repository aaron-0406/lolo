import Container from '@/ui/Container'
import Table from '@/ui/Table'
import { judicialCollateralAuctionRoundListColumns } from './utils/columns'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import { getAllJudicialCollateralAuctionRoundByCollateralId } from '@/services/judicial/judicial-collateral-auction-round.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import EmptyState from '@/ui/EmptyState'
import { JudicialCollateralAuctionRoundType } from '../../../../../shared/types/judicial/judicial-collateral-auction.type';
import BodyCell from '@/ui/Table/BodyCell'
import { KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE } from './utils/judicial-collateral-auction-round-list.cache'
import paths from 'shared/routes/paths'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import { useState } from 'react'
import DeleteCollateralAuctionRoundModal from '../Modals/DeleteCollateralAuctionRoundModal'


const JudicialCollateralAuctionRoundListTable = () => {
  const navigate = useNavigate()
  const collateralCode = useParams().collateralCode ?? ''
  const [collateralAuctionRoundId, setCollateralAuctionRoundId] = useState<number>(0)

  const codeParams = useParams().code ?? ''
  const {
    client: { customer },
    bank: {
      selectedBank: { idCHB:chb },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<any, Error>>(
    [KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, Number(collateralCode)],
    async () => {
      return await getAllJudicialCollateralAuctionRoundByCollateralId(Number(chb), Number(collateralCode))
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

  const onClickRow = (id: number) => {
    navigate(paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralCode, id.toString()))
  }

  const { hideModal: hideDeleteCollateralAuctionRoundModal, showModal: showDeleteCollateralAuctionRoundModal, visible: visibleDeleteCollateralAuctionRoundModal } = useModal()


  const collateralAuctionRounds = data?.data ?? []

  return (
    <Container width="100%" height="100%" padding="0px 20px 0px 20px">
      <Table
        top="240px"
        columns={judicialCollateralAuctionRoundListColumns}
        isArrayEmpty={!collateralAuctionRounds.length}
        emptyState={
          <EmptyStateCell colSpan={judicialCollateralAuctionRoundListColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron rondas de remate" />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialCollateralAuctionRoundListColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron rondas de remate" />
          </EmptyStateCell>
        }
      >
        {Array.isArray(collateralAuctionRounds) && collateralAuctionRounds.length
          ? collateralAuctionRounds.map((auction: JudicialCollateralAuctionRoundType, index: number) => (
              <tr key={index} onClick={() => onClickRow(auction.id)}>
                <BodyCell textAlign="center">{index + 1}</BodyCell>
                <BodyCell textAlign="center">{auction?.appraisalExperts}</BodyCell>
                <BodyCell textAlign="center">{auction?.auctionType}</BodyCell>
                <BodyCell textAlign="center">{auction?.auctionerName}</BodyCell>
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
                          setCollateralAuctionRoundId(auction?.id)
                          showDeleteCollateralAuctionRoundModal()
                        }}
                        permission="P13-01-06-01-04-04"
                        messageTooltip="Eliminar rueda de remate"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            ))
          : null}
      </Table>
      {visibleDeleteCollateralAuctionRoundModal ? (
        <DeleteCollateralAuctionRoundModal
          isOpen={visibleDeleteCollateralAuctionRoundModal}
          onClose={hideDeleteCollateralAuctionRoundModal}
          id={collateralAuctionRoundId}
        />
      ) : null}
    </Container>
  )
}

export default JudicialCollateralAuctionRoundListTable