import { useMutation, useQueryClient } from 'react-query'
import companyTagsCache from '../../TagsTable/utils/company-tags.cache'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteExtTag } from '@/services/extrajudicial/ext-tag.service'
import notification from '@/ui/notification'
import { useLoloContext } from '@/contexts/LoloProvider'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

type DeleteCobranzaTagsModalProps = {
  visible: boolean
  onClose: () => void
  idTag?: number
}

const DeleteCobranzaTagsModal = ({ visible, onClose, idTag = 0 }: DeleteCobranzaTagsModalProps) => {
  const queryClient = useQueryClient()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    actions: { deleteCobranzaTagCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyTagsCache(queryClient)

  const { isLoading: loadingDeleteTag, mutate: deleteTagMutate } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await deleteExtTag(idTag)
    },
    {
      onSuccess: () => {
        deleteCobranzaTagCache(idTag, parseInt(idCHB))
        notification({ type: 'success', message: 'Etiqueta eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(idCHB))
      },
      onSettled: () => {
        onSettledCache(parseInt(idCHB))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(idCHB))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const deleteTag = () => {
    if (idTag !== 0) {
      deleteTagMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la etiqueta?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {<Button onClick={deleteTag} loading={loadingDeleteTag} display="danger" size="default" label="ACEPTAR" />}
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    />
  )
}

export default DeleteCobranzaTagsModal
