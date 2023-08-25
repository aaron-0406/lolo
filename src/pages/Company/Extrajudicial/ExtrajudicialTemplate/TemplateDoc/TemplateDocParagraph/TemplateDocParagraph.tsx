/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  ParagraphOptionsType,
  TextOptionsType,
} from '@/types/extrajudicial/template-document.type'
import Container from '@/ui/Container'
import { TemplateFormType } from '../../hookforms.interfaces'
import TemplateDocText from './TemplateDocText'

type TemplateDocParagraphProps = {
  texts: TextOptionsType[]
  options?: ParagraphOptionsType
}
const TemplateDocParagraph: React.FC<TemplateDocParagraphProps> = (props) => {
  const { texts, options } = props
  const [texto, setTexto] = useState<string>('')

  const { watch } = useFormContext<TemplateFormType>()

  let marginBottom = options?.spacingAfter ? options?.spacingAfter - 8 : 0 - 5

  const createTag = (tag: 'b' | 'i' | 'p', text: string, fontSize: number, img?: string) => {
    if (img) {
      return `<img src="${img}" />`
    }
    text = `<${tag} style="font-size: ${fontSize}px; display:inline">${text}</${tag}>`

    for (let i = 0; i < watch('values').length; i++) {
      const element = watch('values')[i]
      text = text.replace(`[${element.field}]`, element.value)
    }
    text = text.replace('[client]', watch('clientSelected').name ? watch('clientSelected').name : '')

    return text
  }

  const transformText = () => {
    let tempText = ''
    if (!texts) return tempText
    for (let i = 0; i < texts.length; i++) {
      const element = texts[i]
      if (element.bold) {
        tempText += createTag(
          'b',
          element.text ? element.text : '',
          element.fontSize ? element.fontSize + 1 : 12,
          element.img
        )
        continue
      }
      if (element.italic) {
        tempText += createTag(
          'i',
          element.text ? element.text : '',
          element.fontSize ? element.fontSize + 1 : 12,
          element.img
        )
        continue
      }
      if (element) {
        tempText += createTag(
          'p',
          element.text ? element.text : '',
          element.fontSize ? element.fontSize + 1 : 12,
          element.img
        )
        continue
      }
    }
    setTexto(tempText)
  }

  useEffect(() => {
    transformText()
  }, [watch('values'), watch('clients'), watch('clientSelected')])

  if (!!texts && texts[0]?.text === '[guarantor]') {
    return (
      <Container
        backgroundColor="transparent"
        minHeight="1.2rem"
        display="flex"
        justifyContent={options?.align}
        margin={`0 0 ${marginBottom}px 0`}
        flexWrap="nowrap"
      >
        {watch('clientSelected').guarantor?.map((item, i) => {
          let guarantor = createTag('p', item.name, 11)
          return <TemplateDocText key={i + 'guarantor'} $text={guarantor} />
        })}
      </Container>
    )
  }
  if (!!texts && texts[0]?.text?.includes('direction')) {
    return (
      <>
        {watch('clientSelected').direction?.map((item, i) => {
          let directionType = createTag('b', item.type, 12)
          let directionText = createTag('p', item.direction, 12)
          let directionAll = createTag('p', directionType + ': ' + directionText, 12)
          return (
            <Container
              key={i + 'direction'}
              backgroundColor="transparent"
              minHeight="1.2rem"
              display="flex"
              justifyContent={options?.align}
              margin={`0 0 ${marginBottom}px 0`}
              flexWrap="nowrap"
            >
              <TemplateDocText $text={directionAll} />
            </Container>
          )
        })}
      </>
    )
  }

  return (
    <Container
      backgroundColor="transparent"
      minHeight="1.2rem"
      display="flex"
      justifyContent={options?.align}
      margin={`0 0 ${marginBottom}px 0`}
      flexWrap="nowrap"
    >
      <TemplateDocText $text={texto} />
    </Container>
  )
}

export default TemplateDocParagraph
