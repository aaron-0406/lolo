import type { IThemeColor } from "styled-components"

const style = (colors: IThemeColor) => ({
  "primary-default": {
    background: colors.Primary5,
    border: `2px solid ${colors.Primary5}`,
    color: colors.Neutral0,
    badgeBorder: `2px solid ${colors.Neutral0}`,
    badgeColor: colors.Primary5,
    hover: {
      background: colors.Primary4,
      color: colors.Neutral0,
      border: `2px solid ${colors.Primary4}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Primary4,
    },
    pressed: {
      background: colors.Primary6,
      color: colors.Neutral0,
      border: `2px solid ${colors.Primary6}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Primary6,
    },
    loading: {
      background: colors.Primary4,
      color: colors.Neutral0,
      border: `2px solid ${colors.Primary4}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Primary4,
    },
    disabled: {
      background: colors.Neutral3,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Neutral5,
    },
  },
  "primary-warning": {
    background: colors.Warning4,
    border: `2px solid ${colors.Warning4}`,
    color: colors.Neutral0,
    badgeBorder: `2px solid ${colors.Neutral0}`,
    badgeColor: colors.Warning4,
    hover: {
      background: colors.Warning3,
      color: colors.Neutral0,
      border: `2px solid ${colors.Warning3}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Warning3,
    },
    pressed: {
      background: colors.Warning5,
      color: colors.Neutral0,
      border: `2px solid ${colors.Warning5}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Warning5,
    },
    loading: {
      background: colors.Warning3,
      color: colors.Neutral0,
      border: `2px solid ${colors.Warning3}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Warning3,
    },
    disabled: {
      background: colors.Neutral5,
      color: colors.Neutral0,
      border: `2px solid ${colors.Neutral5}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Neutral5,
    },
  },
  "primary-danger": {
    background: colors.Danger5,
    border: `2px solid ${colors.Danger5}`,
    color: colors.Neutral0,
    badgeBorder: `2px solid ${colors.Neutral0}`,
    badgeColor: colors.Danger5,
    hover: {
      background: colors.Danger4,
      color: colors.Neutral0,
      border: `2px solid ${colors.Danger4}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Danger4,
    },
    pressed: {
      background: colors.Danger6,
      color: colors.Neutral0,
      border: `2px solid ${colors.Danger6}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Danger6,
    },
    loading: {
      background: colors.Danger4,
      color: colors.Neutral0,
      border: `2px solid ${colors.Danger4}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Danger4,
    },
    disabled: {
      background: colors.Neutral5,
      color: colors.Neutral0,
      border: `2px solid ${colors.Neutral5}`,
      badgeBorder: `2px solid ${colors.Neutral0}`,
      badgeColor: colors.Neutral5,
    },
  },
  "secondary-default": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Primary5}`,
    color: colors.Primary5,
    badgeBorder: `2px solid ${colors.Primary5}`,
    badgeColor: colors.Primary5,
    hover: {
      background: colors.Neutral0,
      color: colors.Primary4,
      border: `2px solid ${colors.Primary4}`,
      badgeBorder: `2px solid ${colors.Primary4}`,
      badgeColor: colors.Primary4,
    },
    pressed: {
      background: colors.Neutral0,
      color: colors.Primary6,
      border: `2px solid ${colors.Primary6}`,
      badgeBorder: `2px solid ${colors.Primary6}`,
      badgeColor: colors.Primary6,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Primary4,
      border: `2px solid ${colors.Primary4}`,
      badgeBorder: `2px solid ${colors.Primary4}`,
      badgeColor: colors.Primary4,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral5}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "secondary-warning": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Warning4}`,
    color: colors.Warning4,
    badgeBorder: `2px solid ${colors.Warning4}`,
    badgeColor: colors.Warning4,
    hover: {
      background: colors.Neutral0,
      color: colors.Warning3,
      border: `2px solid ${colors.Warning3}`,
      badgeBorder: `2px solid ${colors.Warning3}`,
      badgeColor: colors.Warning3,
    },
    pressed: {
      background: colors.Neutral0,
      color: colors.Warning5,
      border: `2px solid ${colors.Warning5}`,
      badgeBorder: `2px solid ${colors.Warning5}`,
      badgeColor: colors.Warning5,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Warning3,
      border: `2px solid ${colors.Warning3}`,
      badgeBorder: `2px solid ${colors.Warning3}`,
      badgeColor: colors.Warning3,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral5}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "secondary-danger": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Danger5}`,
    color: colors.Danger5,
    badgeBorder: `2px solid ${colors.Danger5}`,
    badgeColor: colors.Danger5,
    hover: {
      background: colors.Neutral0,
      color: colors.Danger4,
      border: `2px solid ${colors.Danger4}`,
      badgeBorder: `2px solid ${colors.Danger4}`,
      badgeColor: colors.Danger4,
    },
    pressed: {
      background: colors.Neutral0,
      color: colors.Danger6,
      border: `2px solid ${colors.Danger6}`,
      badgeBorder: `2px solid ${colors.Danger6}`,
      badgeColor: colors.Danger6,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Danger4,
      border: `2px solid ${colors.Danger4}`,
      badgeBorder: `2px solid ${colors.Danger4}`,
      badgeColor: colors.Danger4,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral5}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "tertiary-default": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Neutral0}`,
    color: colors.Primary5,
    badgeBorder: `2px solid ${colors.Primary5}`,
    badgeColor: colors.Primary5,
    hover: {
      background: colors.Neutral3,
      color: colors.Primary4,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Primary4}`,
      badgeColor: colors.Primary4,
    },
    pressed: {
      background: colors.Neutral3,
      color: colors.Primary6,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Primary6}`,
      badgeColor: colors.Primary6,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Primary4,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Primary4}`,
      badgeColor: colors.Primary4,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "tertiary-warning": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Neutral0}`,
    color: colors.Warning4,
    badgeBorder: `2px solid ${colors.Warning4}`,
    badgeColor: colors.Warning4,
    hover: {
      background: colors.Neutral3,
      color: colors.Warning3,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Warning3}`,
      badgeColor: colors.Warning3,
    },
    pressed: {
      background: colors.Neutral3,
      color: colors.Warning5,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Warning5}`,
      badgeColor: colors.Warning5,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Warning3,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Warning3}`,
      badgeColor: colors.Warning3,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "tertiary-danger": {
    background: colors.Neutral0,
    border: `2px solid ${colors.Neutral0}`,
    color: colors.Danger5,
    badgeBorder: `2px solid ${colors.Danger5}`,
    badgeColor: colors.Danger5,
    hover: {
      background: colors.Neutral3,
      color: colors.Danger4,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Danger4}`,
      badgeColor: colors.Danger4,
    },
    pressed: {
      background: colors.Neutral3,
      color: colors.Danger6,
      border: `2px solid ${colors.Neutral3}`,
      badgeBorder: `2px solid ${colors.Danger6}`,
      badgeColor: colors.Danger6,
    },
    loading: {
      background: colors.Neutral0,
      color: colors.Danger4,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Danger4}`,
      badgeColor: colors.Danger4,
    },
    disabled: {
      background: colors.Neutral0,
      color: colors.Neutral5,
      border: `2px solid ${colors.Neutral0}`,
      badgeBorder: `2px solid ${colors.Neutral5}`,
      badgeColor: colors.Neutral5,
    },
  },
  "link-default": {
    background: "transparent",
    border: "none",
    color: colors.Primary5,
    badgeBorder: "none",
    badgeColor: colors.Primary5,
    hover: {
      background: "",
      color: colors.Primary4,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Primary4,
    },
    pressed: {
      background: "",
      color: colors.Primary6,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Primary6,
    },
    loading: {
      background: "",
      color: colors.Primary6,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Primary6,
    },
    disabled: {
      background: "",
      color: colors.Neutral5,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Neutral5,
    },
  },
  "link-warning": {
    background: "transparent",
    border: `0 solid ${colors.Neutral0}`,
    color: colors.Warning4,
    badgeBorder: "none",
    badgeColor: colors.Warning4,
    hover: {
      background: "",
      color: colors.Warning3,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Warning3,
    },
    pressed: {
      background: "",
      color: colors.Warning5,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Warning5,
    },
    loading: {
      background: "",
      color: colors.Warning3,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Warning3,
    },
    disabled: {
      background: "",
      color: colors.Neutral5,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Neutral5,
    },
  },
  "link-danger": {
    background: "transparent",
    border: "none",
    color: colors.Danger5,
    badgeBorder: "none",
    badgeColor: colors.Danger5,
    hover: {
      background: "",
      color: colors.Danger4,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Danger4,
    },
    pressed: {
      background: "",
      color: colors.Danger6,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Danger6,
    },
    loading: {
      background: "",
      color: colors.Danger4,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Danger4,
    },
    disabled: {
      background: "",
      color: colors.Neutral5,
      border: "",
      badgeBorder: "",
      badgeColor: colors.Neutral5,
    },
  },
})

export default style