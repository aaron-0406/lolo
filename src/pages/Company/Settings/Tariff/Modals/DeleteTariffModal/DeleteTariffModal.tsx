import { TariffType } from '@/types/config/tariff.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { TariffModalType } from '../../Tariff'
import tariffCache from '../../utils/tariff.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteTariff } from '@/services/config/tariff.service'
import notification from '@/ui/notification'

type DeleteTariffModalProps = {
  visible: boolean
  onClose: () => void
  tariff?: TariffType  
  type?: string
}

const DeleteTariffModal = ( { visible, onClose, tariff, type } : DeleteTariffModalProps) => {
  const queryClient = useQueryClient()
  const { bank: { selectedBank: { idCHB: chb } } } = useLoloContext()
  const { actions: { deleteTariffCache } } = tariffCache(queryClient)

  const { isLoading: loadingDeleteTariff, mutate: deleteTariffMutate } = useMutation<
    AxiosResponse<any>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteTariff(tariff?.id ?? 0)
    },
    {
      onSuccess: (result) => {
        if (type === TariffModalType.customTariff) deleteTariffCache(Number(result.data), Number(chb), 'customTariff')
        onClose()
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onDeleteTariff = () => {
    deleteTariffMutate()
  }


  return (
    <Modal
      id="delete-tariff-modal"
      title="Eliminar tarifa"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      contentOverflowY="auto"
      size="small"
      minHeight="140px"
      footer={
        <Container display="flex" flexDirection="row" width="100%" justifyContent="end" alignItems="center" gap="20px">
          <Button
            width="125px"
            label="Eliminar"
            display="danger"
            trailingIcon="ri-delete-bin-line"
            onClick={onDeleteTariff}
            loading={loadingDeleteTariff}
          />
        </Container>
      }
    >
      <Container display="flex" flexDirection="column" gap="10px" justifyContent="start" padding="20px">
        <Text.Body size="m" weight="bold">
          ¿Está seguro de eliminar la tarifa?
        </Text.Body>
        <Text.Body size="s" weight="regular">
          Código: {tariff?.code ?? '-'}
        </Text.Body>
      </Container>
    </Modal>
  )
}

export default DeleteTariffModal