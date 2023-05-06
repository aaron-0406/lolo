import { createGlobalStyle } from 'styled-components'
import './global/fonts/dmsans/stylesheet.css'
import './global/fonts/raleway/stylesheet.css'
import 'remixicon/fonts/remixicon.css'

const GlobalStyles = createGlobalStyle`
*,
::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}

body {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  line-height: inherit;
  background-color: ${({ theme }) => theme.colors['Neutral0']};

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  color: inherit;
  text-decoration: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

input,
optgroup,
select,
textarea {
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

select {
  text-transform: none;
}

[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
      no-repeat 50% 50%;
    background-size: contain;
    opacity: '0.3';
    pointer-events: none;
  }
  &:focus::-webkit-search-cancel-button {
    visibility: visible;
    cursor: pointer;
    pointer-events: all;
  }
  &:not(:focus)::-webkit-search-cancel-button {
    visibility: hidden;
  }
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
  font-family: "Inter", sans-serif;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  color: #9ca3af;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  opacity: 1;
  color: #9ca3af;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

:disabled {
  cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
}

img,
video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}

.hide-component {
  display: none;
}
`

export default GlobalStyles
