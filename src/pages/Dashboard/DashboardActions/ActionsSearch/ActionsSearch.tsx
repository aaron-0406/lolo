import { Dispatch, FC } from 'react'
import { useQueryClient } from 'react-query'
import TextField from '@/ui/fields/TextField/TextField'
import Container from '@/ui/Container/Container'
import Select from '@/ui/Select/Select'
import Button from '@/ui/Button/Button'
import { useDashContext } from '@/contexts/DashProvider'
import { SelectItemType } from '@/ui/Select/interfaces'
import Label from '@/ui/Label/Label'
import { Opts } from '@/ui/Pagination/interfaces'
import useModal from '@/hooks/useModal'
import ActionModal from '../Modals/ActionsModal/ActionsModal'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import dashAccionesCache from '../ActionsTable/utils/dash-acciones.cache'

type ActionsSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const ActionsSearch: FC<ActionsSearchProps> = ({ opts, setOpts, selectedBank: { chb, setChb } }) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = dashAccionesCache(queryClient)

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const options: Array<SelectItemType> = selectedCustomer.customerBanks.map((customerBank) => {
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

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px">
      <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
        <Label label="Buscar:" />
      </Container>
      <Container width="calc(100% - 60px)" display="flex" justifyContent="space-between" margin="0 20px 0 0">
        <TextField onChange={onChangeSearch} width="70%" placeholder="Buscar cliente por nombre" />
        <Select
          width="28%"
          placeholder="Selecciona un banco"
          value={String(chb)}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={onShowModal} disabled={!chb} />
      <ActionModal visible={visibleModalAdd} onClose={onCloseModal} chb={chb} />
    </Container>
  )
}

export default ActionsSearch
