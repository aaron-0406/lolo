import styled, { css } from 'styled-components'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'

type ModalHeaderProps = {
  title?: React.ReactNode | string
  onBack?: () => void
  onClose?: () => void
  backTitle?: string
}

const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
  const { title, onBack, onClose, backTitle = 'Back' } = props

  return (
    <StyledContainerHeader
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="56px"
      padding="8px"
    >
      <Container width="83%" display="flex" alignItems="center" position="absolute">
        <Text.Body size="l" weight="bold" ellipsis>
          {title}
        </Text.Body>
      </Container>

      {onBack && (
        <Container display="flex" alignItems="center" justifyContent="start" width="100%">
          <Button leadingIcon="ri-arrow-left-s-line" hierarchy="tertiary" onClick={onBack} label={backTitle} />
        </Container>
      )}

      {onClose && (
        <Container display="flex" alignItems="center" justifyContent="end" width="100%">
          <Button leadingIcon="ri-close-line" hierarchy="tertiary" shape="round" onClick={onClose} />
        </Container>
      )}
    </StyledContainerHeader>
  )
}

export default ModalHeader

const StyledContainerHeader = styled(Container)`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.Neutral4};
  `}
`
