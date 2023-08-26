import { useFormContext } from 'react-hook-form'
import Container from '@/ui/Container'
import TemplateDocParagraph from './TemplateDocParagraph'
import Img from '@/ui/Img'
import styled from 'styled-components'
import { TemplateFormType } from '../hookforms.interfaces'
import Button from '@/ui/Button'
// import {
//   ParagraphOptionsType,
//   TextOptionsType,
// } from "../../../../shared/types/template-document.type";

const TemplateDoc = () => {
  const { watch, setValue } = useFormContext<TemplateFormType>()

  // const datos = data as {
  //   parrafos: {
  //     texts: TextOptionsType[];
  //     options?: ParagraphOptionsType;
  //   }[];
  // };

  const setPrevious = () => {
    const index = watch('clients')
      .filter((item) => item.state === true)
      .findIndex((item) => item.id === watch('clientSelected.id'))

    if (index - 1 < 0) return
    setValue('clientSelected', watch('clients').filter((item) => item.state === true)[index - 1])
  }
  const setNext = () => {
    const index = watch('clients')
      .filter((item) => item.state === true)
      .findIndex((item) => item.id === watch('clientSelected.id'))

    if (index + 1 >= watch('clients').filter((item) => item.state === true).length) return
    setValue('clientSelected', watch('clients').filter((item) => item.state === true)[index + 1])
  }

  return (
    <Container position="relative" display="flex" justifyContent="center" width="793px" height="100%">
      <Container
        width="100%"
        justifyContent="space-between"
        display="flex"
        position="absolute"
        padding="20px"
        style={{ zIndex: 20 }}
      >
        {watch('clients').filter((item) => item.state === true).length > 1 && (
          <StyledButton width="100px" shape="round" trailingIcon="ri-arrow-left-s-line" onClick={setPrevious} />
        )}
        {watch('clients').filter((item) => item.state === true).length > 1 && (
          <StyledButton width="100px" shape="round" trailingIcon="ri-arrow-right-s-line" onClick={setNext} />
        )}
      </Container>
      <Container height="100%" width="100%" position="absolute" backgroundColor="transparent">
        {watch('templatePhoto') !== '' && <StyledImg placeholderImage="Fondo Plantilla" src={watch('templatePhoto')} />}
      </Container>
      <Container backgroundColor="transparent" overFlowY="hidden" padding="95px 75px">
        {watch('templateJson').parrafos.map((item, i) => {
          return <TemplateDocParagraph key={i + 'parrafo'} {...item} />
        })}
      </Container>
    </Container>
  )
}
export default TemplateDoc

const StyledImg = styled(Img)`
  width: 793px;
  height: 1122px;
  object-fit: cover;
`

const StyledButton = styled(Button)`
  opacity: 0.4;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
  }
`
