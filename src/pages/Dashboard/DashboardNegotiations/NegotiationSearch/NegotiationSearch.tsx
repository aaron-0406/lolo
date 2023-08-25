import { Dispatch } from 'react'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { Opts } from '@/ui/Pagination/interfaces'
import { SelectItemType } from '@/ui/Select/interfaces'
import NegotiationModal from '../Modals/NegotiationModal'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import Label from '@/ui/Label/Label'
import Select from '@/ui/Select'
import { useDashContext } from '@/contexts/DashProvider'
import { useQueryClient } from 'react-query'
import dashNegotiationCache from '../NegotiationTable/utils/dash-negociaciones.cache'

type NegotiationSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const NegotiationSearch = ({ opts, setOpts, selectedBank: { chb, setChb } }: NegotiationSearchProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = dashNegotiationCache(queryClient)

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const optionsSelect: Array<SelectItemType> = selectedCustomer.customerBanks.map((customerBank) => {
    return {
      key: String(customerBank.CUSTOMER_HAS_BANK.id),
      label: customerBank.name,
    }
  })

  const onChangeBank = (key: string) => {
    setChb(parseInt(key))
    onRefetchQueryCache(parseInt(key))
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      onRefetchQueryCache(chb)
      return
    }

    if (value.length < 3) return

    setOpts({ ...opts, filter: value.trim(), page: 1 })
    onRefetchQueryCache(chb)
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px">
      <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
        <Label label="Buscar:" />
      </Container>
      <Container width="calc(100% - 60px)" display="flex" justifyContent="space-between" margin="0 20px 0 0">
        <TextField onChange={onChangeSearch} width="70%" placeholder="Buscar negociación por nombre" />
        <Select
          width="28%"
          placeholder="Seleccione un banco "
          options={optionsSelect}
          value={String(chb)}
          onChange={onChangeBank}
        />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={showModalAdd} disabled={!chb} />
      <NegotiationModal visible={visibleModalAdd} onClose={hideModalAdd} chb={chb} />
    </Container>
  )
}

export default NegotiationSearch
