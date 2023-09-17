import { Dispatch } from 'react'
import { useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { Opts } from '@/ui/Pagination/interfaces'
import NegotiationModal from '../Modals/NegotiationModal'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import Label from '@/ui/Label/Label'
import extNegotiationCache from '../NegotiationTable/utils/ext-negociaciones.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type NegotiationSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const NegotiationSearch = ({ opts, setOpts }: NegotiationSearchProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = extNegotiationCache(queryClient)

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
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar negociación por nombre" />
      </Container>

      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={showModalAdd} disabled={!chb} />
      <NegotiationModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default NegotiationSearch
