import type { IThemeColor } from "styled-components"

const style = (colors: IThemeColor) => ({
  success: {
    background: colors["Success1"],
    border: `2px solid ${colors.Success2}`,
  },
  error: {
    background: colors["Danger1"],
    border: `2px solid ${colors.Danger2}`,
  },
  warning: {
    background: colors["Warning1"],
    border: `2px solid ${colors.Warning2}`,
  },
  info: {
    background: colors["Primary1"],
    border: `2px solid ${colors.Primary2}`,
  },
})

export default style
