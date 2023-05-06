import { FC } from 'react'
import Container from '../../../../../../../ui/Container'
import Text from '../../../../../../../ui/Text'
import { ModalUserRowProps } from './ModalUserRowType'
import Checkbox from '../../../../../../../ui/Checkbox'
import { UserFormType } from '../hookforms.type'
import { useFormContext } from 'react-hook-form'

const ModalUserRow: FC<ModalUserRowProps> = (props) => {
  const { setValue, watch } = useFormContext<UserFormType>()
  const { user } = props
  return (
    <Container display="flex" flexDirection="row" justifyContent="space-between">
      <Text.Body size="m" weight="regular">
        {user.name}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        {user.lastName}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        {user.email}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        {user.phone}
      </Text.Body>
      <Checkbox
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) {
            setValue('users', [...watch('users'), user.id])
            return
          }
          setValue(
            'users',
            watch('users').filter((item) => item !== user.id)
          )
        }}
      />
    </Container>
  )
}

export default ModalUserRow
