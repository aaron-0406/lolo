import Modal from "@/ui/Modal"
import { FormProvider, useForm } from "react-hook-form"
import { ModalAssingUserToSendReportResolver } from "./AssignUsersToSendReportModal.yup"
import { CompareExcelsUserType, CompareResponse } from "@/types/config/compare-excels.type"
import AssignUsersToSendReportInfo from "./AssignUsersToSendReportInfo"
import Container from "@/ui/Container"
import Button from "@/ui/Button"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { CustomErrorResponse } from "types/customErrorResponse"
import { AxiosError, AxiosResponse } from "axios"
import { sendReportByEmail } from "@/services/config/compare-excels.service"
import notification from "@/ui/notification"

interface CompareExcelModalProps {
  visible: boolean
  onClose: () => void
  fileData: CompareResponse
}

const AssignUsersToSendReportModal = ({ visible, onClose, fileData }: CompareExcelModalProps) => {
  const defaultValues = {
    fileData,
    users: [] as CompareExcelsUserType[]
  }

  const formMethods = useForm<{ fileData:CompareResponse, users: CompareExcelsUserType[] }>({
    defaultValues,
    resolver: ModalAssingUserToSendReportResolver,
  })

  const { setValue } = formMethods

  const { mutate: sendReport } = useMutation<
    AxiosResponse<string>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await sendReportByEmail(fileData, formMethods.getValues().users)
    },
    {
      onSuccess: () => {
        notification({
          type: 'success',
          message: "Reporte enviado correctamente",
        })
      },
      onError: (error) => {
        throw new Error(error.response?.data.message)
      },
    }
  )

  const onSendEmail = () => {
    sendReport()
  }

  useEffect(() => {
    setValue('fileData', fileData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="assign-users-to-send-report"
        title="Asignar usuarios para enviar reporte"
        visible={visible}
        size="large"
        onClose={onClose}
        contentOverflowY="auto"
        footer = {
          <Container display="flex" width="100%" justifyContent="flex-end">
            <Button
              onClick={onSendEmail}
              label = "Enviar reporte"
              trailingIcon="ri-send-plane-fill"
            />
          </Container>
        }
      >
          <AssignUsersToSendReportInfo />
      </Modal>
    </FormProvider>
  )
}

export default AssignUsersToSendReportModal