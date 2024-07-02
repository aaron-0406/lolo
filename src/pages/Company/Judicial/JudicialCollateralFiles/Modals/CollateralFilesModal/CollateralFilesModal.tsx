import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialCollateralFileResolver } from './CollateralFilesModal.yup'

import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createJudicialCollateralFiles,
  getJudicialCollateralFilesById, 
} from '@/services/judicial/judicial-collateral-files.service'

import collateralFilesCache, { KEY_JUDICIAL_COLLATERAL_FILES_CACHE } from '../../JudicialCollateralFilesTable/utils/judicial-collateral-files.cache'
import notification from '@/ui/notification'
import CollateralFileModalInfo from './CollateralFilesModalInfo'
import { JudicialCollateralFilesType } from '@/types/judicial/judicial-collateral-files.type'
import { useParams } from 'react-router-dom'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const CollateralFiles = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const collateralId = useParams().collateralCode ?? ''
  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<{
    JudicialFiles: JudicialCollateralFilesType[] 
    filesDnD: File[]
  }>({
    resolver: JudicialCollateralFileResolver,
    mode: 'all',
    defaultValues: {
      JudicialFiles: [],
      filesDnD: [],
    },
  })

  const {
    setValue,
    reset,
  } = formMethods

  const { 
    actions: {
      createCollateralFilesCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = collateralFilesCache(queryClient)
  
  const { refetch: refetchJudicialCollateralFile } = useQuery<AxiosResponse<JudicialCollateralFilesType>>(
    [`${KEY_JUDICIAL_COLLATERAL_FILES_CACHE}-GET-BY-ID`, chb],
    async () => {
      return await getJudicialCollateralFilesById(chbNumber, Number(collateralId), id ?? 0)
    },
    {
      onSuccess: (data) => {
        setValue("JudicialFiles", [data.data])
      },
      enabled: false,
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
      },
    }
    
  )

  const { isLoading: isLoadingJudicialCollateralFile, mutate: onCreateJudcialCollateralFileMutate } = useMutation<
    AxiosResponse<JudicialCollateralFilesType[]>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return createJudicialCollateralFiles(
        formMethods.watch('filesDnD'),
        Number(chbNumber),
        Number(collateralId),
      )
    },
    {
      onSuccess: (data) => {
        createCollateralFilesCache(data.data, Number(collateralId), Number(chbNumber))
        notification({ type: 'success', message: 'Archivo creado' }) 
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber, Number(collateralId))
      },
      onSettled:() => {
        onSettledCache(chbNumber, Number(collateralId))
      }, 
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )


  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onCreateJudcialCollateralFile = () => {
    onCreateJudcialCollateralFileMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialCollateralFile()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="judicial-collateral-files-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar Archivo' : 'Agregar Archivo'}
        contentOverflowY="auto"
        size="small"
        minHeight="430px"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={onCreateJudcialCollateralFile}
              loading={ isLoadingJudicialCollateralFile}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P13-01-06-01-03-03' : 'P13-01-06-01-03-02'} 
              disabled={!chbNumber}
            />
          </Container>
        }
      >
        <CollateralFileModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default CollateralFiles