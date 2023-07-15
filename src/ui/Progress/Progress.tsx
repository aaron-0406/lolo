import { ProgressProps } from './interfaces'
import Container from '../Container/Container'
import Text from '../Text/Text'

const Progress = ({
  bgColorInit = '#51AB2B',
  bgColorEnd = '#FF7875',
  bgColorMid = '#F3BD5B',
  value = 0,
  quantity,
  onClick,
}: ProgressProps) => {
  return (
    <Container onClick={onClick} width="100%" display="flex" flexDirection="row" gap="10px" alignItems="center">
      <Container backgroundColor="#b1b1b1" height="30px" width="100%">
        <Container
          height="30px"
          width={`${value}%`}
          display="flex"
          alignItems="center"
          padding={value !== 0 ? '0px 10px' : ''}
          backgroundColor={value < 33 ? bgColorInit : value > 33 && value < 66 ? bgColorMid : bgColorEnd}
        >
          {quantity ? quantity : <></>}
        </Container>
      </Container>
      <Container>
        <Text.Number style={{ whiteSpace: 'nowrap' }} size="m" weight="bold">{`${value} %`}</Text.Number>
      </Container>
    </Container>
  )
}

export default Progress
