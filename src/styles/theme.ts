// theme.ts
import { ThemeType } from '../types/theme.type'

const colors = {
  primary: '#273469',
  secondary: '#30343F',
  'ghost-white': '#FAFAFF',
  purple: '#E4D9FF',
  'sapce-cadet': '#1E2749',
  independence: '#434A5A',
  'black-coral': '#596377',
  'blue-yonder': '#5C708F',
  'cadet-blue-crayola': '#9FAFC3',
  'queen-blue': '#586987'
}

const rgbColors = {
  primary: '#273469',
  secondary: '#30343F',
  'ghost-white': '#FAFAFF',
  purple: '#E4D9FF',
  'sapce-cadet': '#1E2749',
  independence: '#434A5A',
  'black-coral': '#596377',
  'blue-yonder': '#5C708F',
  'cadet-blue-crayola': '#9FAFC3',
  'queen-blue': '#586987'
}

const breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobileXL: '560px',
  tablet: '768px',
  tabletM: '900px',
  laptop: '1024px',
  laptopS: '1150px',
  laptopM: '1260px',
  laptopL: '1440px',
  desktop: '1650px',
  desktopM: '1950px',
  desktopL: '2560px'
}

const device = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobileM: `(min-width: ${breakpoints.mobileM})`,
  mobileL: `(min-width: ${breakpoints.mobileL})`,
  mobileXL: `(min-width: ${breakpoints.mobileXL})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  tabletM: `(min-width: ${breakpoints.tabletM})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopS: `(min-width: ${breakpoints.laptopS})`,
  laptopM: `(min-width: ${breakpoints.laptopM})`,
  laptopL: `(min-width: ${breakpoints.laptopL})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  desktopM: `(min-width: ${breakpoints.desktopM})`,
  desktopL: `(min-width: ${breakpoints.desktopL})`
}

export const initialTheme: ThemeType = {
  colors: colors,
  rgbColors: rgbColors,
  breakpoints: breakpoints,
  device: device
}
