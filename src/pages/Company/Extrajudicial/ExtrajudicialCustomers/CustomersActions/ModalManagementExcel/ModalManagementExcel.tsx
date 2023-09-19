import { useState } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import notification from '@/ui/notification'
import { generateExcelOnDailyManagementService } from '@/services/extrajudicial/client.service'
import DatePicker from '@/ui/DatePicker/DatePicker'
import moment from 'moment'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button'
import { useLoloContext } from '@/contexts/LoloProvider'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { CustomErrorResponse } from 'types/customErrorResponse'

const ModalManagementExcel = () => {
  const {
    city: { cities },
    bank: { selectedBank },
  } = useLoloContext()

  const [currentCityId, setCurrentCityId] = useState<string>('')
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'))
  const [loadingGenerateExcel, setLoadingGenerateExcel] = useState<boolean>(false)

  const { mutate: generateExcel } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await generateExcelOnDailyManagementService(
        moment(currentDate, 'DD-MM-YYYY').toDate(),
        parseInt(currentCityId)
      )
    },
    {
      onSuccess: ({ data }) => {
        const blob = new Blob([data], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'archivo.xlsx'
        a.click()

        setLoadingGenerateExcel(false)

        notification({
          type: 'success',
          message: 'Excel generado',
        })
      },
      onError: (error) => {
        setLoadingGenerateExcel(false)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const optionsCities: Array<SelectItemType> = cities.map((city) => {
    return {
      key: String(city.id),
      label: city.name,
    }
  })

  const onGenerateExcel = () => {
    setLoadingGenerateExcel(true)
    generateExcel()
  }

  return (
    <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="10px">
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

      <Select
        width="100%"
        label="Ciudad"
        value={currentCityId}
        options={optionsCities}
        onChange={(key) => {
          setCurrentCityId(key)
        }}
        hasError={!currentCityId.length}
      />

      <Button
        width="100%"
        label="Generar Excel"
        trailingIcon="ri-file-excel-line"
        onClick={onGenerateExcel}
        loading={loadingGenerateExcel}
        disabled={!selectedBank.idBank || !currentCityId.length}
      />
    </Container>
  )
}

export default ModalManagementExcel
