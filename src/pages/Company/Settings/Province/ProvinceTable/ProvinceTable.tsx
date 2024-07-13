import { departmentColumns } from "./utils/columns"
import { useQuery } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ProvinceType } from "@/types/config/province.type"
import { CustomErrorResponse } from "types/customErrorResponse"
import { useEffect } from "react"
import { getProvinces } from "@/services/config/province.service"

import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyState from "@/ui/EmptyState"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import notification from "@/ui/notification"
import BodyCell from "@/ui/Table/BodyCell"

const ProvinceTable = () => {
  const { data, refetch, isLoading } = useQuery<AxiosResponse<Array<ProvinceType>>, AxiosError<CustomErrorResponse>>(
    ['PROVINCE'],
    async () => {
      return await getProvinces()
    },
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  ) 

  const provinces = data?.data ?? []

  useEffect(()=>{
    refetch()
    // eslint-disable-next-line
  },[])

  return (
    <Container width="100%" height="100%" padding="20px">
      <Table
        top="135px"
        columns={departmentColumns}
        isArrayEmpty={false}
        loading={isLoading}
        emptyFirstState={
          <EmptyStateCell colSpan={departmentColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron departamentos" />
          </EmptyStateCell>
        }
      >
        {provinces && Array.isArray(provinces)
          ? provinces?.map((province) => (
              <tr key={province.id}>
                <BodyCell textAlign="center">{province.id}</BodyCell>
                <BodyCell textAlign="center">{province.name}</BodyCell>
                <BodyCell textAlign="center">{province.code}</BodyCell>
              </tr> 
            ))
          : null}
      </Table>
    </Container>
  )
}

export default ProvinceTable