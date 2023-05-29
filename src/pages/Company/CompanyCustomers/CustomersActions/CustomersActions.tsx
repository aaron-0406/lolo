import React, { Dispatch, FC } from 'react'
import styled, { css } from 'styled-components'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Select from '../../../../ui/Select'
import { SelectItemType } from '../../../../ui/Select/interfaces'
import Button from '../../../../ui/Button/Button'
import { useMutation } from 'react-query'
import notification from '../../../../ui/notification'
import { DOMAIN } from '../../../../shared/utils/constant/api'
import { generateExcelOnDailyManagementService } from '../../../../shared/services/client.service'

type CustomerActionsProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CustomersActions: FC<CustomerActionsProps> = ({ opts, setOpts }) => {
  const {
    client: { customer },
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext()

  const { mutate: generateExcel } = useMutation<any, Error>(
    async () => {
      return await generateExcelOnDailyManagementService()
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
          message: error.response.data.message,
        })
      },
    }
  )

  const options: Array<SelectItemType> = customer.customerBanks.map((bank) => {
    return {
      key: String(bank.id),
      label: bank.name,
    }
  })

  const onChangeBank = (key: string) => {
    const customerBank = customer.customerBanks.find((customerBank) => String(customerBank.id) === key)

    setSelectedBank({
      idBank: key,
      idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
    })
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') return setOpts({ ...opts, filter: '', page: 1 })
    if (value.length < 3) return
    return setOpts({ ...opts, filter: value.trim(), page: 1 })
  }

  const onGenerateExcel = () => {
    generateExcel()
  }

  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" alignItems="center" padding="20px" gap="20px">
      <Container className="actions__textfield" width="100%" display="flex" alignItems="center" gap="10px">
        <TextField
          onChange={onChangeSearch}
          width="100%"
          label="Buscar cliente:"
          placeholder="Buscar cliente por nombre"
        />

        <Button
          width="100px"
          shape="round"
          trailingIcon="ri-file-excel-line"
          onClick={onGenerateExcel}
          disabled={!selectedBank.idBank}
        />
      </Container>

      <Container className="actions__select" width="100%">
        <Select
          width="100%"
          label="Seleccionar banco:"
          value={selectedBank.idBank}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
    </StyledContainer>
  )
}

export default CustomersActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      flex-direction: row;

      .actions__textfield .actions_select {
        width: 50%;
      }
    }

    @media ${theme.device.tabletL} {
      .actions__textfield {
        width: 60%;
      }

      .actions__select {
        width: 40%;
      }
    }

    @media ${theme.device.desktopS} {
      .actions__textfield {
        width: 70%;
      }

      .actions__select {
        width: 30%;
      }
    }
  `}
`
