import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { device } from '@/breakpoints/responsive'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { postDashboardXslx } from '@/services/extrajudicial/dashboard.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { DashFormType } from '../hookform.type'
import Modal from '@/ui/Modal'
import useModal from '@/hooks/useModal'
import ModalUsers from './ModalUsers'

type FormProps = {
  setLoading: (load: boolean) => void
}

const Form = ({ setLoading }: FormProps) => {
  const [file, setFile] = useState<File>()
  const [loading, setloading] = useState<boolean>(false)
  const { setValue } = useFormContext<DashFormType>()
  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()

  const { visible: visibleModalUsers, showModal: showModalUsers, hideModal: hideModalUsers } = useModal()

  // eslint-disable-next-line
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0])
  }

  const handleSubmitForm = async () => {
    if (!file) return
    try {
      setloading(true)
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('customerId', String(id))
      const { data } = await postDashboardXslx(formData)
      notification({
        message: 'Datos procesados correctamente',
        type: 'success',
      })
      setloading(false)
      setLoading(false)
      const { clientsAdded, clientsDeleted, productsAdded, productsCastigo, productsDeleted } = data
      setValue('clientsAdded', clientsAdded)
      setValue('clientsDeleted', clientsDeleted)
      setValue('productsAdded', productsAdded)
      setValue('productsDeleted', productsDeleted)
      setValue('productsCastigo', productsCastigo)
    } catch (error: any) {
      setloading(false)
      setLoading(false)
      notification({
        message: error.message,
        type: 'error',
      })
    }
  }

  return (
    <Container display="flex" padding="10px 0 0 0" justifyContent="center" alignItems="center" gap="20px">
      {/* <InputFile onChange={handleChangeInput}></InputFile> */}
      <Button
        onClick={handleSubmitForm}
        label={greaterThanDesktopS && 'Enviar Archivo'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        leadingIcon="ri-send-plane-fill"
        loading={loading}
        disabled={loading}
      />
      <Button
        onClick={showModalUsers}
        label={greaterThanDesktopS && 'Enviar Email'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        leadingIcon="ri-mail-send-line"
        loading={loading}
        disabled={loading}
      />
      <Modal
        id="modal-usuarios"
        title="Usuarios"
        visible={visibleModalUsers}
        onClose={hideModalUsers}
        contentOverflowY="auto"
      >
        <ModalUsers />
      </Modal>
    </Container>
  )
}

export default Form
