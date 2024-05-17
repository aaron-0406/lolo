/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { ParagraphOptionsType, TextOptionsType } from '@/types/extrajudicial/template-document.type'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import Container from '@/ui/Container'
import { TemplateFormType } from '../../hookforms.interfaces'
import TemplateDocText from './TemplateDocText'
import { getAddressesTypeByCHB } from '@/services/extrajudicial/ext-address-type.service'

type TemplateDocParagraphProps = {
  texts: TextOptionsType[]
  options?: ParagraphOptionsType
}
const TemplateDocParagraph: React.FC<TemplateDocParagraphProps> = (props) => {
  const { texts, options } = props
  const [texto, setTexto] = useState<string>('')

  const { watch } = useFormContext<TemplateFormType>()

  const { data: addressesTypeData } = useQuery(
    [
      'KEY_EXT_ADDRESS_TYPE_CACHE',
      parseInt(
        String(watch('clientSelected').customerHasBankId).length
          ? String(watch('clientSelected').customerHasBankId)
          : '0'
      ),
    ],
    async () => {
      return await getAddressesTypeByCHB(
        parseInt(
          String(watch('clientSelected').customerHasBankId).length
            ? String(watch('clientSelected').customerHasBankId)
            : '0'
        )
      )
    }
  )

  const addressesType: ExtAddressType[] = addressesTypeData?.data ?? []

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

  if (!!texts && texts[0]?.text?.includes('direction')) {
    return (
      <>
        {watch('clientSelected').direction?.map((item, i) => {
          let address = addressesType.find((record: ExtAddressType) => record.id === item.addressTypeId)

          let directionType = createTag('b', address?.type ?? 'NO TYPE', 12)
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
