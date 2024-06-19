import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { departmentColumns } from "./utils/columns"
import { useQuery } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { DistrictType } from "@/types/config/district.type"
import { CustomErrorResponse } from "types/customErrorResponse"
import { getDistricts } from "@/services/config/district.service"
import notification from "@/ui/notification"
import BodyCell from "@/ui/Table/BodyCell"
import { useEffect } from "react"

const DistrictTable = () => {
  const { data, refetch, isLoading } = useQuery<AxiosResponse<Array<DistrictType>>, AxiosError<CustomErrorResponse>>(
    ['DISTRICTS'],
    async () => {
      return await getDistricts()
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

  const districts = data?.data ?? []

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
        {districts && Array.isArray(districts)
          ? districts?.map((department) => (
              <tr key={department.id}>
                <BodyCell textAlign="center">{department.id}</BodyCell>
                <BodyCell textAlign="center">{department.name}</BodyCell>
                <BodyCell textAlign="center">{department.code}</BodyCell>
              </tr> 
            ))
          : null}
      </Table>
    </Container>
  )
}

export default DistrictTable