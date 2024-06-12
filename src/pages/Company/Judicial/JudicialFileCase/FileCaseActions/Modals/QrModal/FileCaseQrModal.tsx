import { useLoloContext } from '@/contexts/LoloProvider'
import { createQrCode } from '@/services/judicial/judicial-file-case.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'

type Props = {
  isVisible: boolean
  onClose: () => void
}

type QrResponse = {
  qrCode: string
}

const FileCaseQrModal = ({ isVisible, onClose }: Props) => {
  const {
    bank: { selectedBank },
  } = useLoloContext()

  const chb = selectedBank.idCHB.length ? parseInt(selectedBank.idCHB) : 0

  const { watch, setValue } = useFormContext()

  const { mutate: CreateQrCode } = useMutation<AxiosResponse<QrResponse>, AxiosError<CustomErrorResponse>>(
    async () => {
      const numberCaseFile = watch('numberCaseFile')
      return await createQrCode(numberCaseFile ?? 0, chb)
    },
    {
      onSuccess: (data) => {
        setValue('qrCode', data.data)
      },
      onError: (error) => {
        throw new Error(error.response?.data.message)
      },
    }
  )

  const handleDownload = () => {
    const qrCode = watch('qrCode')
    const numberCaseFile = watch('numberCaseFile')
    const link = document.createElement('a')
    link.href = qrCode ?? ''
    link.download = `${numberCaseFile}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (!watch('qrCode')) {
      CreateQrCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('id')])

  return (
    <Modal
      id="file-case-qr-modal"
      title="Código QR"
      onClose={onClose}
      visible={isVisible}
      size="small"
      footer={
        <Container width="100%" display="flex" justifyContent="flex-end">
          <Button onClick={handleDownload} label="Descargar" type="button" />
        </Container>
      }
    >
      <Container width="100%" height="250px" display="flex" justifyContent="center" alignItems="center">
        {!watch('qrCode') ? (
          <Text.Body weight="regular" size="m">
            Generando código QR...
          </Text.Body>
        ) : (
          <img src={watch('qrCode') ?? ''} width="50%" alt="Código QR" />
        )}
      </Container>
    </Modal>
  )
}

export default FileCaseQrModal
