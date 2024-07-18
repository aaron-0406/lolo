import Container from "@/ui/Container"
import Table from "@/ui/Table"
import { judicialFileCaseAuctionRoundListColumns } from "./utils/columns"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import notification from "@/ui/notification"
import { getAllJudicialAuctionsRoundByCaseFileId } from "@/services/judicial/judicial-collateral-auction-round.service"
import { useEffect, useState } from "react"
import BodyCell from "@/ui/Table/BodyCell"
import Button from "@/ui/Button"
import { useNavigate, useParams } from "react-router-dom"
import { useLoloContext } from "@/contexts/LoloProvider"
import paths from "shared/routes/paths"
import useModal from "@/hooks/useModal"
import { KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE } from "./utils/judicial-file-case-auction-round-list-table.cache"
import DeleteCaseFileAuctionRoundModal from "../Modals/DeleteCollateralAuctionRoundModal/DeleteCollateralAuctionRoundModal"

type JudicialFileCaseAuctionRoundListTableProps = {
  caseFileId: number
}

const JudicialFileCaseAuctionRoundListTable = ( { caseFileId } : JudicialFileCaseAuctionRoundListTableProps ) => {
  const navigate = useNavigate()
  const codeParams = useParams().code ?? ''
  const [auctionRound, setAuctionRound] = useState<{id: number, collateralId: number}>({id: 0, collateralId: 0})
  const {
    hideModal: hideDeleteCollateralAuctionRoundModal,
    showModal: showDeleteCollateralAuctionRoundModal,
    visible: visibleDeleteCollateralAuctionRoundModal,
  } = useModal()
  const {
    client: { customer },
    
  } = useLoloContext()
  const { data, refetch } = useQuery<AxiosResponse<any, Error>>(
    [KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId],
    async () => {
      return await getAllJudicialAuctionsRoundByCaseFileId(caseFileId)
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

  useEffect(()=>{
    if (caseFileId) {
      refetch()
    }
    // eslint-disable-next-line
  }, [caseFileId])

  const onClickRow = (id: number, collateralId: number) => {
    navigate(paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralId.toString(), id.toString()))
  }

  return (
    <Container width="100%" height="100%" padding="0px 20px 0px 20px">
      <Table
        top="240px"
        columns={judicialFileCaseAuctionRoundListColumns}
        isArrayEmpty={false}
        emptyState={
          <EmptyStateCell colSpan={judicialFileCaseAuctionRoundListColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron rondas de remate" />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialFileCaseAuctionRoundListColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron rondas de remate" />
          </EmptyStateCell>
        }
      >
        {Array.isArray(data?.data) && data?.data.length
          ? data?.data.map((auction: any, index: number) => (
              <tr key={index} 
              onClick={() => onClickRow(auction.id, auction.judicialCollateralIdJudicialCollateral)}
              >
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
                          setAuctionRound({
                            id: auction?.id,
                            collateralId: Number(auction.judicialCollateralIdJudicialCollateral)
                          })
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
        <DeleteCaseFileAuctionRoundModal
          isOpen={visibleDeleteCollateralAuctionRoundModal}
          onClose={hideDeleteCollateralAuctionRoundModal}
          id={auctionRound.id}
          collateralId={auctionRound.collateralId}
          caseFileId={caseFileId}
        />
      ) : null}
    </Container>
  )
}

export default JudicialFileCaseAuctionRoundListTable