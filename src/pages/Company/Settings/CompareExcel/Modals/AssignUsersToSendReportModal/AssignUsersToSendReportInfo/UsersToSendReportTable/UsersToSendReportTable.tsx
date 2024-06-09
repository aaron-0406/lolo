import { CustomerUserType } from "@/types/dash/customer-user.type"
import Container from "@/ui/Container"
import Table from "@/ui/Table"
import { usersColumns } from "./utils/columns" 
import BodyCell from "@/ui/Table/BodyCell"
import Checkbox from "@/ui/Checkbox"
import { useFormContext } from "react-hook-form"
import { CompareExcelsUserType } from "@/types/config/compare-excels.type"
import { useEffect, useState } from "react"

type UsersToSendReportTableProps = {
  users: CustomerUserType[]
  isLoading: boolean
}

const UsersToSendReportTable = ({users, isLoading}: UsersToSendReportTableProps) => {
  
  const { getValues, setValue } = useFormContext<{users: CompareExcelsUserType[] }>()
  const data = getValues('users')
  const [ usersList, setUsersList ] = useState<CompareExcelsUserType[]>([])
  const onSetUserToSendReport = (idUser: number) => {
    const isAssigned = usersList.some((user: CompareExcelsUserType) => user.id === idUser)
    if(!isAssigned){
      const data = users.find((user: CustomerUserType) => user.id === idUser) as CompareExcelsUserType;
      const newAssignedArray = [...usersList, {
        id: data?.id,
        name: data?.name,
        lastName: data?.lastName,
        email: data?.email,
        state: data?.state
      }]
      setUsersList(newAssignedArray)
    }
    else{
      const newDeallocatedArray = usersList.filter(
        (user: CompareExcelsUserType) =>
          user.id !== idUser
      )
      setUsersList(newDeallocatedArray)
    }
  }

  useEffect(() => {
    setValue('users', usersList)
    // eslint-disable-next-line
  }, [usersList]) 
  
  return (
    <Container width="100%" height="100%">
      <Table columns={usersColumns} loading={isLoading}>
        {users && users?.length
          ? users.map((record: CustomerUserType, index: number) => (
              <tr key={index}>
                <BodyCell textAlign="center">
                  <Checkbox
                    checked={usersList.some((user: CompareExcelsUserType) => user.id === record.id)}
                    onChange={() => onSetUserToSendReport(record.id)}
                  />
                </BodyCell>
                <BodyCell textAlign="center">{record.name || ''}</BodyCell>
                <BodyCell textAlign="center">{record.lastName || ''}</BodyCell>
                <BodyCell textAlign="center">{record.role?.name || ''}</BodyCell>
                <BodyCell textAlign="center">{record.state ? 'activo' : 'inactivo'}</BodyCell>
              </tr>
            ))
          : null}
      </Table>
    </Container>
  )
}

export default UsersToSendReportTable