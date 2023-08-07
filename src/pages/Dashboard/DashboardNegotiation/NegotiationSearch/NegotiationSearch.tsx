import { Dispatch } from 'react'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { Opts } from '../../../../ui/Pagination/interfaces'
import { SelectItemType } from '../../../../ui/Select/interfaces'
import NegotiationModal from '../Modals/NegotiationModal'
import Button from '../../../../ui/Button'
import useModal from '../../../../shared/hooks/useModal'
import Label from '../../../../ui/Label/Label'
import Select from '../../../../ui/Select'
import { useDashContext } from '../../../../shared/contexts/DashProvider'

type NegotiationSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChbGlobal: (chb: number) => void }
}

const NegotiationSearch = ({ opts, setOpts, selectedBank: { chb, setChbGlobal } }: NegotiationSearchProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const optionsSelect: Array<SelectItemType> = selectedCustomer.customerBanks.map((customerBank) => {
    return {
      key: String(customerBank.CUSTOMER_HAS_BANK.id),
      label: customerBank.name,
    }
  })

  const onChangeBank = (key: string) => {
    setChbGlobal(parseInt(key))
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      return
    }
    if (value.length < 3) return
    setOpts({ ...opts, filter: value.trim(), page: 1 })
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px">
      <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
        <Label label="Buscar:" />
      </Container>
      <Container width="calc(100% - 60px)" display="flex" justifyContent="space-between" margin="0 20px 0 0">
        <TextField onChange={onChangeSearch} width="70%" placeholder="Buscar negociación por nombre" />
        <Select width="28%" options={optionsSelect} value={String(chb)} onChange={onChangeBank} />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={showModalAdd} />
      <NegotiationModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default NegotiationSearch
