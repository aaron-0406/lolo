import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import { Opts } from '@/ui/Pagination/interfaces'
import TextField from '@/ui/fields/TextField'
import { Dispatch } from 'react'
import { useQueryClient } from 'react-query'
import judicialCourtCache from '../CourtTable/utils/ext-court.cache'
import CourtModal from '../Modals/CourtModal'
import { device } from '@/breakpoints/responsive'

type CourtSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CourtSearch = ({ opts, setOpts }: CourtSearchProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = judicialCourtCache(queryClient)

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      onRefetchQueryCache(parseInt(chb))
      return
    }

    if (value.length < 3) return

    setOpts({ ...opts, filter: value.trim(), page: 1 })
    onRefetchQueryCache(parseInt(chb))
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px">
      <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
        <Label label="Buscar:" />
      </Container>
      <Container width="calc(100% - 60px)" display="flex" justifyContent="space-between" margin="0 20px 0 0">
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar juzgado por nombre" />
      </Container>

      <Button
        shape="round"
        leadingIcon="ri-add-fill"
        size="small"
        onClick={showModalAdd}
        disabled={!chb}
        permission="P09-01"
      />
      <CourtModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default CourtSearch
