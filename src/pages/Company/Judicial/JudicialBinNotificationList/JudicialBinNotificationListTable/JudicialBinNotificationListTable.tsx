import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { useQuery } from "react-query"
import { judicialBinNotificationListColumns } from "./utils/columns"
import { useLoloContext } from "@/contexts/LoloProvider"
import { getAllNotificationsByBinnacleId } from "@/services/judicial/judicial-bin-notification.service"
import { useParams } from "react-router-dom"

const JudicialBinNotificationListTable = () => {
  const binnacleCode = useParams()?.binnacleCode ?? ''
  
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext(); 

  const { data, isLoading } = useQuery(
    ['key-judicial-bin-notification-list', parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllNotificationsByBinnacleId(parseInt(binnacleCode ? binnacleCode : '0'))
    }
  )


  console.log(data)
  return (
    <Container width="100%" height="100%" padding="0px 20px 0px 20px">
      <Table
        top="190px"
        loading={isLoading}
        columns={judicialBinNotificationListColumns}
        isArrayEmpty={data?.data.length}
        emptyState={
          <EmptyStateCell colSpan={judicialBinNotificationListColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron expedientes, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
            />
          </EmptyStateCell>
        }
      >

      </Table>
    </Container>
  )
}

export default JudicialBinNotificationListTable