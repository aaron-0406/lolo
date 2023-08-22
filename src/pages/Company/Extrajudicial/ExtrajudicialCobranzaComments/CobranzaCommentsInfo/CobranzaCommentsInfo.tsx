import React, { FC, useState } from 'react'
import Container from '../../../../../ui/Container/Container'
import Label from '../../../../../ui/Label/Label'
import Text from '../../../../../ui/Text'
import { useQuery } from 'react-query'
import { getClientByCode } from '../../../../../shared/services/extrajudicial/client.service'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { useFormContext } from 'react-hook-form'
import { ClientType } from '../../../../../shared/types/extrajudicial/client.type'
import Button from '../../../../../ui/Button/Button'
import useModal from '../../../../../shared/hooks/useModal'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
// import CobranzaCommentModal from '../Modals/CobranzaCommentsModal'

type CobranzaCommentsInfoProps = {
  code: string | undefined
  chb: string
}

const CobranzaCommentsInfo: FC<CobranzaCommentsInfoProps> = ({ code, chb }) => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }





  // const {
  //   customerUser: { user },//gestor
  //   managementAction: { managementActions },
  // } = useLoloContext()

  const {
      bank: { selectedBank:{idCHB} },
    } = useLoloContext()

    const { data } = useQuery(
      'get-client-by-id',
      async () => {
        return getClientByCode(String(code), idCHB)
      }
      // {
      //   onSuccess: ({ data }) => {
      //     if (!!data) {
            
      //       const name= data.name
      //       // setValue('id', data.id)
      //       // setValue('codeAction', data.codeAction)
      //       // setValue('nameAction', data.nameAction)
      //       // setValue('codeSubTypeManagement', data.codeSubTypeManagement)
      //     } 
      //   },
      //   // enabled: false,
      // }
    )


  return (
    <Container display="flex" flexDirection="row" gap="20px" justifyContent='space-between'>
      <Container display="flex" flexDirection="row" gap="20px"  alignItems='center'>
        <Label label="Codigo: "></Label>
        <Text.Body size="l" weight="regular" ellipsis>
          {code}
        </Text.Body>
        <Text.Body size="l" weight="bold" ellipsis>
          /
        </Text.Body>
        <Text.Body size="l" weight="regular" ellipsis>
          {data?.data}
        </Text.Body>
      </Container>

      <Container>
        <Button
          // onClick={onAddComment}
          onClick={onShowModal}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
        />
        <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} chb={Number(chb)} />
      </Container>
    </Container>
  )
}

export default CobranzaCommentsInfo
