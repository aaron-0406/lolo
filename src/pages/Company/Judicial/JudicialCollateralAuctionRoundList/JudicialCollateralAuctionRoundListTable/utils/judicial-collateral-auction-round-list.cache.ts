import { JudicialCollateralAuctionRoundType } from "@/types/judicial/judicial-collateral-auction.type"
import { QueryClient } from "react-query"
import { AxiosResponse } from "axios"

export const KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE = 'KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE'

type QueryDataType = AxiosResponse<JudicialCollateralAuctionRoundType[]> | undefined

const judicialCollateralAuctionRoundListCache = (queryClient: QueryClient) => {
  const createCollateralAuctionRoundListCache = (data: JudicialCollateralAuctionRoundType, collateralCode: number) => { 
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode], (old) => {
      if (old) return { ...old, data: [...old?.data, data] }
    })
  }

  const editCollateralAuctionRoundListCache = (data: JudicialCollateralAuctionRoundType, collateralCode: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode], (old) => {
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

  const deleteCollateralAuctionRoundListCache = (id: string, collateralCode: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((collateralAuctionRound: JudicialCollateralAuctionRoundType) => collateralAuctionRound.id !== parseInt(id))
        return { ...old, data: dataUpdated }
      }
    })
  } 

  const onRefetchQueryCache = async ( collateralCode: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode])
  }

  const onMutateCache = async (collateralCode: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode])
    }

    return { old }
  }

  const onSettledCache = (collateralCode: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode])
  }

  const onErrorCache = (context: { old: QueryDataType }, collateralCode: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COLLATERAL_AUCTION_ROUND_LIST_CACHE, collateralCode], context.old)
  }

  return {
    actions: {
      createCollateralAuctionRoundListCache,
      editCollateralAuctionRoundListCache,
      deleteCollateralAuctionRoundListCache,
    },
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } 
}

export default judicialCollateralAuctionRoundListCache