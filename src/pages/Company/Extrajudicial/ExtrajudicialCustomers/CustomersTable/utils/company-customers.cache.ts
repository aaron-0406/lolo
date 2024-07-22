import { ClientType } from '@/types/extrajudicial/client.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE = 'key-cobranza-url-customer-code-cache'

type QueryDataType = AxiosResponse<{ quantity: number; clients: ClientType[] }> | undefined

const companyCustomersCache = (queryClient: QueryClient) => {
  const createCobranzaCustomerCache = (data: ClientType) => {
    queryClient.setQueryData<QueryDataType>(
      [`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${data.isArchived}`, data.customerHasBankId],
      (old) => {
        if (old) {
          return { ...old, data: { ...old.data, clients: [data, ...old.data.clients] } }
        }
      }
    )
  }

  const editCobranzaCustomerCache = (data: ClientType) => {
    queryClient.setQueryData<QueryDataType>(
      [`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${data.isArchived}`, data.customerHasBankId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.clients.map((client: ClientType) => {
            if (client.id === data.id) {
              return data
            }

            return client
          })

          return { ...old, data: { ...old.data, clients: dataUpdated } }
        }
      }
    )
  }

  const transferClientCobranzaCustomerCache = ({
    id,
    chb,
    chbTransferred,
    archived,
  }: {
    id: number
    chb: number
    chbTransferred: number
    archived: boolean
  }) => {
    queryClient.setQueryData<QueryDataType>([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.clients.map((client: ClientType) => {
          if (client.id === id) {
            return { ...client, chbTransferred }
          }

          return client
        })

        return { ...old, data: { ...old.data, clients: dataUpdated } }
      }
    })
  }

  const archivedCobranzaCustomerCache = (customers: ClientType[], chb: number) => {
    const cacheKeyNotArchived = `${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${false}`;
    const cacheKeyArchived = `${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${true}`;
  
    customers.forEach((customer) => {
      const { id, isArchived } = customer;
      
      if (isArchived) {
        queryClient.setQueryData<QueryDataType>([cacheKeyNotArchived, chb], (old) => {
          if (old) {
            const updatedClients = old.data.clients.filter((c: ClientType) => c.id !== Number(id));
            return { ...old, data: { ...old.data, clients: updatedClients } };
          }
          return old;
        });
      }
  
      if (!isArchived) {
        queryClient.setQueryData<QueryDataType>([cacheKeyArchived, chb], (old) => {
          if (old) {
            const updatedClients = old.data.clients.filter((c: ClientType) => c.id !== Number(id));
            return { ...old, data: { ...old.data, clients: updatedClients } };
          }
          return old;
        });
      }
    });
  };
  

  const deleteCobranzaCustomerCache = (clientId: number, customerHasBankId: number, archived: boolean) => {
    queryClient.setQueryData<QueryDataType>(
      [`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.clients.filter((customer: ClientType) => customer.id !== clientId)
          return { ...old, data: { ...old.data, clients: dataUpdated } }
        }
      }
    )
  }

  const onRefetchQueryCache = async (customerHasBankId: number, archived: boolean) => {
    await queryClient.refetchQueries([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId])
  }

  const onMutateCache = async (customerHasBankId: number, archived: boolean) => {
    const old = queryClient.getQueryData([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId])
    if (!old) {
      await queryClient.prefetchQuery([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId])
    }

    return { old }
  }

  const onSettledCache = (customerHasBankId: number, archived: boolean) => {
    queryClient.cancelQueries([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId])
  }

  const onErrorCache = (context: { old: QueryDataType }, customerHasBankId: number, archived: boolean) => {
    queryClient.setQueryData([`${KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE}-${archived}`, customerHasBankId], context.old)
  }

  return {
    actions: {
      createCobranzaCustomerCache,
      editCobranzaCustomerCache,
      transferClientCobranzaCustomerCache,
      archivedCobranzaCustomerCache, 
      deleteCobranzaCustomerCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyCustomersCache
