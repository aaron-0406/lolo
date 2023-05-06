import { device } from '../shared/breakpoints/reponsive'
import colors from './json/colors.json'
import t from './json/typography.json'
import { shadows } from './shadows'
import { zIndex } from './zIndex'

const fonts = {
  dmSans: 'DM Sans, sans-serif',
  robotoMono: 'Roboto Mono, sans-serif',
}

const initialTheme = {
  colors,
  fonts,
  typography: t.typography,
  device,
  shadows,
  zIndex,
}

export default initialTheme
