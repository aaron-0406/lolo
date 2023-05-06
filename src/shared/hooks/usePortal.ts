import React, { useEffect } from 'react'
import { document } from '../utils/browser'

export const usePortal = (id: string) => {
  const div = React.useRef(document?.createElement('div'))

  useEffect(() => {
    let modalContainer = document?.querySelector(`#${id}`)

    if (!modalContainer) {
      modalContainer = document?.createElement('div')
      modalContainer?.setAttribute('id', id)

      if (modalContainer) {
        document?.body.appendChild(modalContainer)
      }
    }

    if (div.current) {
      modalContainer?.appendChild(div.current)
    }
    const refValue = div.current

    return () => {
      if (refValue) {
        refValue.remove()
      }
    }
  }, [id])

  return div.current
}
