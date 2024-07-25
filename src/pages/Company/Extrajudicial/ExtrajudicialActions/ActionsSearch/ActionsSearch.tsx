import { Dispatch, FC } from 'react'
import { useQueryClient } from 'react-query'
import TextField from '@/ui/fields/TextField/TextField'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import Label from '@/ui/Label/Label'
import { Opts } from '@/ui/Pagination/interfaces'
import useModal from '@/hooks/useModal'
import ActionModal from '../Modals/ActionsModal/ActionsModal'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import extAccionesCache from '../ActionsTable/utils/ext-acciones.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type ActionsSearchProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const ActionsSearch: FC<ActionsSearchProps> = ({ opts, setOpts }) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const { onRefetchQueryCache } = extAccionesCache(queryClient)

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      onRefetchQueryCache(parseInt(idCHB))
      return
    }

    if (value.length < 3) return

    setOpts({ ...opts, filter: value.trim(), page: 1 })
    onRefetchQueryCache(parseInt(idCHB))
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
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar acción por nombre" />
      </Container>

      <Button
        shape="round"
        leadingIcon="ri-add-fill"
        size="small"
        onClick={onShowModal}
        disabled={!idCHB}
        permission="P07-01"
      />
      <ActionModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default ActionsSearch
