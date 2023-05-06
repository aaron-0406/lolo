export type SelectSize = 'default' | 'large'

export type SelectItemType = {
  key: string
  label: string
}

export type SelectItem<T, K> = {
  key: T
  label: string
  extra?: K
  leadingIcon?: string
  trailingIcon?: string
  suffix?: string
}
