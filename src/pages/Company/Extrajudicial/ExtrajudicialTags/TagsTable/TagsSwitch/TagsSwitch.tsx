import { updateExtTagAction } from '@/services/extrajudicial/ext-tag.service'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import Switch from '@/ui/Switch'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import companyTagsCache from '../utils/company-tags.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type TagsCheckboxProps = {
  id: number
  value: boolean
  groupName: string
}

const TagsSwitch = ({ id, value, groupName }: TagsCheckboxProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const {
    actions: { editCobranzaTagCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyTagsCache(queryClient)

  const { mutate: editCobranzaTag } = useMutation<AxiosResponse<ExtTagType>, AxiosError<CustomErrorResponse>>(
    async () => {
      return await updateExtTagAction(id, !value)
    },
    {
      onSuccess: (result) => {
        editCobranzaTagCache({ ...result.data, extTagGroup: { name: groupName } })

        if (result.data.action) {
          notification({ type: 'success', message: 'Acciones activadas' })
        } else {
          notification({ type: 'success', message: 'Acciones desactivadas' })
        }
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

  const onChange = () => {
    editCobranzaTag()
  }

  return <Switch checked={value} onChange={onChange} />
}

export default TagsSwitch
