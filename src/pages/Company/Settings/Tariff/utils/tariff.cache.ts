import { TariffType } from '@/types/config/tariff.type';
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { TariffTypeResponse } from '../Tariff';

export const KEY_TARIFF_CACHE = 'key-get-all-tariff-by-chb'


type QueryDataType = AxiosResponse<TariffTypeResponse> | undefined 

const tariffCache = (queryClient: QueryClient) => {

  const createTariffCache = (data: TariffType, chb: number, type: keyof TariffTypeResponse) => {
    queryClient.setQueryData<QueryDataType>([KEY_TARIFF_CACHE, chb], (old) => {
      if (old) {
        return {
          ...old,
          data: {
            ...old.data,
            [type]: [...(old.data[type] as TariffType[]), data],
          },
        }
      }
    })
  }

  const editTariffCache = (data: TariffType, chb: number, type: keyof TariffTypeResponse) => {
    queryClient.setQueryData<QueryDataType>([KEY_TARIFF_CACHE, chb], (old) => {
      console.log(old)
      if (old && Array.isArray(old.data[type])) {
        const dataUpdated = (old.data[type] as TariffType[]).map((tariff) => {
          if (tariff.id === data.id) {
            return data;
          }
          return tariff;
        });
  
        return {
          ...old,
          data: {
            ...old.data,
            [type]: dataUpdated,
          },
        };
      }
      return old;
    });
  };

  const deleteTariffCache = (id: number, chb: number, type: keyof TariffTypeResponse) => {
    queryClient.setQueryData<QueryDataType>([KEY_TARIFF_CACHE, chb], (old) => {
      if (old && Array.isArray(old.data[type])) {
        const dataUpdated = (old.data[type] as TariffType[]).filter(
          (tariff) => tariff.id !== id
        );
        return {
          ...old,
          data: {
            ...old.data,
            [type]: dataUpdated,
          },
        }
      }
      return old;
    });
  };

  const getTariffCache = (chb: number): QueryDataType => {
    return queryClient.getQueryData<QueryDataType>([KEY_TARIFF_CACHE, chb])
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_TARIFF_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_TARIFF_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_TARIFF_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_TARIFF_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_TARIFF_CACHE, chb], context.old)
  }

  return {
    actions: { 
      createTariffCache,
      editTariffCache,
      deleteTariffCache,
      getTariffCache, 
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default tariffCache
