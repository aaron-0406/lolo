/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from 'react'

export type ImgProps = React.ComponentProps<'img'> & {
  placeholderImage: string
  placeholderProps?: React.ComponentProps<'img'>
}

const Img: React.FC<ImgProps> = ({ placeholderImage, placeholderProps, ...props }) => {
  const [imageUploadError, setImageUploadError] = useState<boolean>(false)

  const onSetImageUploadError = () => {
    setImageUploadError(true)
  }

  return (
    <>
      {!imageUploadError && !!props.src ? (
        <img {...props} onError={onSetImageUploadError} />
      ) : (
        <img {...props} {...placeholderProps} src={placeholderImage} role="img-placeholder" />
      )}
    </>
  )
}

export default Img
