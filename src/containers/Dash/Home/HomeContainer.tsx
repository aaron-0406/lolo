/* import Button from '../../../ui/Button' */
import Container from '../../../ui/Container'
import { Input } from '../../../ui/Input/Input'

export const HomeContainer = () => {
  return (
    <Container display='flex' flexWrap='wrap' padding='20px'>
      {/* <Button content='Button' /> */}
      <Input
        size='medium'
        labelValue='Label'
        helperText='Helper Text'
        inputID='label'
        onChange={e => console.log(e.target.value)}
      />
    </Container>
  )
}
