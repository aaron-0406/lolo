import Button from '../../../ui/Button'
import Checkbox from '../../../ui/Checkbox'
import Container from '../../../ui/Container'
import RadioButton from '../../../ui/RadioButton'

export const HomeContainer = () => {
  return (
    <>
      <Container display='flex' flexWrap='wrap' padding='20px'>
        <Button content='Button' />
      </Container>
      <Container display='flex' gap='10px' flexWrap='wrap' padding='20px'>
        <Checkbox />
        <Checkbox isDisabled />
        <RadioButton />
        <RadioButton isDisabled />
      </Container>
    </>
  )
}
