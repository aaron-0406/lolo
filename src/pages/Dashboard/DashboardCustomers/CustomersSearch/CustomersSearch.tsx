import { Dispatch, FC } from 'react'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { Opts } from '../../../../ui/Pagination/interfaces'
import CustomersModal from '../Modals/CustomersModal'
import Button from '../../../../ui/Button'
import useModal from '../../../../shared/hooks/useModal'
import Label from '../../../../ui/Label/Label'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  setLoadingGlobal: (state: boolean) => void
}

const CustomersSearch: FC<CustomersTableProps> = ({ opts, setOpts, setLoadingGlobal }) => {
  
  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') return setOpts({ ...opts, filter: '', page: 1 })
    if (value.length < 3) return
    return setOpts({ ...opts, filter: value.trim(), page: 1 })
  }

  const handleClickButton = () => {
    showModalAdd()
  }

  const handleClickModal = () => {
    setLoadingGlobal(true)
    hideModalAdd()
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px" justify-content="space-around">
      <Container
        width="calc(100% - 60px)"
        display="flex"
        justify-content="space-around"
        className="search__textfield"
        margin="0 20px 0 0"
      >
        <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
          <Label label="Buscar:" />
        </Container>
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar cliente por nombre" />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={handleClickButton} />
      <CustomersModal visible={visibleModalAdd} onClose={handleClickModal} />
    </Container>
  )
}
export default CustomersSearch
