import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import { useQuery } from 'react-query'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'

const BankActions = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  return (
    <Container width="10%" justifyContent="center" display="flex" alignItems="center" flexDirection="column">
      <Button style={{ marginBottom: '10px' }} size="small" shape="round" trailingIcon="ri-arrow-right-line"></Button>
      <Button style={{ marginTop: '10px' }} size="small" shape="round" trailingIcon="ri-arrow-left-line"></Button>
    </Container>
  )
}

export default BankActions
