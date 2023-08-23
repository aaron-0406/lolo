import type CSS from 'csstype'

export type LinkType = {
  link: string
  name: string
}

export type BreadcrumbsProps = {
  colorFirst?: CSS.Property.Color
  fontSize?: CSS.Property.FontSize
  display?: CSS.Property.Display
  routes: LinkType[]
}
