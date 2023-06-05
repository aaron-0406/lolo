import { useState } from 'react'
import { useMutation } from 'react-query'
import notification from '../../../../../ui/notification'
import { generateExcelOnDailyManagementService } from '../../../../../shared/services/client.service'
import DatePicker from '../../../../../ui/DatePicker/DatePicker'
import moment from 'moment'
import Container from '../../../../../ui/Container/Container'
import Button from '../../../../../ui/Button'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'

const ModalManagementExcel = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext()

  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'))

  const { mutate: generateExcel } = useMutation<any, Error>(
    async () => {
      return await generateExcelOnDailyManagementService(moment(currentDate, 'DD-MM-YYYY').toDate())
    },
    {
      onSuccess: ({ data }) => {
        const blob = new Blob([data], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'archivo.xlsx'
        a.click()

        notification({
          type: 'success',
          message: 'Excel generado',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: 'No se encontraron suficientes gestiones para exportar.',
        })
      },
    }
  )

  const onGenerateExcel = () => {
    generateExcel()
  }

  return (
    <Container width="100%" padding="20px">
      <DatePicker
        required
        label="Fecha"
        selectedDate={currentDate}
        placeholder="Ingrese la fecha"
        dateFormat="DD-MM-YYYY"
        value={currentDate}
        getDate={(e) => {
          setCurrentDate(e)
        }}
      />

      <Button
        width="100%"
        label="Generar Excel"
        trailingIcon="ri-file-excel-line"
        onClick={onGenerateExcel}
        disabled={!selectedBank.idBank}
      />
    </Container>
  )
}

export default ModalManagementExcel
