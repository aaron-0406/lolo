import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import AssignCollateralModalTable from './AssignCollateralModalTable'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { JudicialCaseFileHasCollateralType } from '@/types/judicial/judicial-case-file-has-collateral.type'
import { assingCaseFileToCollateral } from '@/services/judicial/judicial-file-case-has-collateral.service'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { FormProvider, useForm } from 'react-hook-form'
import { AssignCollateralModalType, ModalScheduleNotificationsResolver } from './AssignCollateralModal.yup'
import notification from '@/ui/notification'
import { useLoloContext } from '@/contexts/LoloProvider'

type AssignCollateralModalProps = {
  visible: boolean
  onClose: () => void
  collateralId: number
}

const AssignCollateralModal = ({ visible, onClose, collateralId }: AssignCollateralModalProps) => {
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const defaultValues = {
    judicialCaseFileWithCollateral: [] as Array<JudicialCaseFileType & { hasCollateral: boolean; client: { id: number; name: string } }> , 
  }

  const formMethods = useForm<AssignCollateralModalType>({
    defaultValues,
    resolver: ModalScheduleNotificationsResolver,
    mode: "all", 
  })


  const { isLoading, mutate: assingCaseFileToCollateralMutate } = useMutation<
    AxiosResponse<JudicialCaseFileHasCollateralType[]>,
    AxiosError<CustomErrorResponse>
  >(
    ['ASSIGN_CASE_FILE_TO_COLLATERAL', chb],
    async () => {
      const currentValues = formMethods.getValues("judicialCaseFileWithCollateral")
      const newJudicialCaseFileHasCollateral: Omit<
      JudicialCaseFileHasCollateralType,
      'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
    >[] = []
      currentValues.forEach((caseFile) => {
        if (!caseFile.hasCollateral) return
        newJudicialCaseFileHasCollateral.push({
          judicialCaseFileId: caseFile.id,
          judicialCollateralId: collateralId,
      }) 
    })
      return await assingCaseFileToCollateral(newJudicialCaseFileHasCollateral, Number(collateralId))
    }, 
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
        onClose()
      },
      onSuccess: () => {
        notification({
          type: 'success',
          message: 'Garantía asignada correctamente',
        })
        onClose()
      },
    }
  )

  const onAssingCaseFileToCollateral = () => {
    assingCaseFileToCollateralMutate()
  }

  return (
    <FormProvider {...formMethods}>      
      <Modal
        id="assign-collateral-modal"
        size="medium"
        onClose={onClose}
        visible={visible}
        title="Asignar garantía"
        contentOverflowY='auto'
        footer={<Container width="100%" display="flex" justifyContent="end" alignItems="center" gap="20px" >
          <Button
            width="130px"
            label={greaterThanDesktopS && 'Asignar'}
            shape={greaterThanDesktopS ? 'default' : 'round'}
            size={greaterThanTabletS ? 'default' : 'small'}
            trailingIcon="ri-arrow-left-right-line"
            loading={isLoading}
            onClick={onAssingCaseFileToCollateral} 
            permission={'P13-01-06-01-01'}
            messageTooltip="Asignar garantía"
          />
        </Container>}
      >
        <Container padding="20px" height="calc(100% - 400px)">
          <AssignCollateralModalTable />
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default AssignCollateralModal