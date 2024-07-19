import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { departmentColumns } from "./utils/columns"
import { useQuery } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { DepartmentType } from "@/types/config/department.type"
import { CustomErrorResponse } from "types/customErrorResponse"
import { getDepartments } from "@/services/config/department.service"
import notification from "@/ui/notification"
import BodyCell from "@/ui/Table/BodyCell"
import { useEffect } from "react"

const DepartmentTable = () => {
  const { data, refetch, isLoading } = useQuery<AxiosResponse<Array<DepartmentType>>, AxiosError<CustomErrorResponse>>(
    ['DEPARTMENTS'],
    async () => {
      return await getDepartments()
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

  const departments = data?.data ?? []

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
        {departments && Array.isArray(departments)
          ? departments?.map((department) => (
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

export default DepartmentTable