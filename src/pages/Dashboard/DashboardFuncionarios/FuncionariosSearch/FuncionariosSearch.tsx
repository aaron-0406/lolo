import { Dispatch, FC } from 'react'
import TextField from '@/ui/fields/TextField/TextField'
import Container from '@/ui/Container/Container'
import Select from '@/ui/Select/Select'
import Button from '@/ui/Button/Button'
import { useDashContext } from '@/contexts/DashProvider'
import { SelectItemType } from '@/ui/Select/interfaces'
import Label from '@/ui/Label/Label'
import { Opts } from '@/ui/Pagination/interfaces'
import useModal from '@/hooks/useModal'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { useQueryClient } from 'react-query'
import dashFuncionariosCache from '../FuncionariosTable/utils/dash-funcionarios.cache'
import FuncionariosModal from '../Modals/FuncionariosModal'

type FuncionariosSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const FuncionariosSearch: FC<FuncionariosSearchProps> = ({ opts, setOpts, selectedBank: { chb, setChb } }) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = dashFuncionariosCache(queryClient)

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
          placeholder="Seleccione un banco "
          value={String(chb)}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={onShowModal} disabled={!chb} />
      <FuncionariosModal visible={visibleModalAdd} onClose={onCloseModal} chb={chb} />
    </Container>
  )
}

export default FuncionariosSearch
