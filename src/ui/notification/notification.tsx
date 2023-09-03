import * as React from 'react'
import toast from 'react-hot-toast'
import AlertNotification from '@/ui/AlertNotification'
import { config } from '@/ui/AlertNotification'
import type { AlertNotificationType } from '@/ui/AlertNotification/interfaces'

type NotificationProps = {
  type: AlertNotificationType
  message: React.ReactNode
  list?: Array<string>
  icon?: boolean
  close?: boolean
}

/**
 * notification
 * @prop {AlertNotificationType} type "success" | "warning" | "error" | "info"
 *        - To define the color and icon that will be present in the notification
 *        - Also to define the duration for the alert to be visible
 *          - 5000ms for success
 *          - "warning" | "error" | "info" will be visible until they are manually dismissed
 * @prop {string} message Text inside the notification
 * @prop {boolean} icon Whether to display the icon or not. The icons are already defined by the type of the alert
 */
export const notification = ({ type, message, icon = true, close = false, list }: NotificationProps) => {
  return toast.custom(
    ({ id, visible }) => (
      <AlertNotification
        type={type}
        message={message}
        visible={visible}
        idToast={id}
        icon={icon}
        close={close}
        list={list}
      />
    ),
    { duration: config[type].duration }
  )
}
