import styled from 'styled-components'
import Container from '../Container'

const Spinner = () => {
  return (
    <StyledSpinner display="flex" justifyContent="center" alignItems="center" width="24px" height="24px" readonly>
      <StyledIcon className="ri-loader-4-line spinning" />
    </StyledSpinner>
  )
}

export default Spinner

/**
 * Styled Spinner Component
 * Do not export, use Spinner
 */
const StyledSpinner = styled(Container)`
  font-size: 24px;
`

const StyledIcon = styled.i`
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`
