import { JudicialCollateralAuctionRoundType } from "@/types/judicial/judicial-collateral-auction.type"
import { QueryClient } from "react-query"
import { AxiosResponse } from "axios"

export const KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE = 'KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE'

type QueryDataType = AxiosResponse<JudicialCollateralAuctionRoundType[]> | undefined

const judicialFileCaseAuctionRoundListCache = (queryClient: QueryClient) => {
  const createFileCaseAuctionRoundListCache = (data: JudicialCollateralAuctionRoundType, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId], (old) => {
      if (old) return { ...old, data: [...old?.data, data] }
    })
  }

  const editFileCaseAuctionRoundListCache = (data: JudicialCollateralAuctionRoundType, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((collateralAuctionRound: JudicialCollateralAuctionRoundType) => {
          if (collateralAuctionRound.id === data.id) {
            return data
          }

          return collateralAuctionRound
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteFileCaseAuctionRoundListCache = (id: string,  caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((collateralAuctionRound: JudicialCollateralAuctionRoundType) => collateralAuctionRound.id !== parseInt(id))
        return { ...old, data: dataUpdated }
      }
    })
  } 

  const onRefetchQueryCache = async (  caseFileId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId])
  }

  const onMutateCache = async ( caseFileId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId])
    }

    return { old }
  }

  const onSettledCache = ( caseFileId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId])
  }

  const onErrorCache = (context: { old: QueryDataType },  caseFileId: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_FILE_CASE_AUCTION_ROUND_LIST_CACHE, caseFileId], context.old)
  }

  return {
    actions: {
      createFileCaseAuctionRoundListCache,
      editFileCaseAuctionRoundListCache,
      deleteFileCaseAuctionRoundListCache,
    },
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } 
}

export default judicialFileCaseAuctionRoundListCache