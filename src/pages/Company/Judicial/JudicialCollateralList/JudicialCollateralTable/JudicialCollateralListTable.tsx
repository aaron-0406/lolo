import { judicialCollateralColumns } from './utils/columns'

import Table from '@/ui/Table'
import { useQuery, useMutation } from 'react-query'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider';

type JudicialCollateralListaTableProps = {
  id: number
}

const JudicialCollateralListTable = ({ id }: JudicialCollateralListaTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext(); 

  
  return <Table columns={judicialCollateralColumns}>
    
  </Table>
}

export default JudicialCollateralListTable