import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalUsersResolver } from './ModalCustomers.yup'
import { useMutation, useQuery } from 'react-query'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import Checkbox from '../../../../../ui/Checkbox'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const defaultValuesCustomer: Omit<CustomerUserType, 'createdAt'> = {
  id: 0,
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  privilege: '',
  state: true,
  customerId: 0,
}

const UsersModal = ({ visible, onClose }: CustomersModalProps) => {
  const formMethods = useForm<CustomerUserType>({
    resolver: ModalUsersResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomer,
  })

  const {
    setValue,
    getValues,
    control,
    reset,
    formState: { isValid },
  } = formMethods

  const handleClickCloseModal = () => {
    onClose()
  }

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title="Usuarios"
        contentOverflowY="auto"
      ></Modal>
    </FormProvider>
  )
}

export default UsersModal
