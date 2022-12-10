export type ColorsType =
  | 'primary'
  | 'secondary'
  | 'ghost-white'
  | 'purple'
  | 'sapce-cadet'
  | 'independence'
  | 'black-coral'
  | 'blue-yonder'
  | 'cadet-blue-crayola'
  | 'queen-blue'

export interface Colors {
  primary: string
  secondary: string
  'ghost-white': string
  purple: string
  'sapce-cadet': string
  independence: string
  'black-coral': string
  'blue-yonder': string
  'cadet-blue-crayola': string
  'queen-blue': string
}

export interface Breakpoints {
  mobileS: string
  mobileM: string
  mobileL: string
  mobileXL: string
  tablet: string
  tabletM: string
  laptop: string
  laptopS: string
  laptopM: string
  laptopL: string
  desktop: string
  desktopM: string
  desktopL: string
}

export interface Device {
  mobileS: string
  mobileM: string
  mobileL: string
  mobileXL: string
  tablet: string
  tabletM: string
  laptop: string
  laptopS: string
  laptopM: string
  laptopL: string
  desktop: string
  desktopM: string
  desktopL: string
}

export interface ThemeType {
  colors: Colors
  rgbColors: Colors
  breakpoints: Breakpoints
  device: Device
}
