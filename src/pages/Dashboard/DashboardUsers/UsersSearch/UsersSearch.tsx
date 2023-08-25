import { Dispatch, FC } from 'react'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { Opts } from '@/ui/Pagination/interfaces'
import UsersModal from '../Modals/UsersModal'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import Label from '@/ui/Label/Label'
import dashUsuariosCache from '../UsersTable/utils/dash-usuarios.cache'
import { useQueryClient } from 'react-query'

type UsersSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const UsersSearch: FC<UsersSearchProps> = ({ opts, setOpts }) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = dashUsuariosCache(queryClient)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      onRefetchQueryCache()
      return
    }

    if (value.length < 3) return

    setOpts({ ...opts, filter: value.trim(), page: 1 })
    onRefetchQueryCache()
  }

  const handleClickModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px" justify-content="space-around">
      <Container width="calc(100% - 60px)" display="flex" justify-content="space-around" margin="0 20px 0 0">
        <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
          <Label label="Buscar:" />
        </Container>
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar usuario por nombre" />
      </Container>
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={handleClickModal} />

      <UsersModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default UsersSearch
