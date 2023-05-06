import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import ClickOutSideComponent from '../../shared/hooks/useClickOutside'
import Container from '../Container'
import Text from '../Text'

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Setiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

type DatePickerProps = {
  selectedDate?: string
  value: string
  name?: string
  placeholder?: string
  required?: boolean
  dateFormat?: 'DD-MM-YYYY' | 'YYYY-MM-DD' | 'D d M, Y' | 'DD/MM/YYYY'
  width?: string
  label?: string
  labelFontSize?: string
  borderColor?: string
  hoverBorderColor?: string
  focusBorderColor?: string
  borderWidth?: string
  borderStyle?: string
  orientation?: 'horizontal' | 'vertical'
  helpText?: string
  helpTextColor?: string
  shadow?: string
  hasError?: boolean
  shadowColor?: string
  getDate?: (date: any) => void
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    helpText = '',
    hasError = false,
    helpTextColor = 'rgb(220 38 38)',
    value,
    name,
    orientation = 'vertical',
    required,
    placeholder,
    dateFormat = 'DD-MM-YYYY',
    width = '100%',
    label,
    labelFontSize = '16px',
    getDate,
  } = props

  let isRow = orientation === 'horizontal'

  const [open, setOpen] = useState<boolean>(false)
  const [noOfDays, setNoOfDays] = useState<number[]>([])
  const [blankDays, setBlankDays] = useState<number[]>([])
  const [month, setMonth] = useState<number>(0)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [valueInput, setValueInput] = useState<string>(value)

  useEffect(() => {
    getNoOfDays(new Date().getFullYear(), new Date().getMonth())
    return () => {
      setNoOfDays([])
      setBlankDays([])
    }
  }, [])

  const formatDateForDisplay = (date: any): string => {
    let formattedDay = DAYS[date.getDay()]
    let formattedDate = ('0' + date.getDate()).slice(-2)
    let formattedMonth = MONTH_NAMES[date.getMonth()]
    let formattedMonthShortName = MONTH_SHORT_NAMES[date.getMonth()]
    let formattedMonthInNumber = ('0' + (parseInt(date.getMonth()) + 1)).slice(-2)
    let formattedYear = date.getFullYear()
    if (dateFormat === 'DD/MM/YYYY') return `${formattedDate}/${formattedMonthInNumber}/${formattedYear}`
    if (dateFormat === 'DD-MM-YYYY') return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}`
    if (dateFormat === 'YYYY-MM-DD') return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`
    if (dateFormat === 'D d M, Y') return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`
    return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`
  }

  const isSelectedDate = (date: any) => {
    const d = new Date(year, month, date)
    return valueInput === formatDateForDisplay(d)
  }

  const isToday = (date: any) => {
    const today = new Date()
    const d = new Date(year, month, date)
    return today.toDateString() === d.toDateString()
  }

  const getDateValue = (date: any) => {
    let selectedDate = new Date(year, month, date)
    setValueInput(formatDateForDisplay(selectedDate))
    isSelectedDate(date)
    if (getDate) getDate(formatDateForDisplay(selectedDate))
    setOpen(false)
  }

  const nextYear = () => {
    getNoOfDays(year + 1, month)
    setYear(year + 1)
  }

  const prevYear = () => {
    getNoOfDays(year - 1, month)
    setYear(year - 1)
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      getNoOfDays(year + 1, month)
      setYear(year + 1)
    } else {
      getNoOfDays(year, month + 1)
      setMonth(month + 1)
    }
  }

  const prevMonth = () => {
    if (month === 0) {
      getNoOfDays(year - 1, 11)
      setMonth(11)
      setYear(year - 1)
    } else {
      getNoOfDays(year, month - 1)
      setMonth(month - 1)
    }
  }

  const getNoOfDays = (anio: number, mes: number) => {
    let daysInMonth = new Date(anio, mes + 1, 0).getDate()
    // find where to start calendar day of week
    let dayOfWeek = new Date(anio, mes).getDay()
    let blankdaysArray = []
    for (let i = 1; i <= dayOfWeek; i++) blankdaysArray.push(i)
    let daysArray = []
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i)
    setNoOfDays(daysArray)
    setBlankDays(blankdaysArray)
  }
  return (
    <>
      <StyledContainer callback={() => setOpen(false)} width={width}>
        <Container display="flex" position="relative" width="100%" flexDirection={isRow ? 'row' : 'column'}>
          <Container display="flex" flexDirection="row" gap="0.25rem" margin={'0.25rem 0px'} height="2rem">
            {label && (
              <StyledLabel labelFontSize={labelFontSize} width={isRow ? '8rem' : ''} htmlFor={name}>
                {label}
                {required && <StyledSpanRequired>*</StyledSpanRequired>}
              </StyledLabel>
            )}
          </Container>
          <Container display="flex" flexDirection="column" width="100%">
            <StyledInputContainer $hasError={hasError}>
              <StyledButton onClick={() => setOpen(true)}>
                <Container
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="100%"
                  color="#000"
                >
                  {value ? <>{value}</> : <Container color="rgb(156 163 175)">{placeholder}</Container>}
                </Container>
              </StyledButton>
              <StyledContainerIcon
                width="2.5rem"
                position="relative"
                height="2.25rem"
                backgroundColor="rgb(209 213 219)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => setOpen(true)}
              >
                <ContainerIconSpan display="flex" alignItems="center" position="absolute" padding="0 0.5rem 0 0">
                  <StyledIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </StyledIcon>
                </ContainerIconSpan>
              </StyledContainerIcon>
            </StyledInputContainer>
            <StyledHelpText $helpTextColor={helpTextColor}>{helpText}</StyledHelpText>
          </Container>
          {open && (
            // eslint-disable-next-line
            <ContainerCalendar position="absolute" $isRow={isRow} onClick={() => setOpen(true)}>
              <StyledCalendar>
                <Container display="flex" alignItems="center" justifyContent="space-between" margin="0 0 0.5rem 0">
                  <Container display="flex" alignItems="center" justifyContent="space-between">
                    <ArrowButton type="button" onClick={() => prevMonth()}>
                      <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </ArrowIcon>
                    </ArrowButton>
                    <Text.Body size="m" weight="bold" color="Neutral9">
                      {MONTH_NAMES[month]}
                    </Text.Body>
                    <ArrowButton type="button" onClick={() => nextMonth()}>
                      <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </ArrowIcon>
                    </ArrowButton>
                  </Container>
                  <Container display="flex" alignItems="center" justifyContent="space-between">
                    <ArrowButton type="button" onClick={() => prevYear()}>
                      <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </ArrowIcon>
                    </ArrowButton>
                    <Text.Body weight="bold" size="m" color="Neutral9">
                      {year}
                    </Text.Body>
                    <ArrowButton type="button" onClick={() => nextYear()}>
                      <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </ArrowIcon>
                    </ArrowButton>
                  </Container>
                </Container>
                <Container display="flex" flexDirection="row" flexWrap="wrap" margin="0 -0.25rem 0.75rem -0.25rem">
                  {DAYS.map((item, i) => {
                    return (
                      <Container key={i} padding="0 1.125rem" width="14.26%">
                        <DayNameSpan size="m" weight="regular">
                          {item}
                        </DayNameSpan>
                      </Container>
                    )
                  })}
                </Container>
                <Container display="flex" flexDirection="row" flexWrap="wrap">
                  {blankDays.map((item, i) => {
                    return <BlankDaysItem key={i} />
                  })}
                  {noOfDays.map((item, i) => {
                    return (
                      <Container key={i} width="14.28%" padding="0 0.25rem 0.25rem 0.25rem">
                        {/* eslint-disable-next-line */}
                        <NoOfDaysItem
                          onClick={() => getDateValue(item)}
                          $today={isToday(item)}
                          $selectItem={isSelectedDate(item)}
                        >
                          {item}
                        </NoOfDaysItem>
                      </Container>
                    )
                  })}
                </Container>
              </StyledCalendar>
            </ContainerCalendar>
          )}
        </Container>
      </StyledContainer>
    </>
  )
}

export default DatePicker

const NoOfDaysItem = styled(Container)<{
  $today: boolean
  $selectItem: boolean
}>`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  text-align: center;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 9999px;
  transition-duration: 100ms;
  transition: all;
  cursor: pointer;
  ${({ $selectItem, $today, theme }) =>
    css`
      background-color: ${$selectItem ? theme.colors.Secondary6 : ''};
      color: ${$selectItem ? '#fff' : ''};
      background-color: ${$today ? theme.colors.Primary6 : ''};
      color: ${$today ? '#fff' : ''};
    `}
`

const BlankDaysItem = styled.div`
  width: 14.28%;
  padding: 0.25rem;
  border-width: 1px;
  border-color: transparent;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
`

const ArrowIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  background-color: #ffffff;
`
const ArrowButton = styled.button`
  display: inline-flex;
  padding: 0.25rem;
  transition: all;
  transition-duration: 100ms;
  border-radius: 9999px;
  cursor: pointer;
  background-color: #ffffff;
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  :hover {
    background-color: rgb(243 244 246);
  }
`
const DayNameSpan = styled(Text.Body)`
  text-align: center;
`

const StyledCalendar = styled.div`
  border-radius: 0.125rem;
  border-width: 2px;
  border-color: rgb(209 213 219);
  background-color: rgb(255 255 255);
  margin-top: -1.5rem;
  padding: 1rem;
  /* box-shadow: 10px 5px 5px #000000; */
`

const ContainerCalendar = styled(Container)<{ $isRow: boolean }>`
  z-index: 10;
  color: rgb(31 41 55);
  right: 0;
  ${({ $isRow }) =>
    css`
      top: ${$isRow ? '65px' : '109px'};
      width: ${$isRow ? '83.333333%' : '100%'};
    `}
`
const StyledLabel = styled.label<{
  labelFontSize: string
  width: string
}>`
  font-weight: normal;
  white-space: nowrap;
  ${({ width }) =>
    !!width &&
    css`
      width: ${width};
    `}
  ${({ labelFontSize }) =>
    !!labelFontSize &&
    css`
      font-size: ${labelFontSize};
    `}
`

const StyledContainer = styled(ClickOutSideComponent)<{
  width: string
}>`
  display: flex;
  flex-direction: column;
  ${({ width }) =>
    !!width &&
    css`
      width: ${width};
    `}
  align-items: center;
`

const StyledSpanRequired = styled.span`
  color: rgb(220 38 38);
  padding-left: 0.25rem;
`

const StyledHelpText = styled.div<{
  $helpTextColor: string
}>`
  margin-top: 0.25rem;
  font-weight: bold;
  height: 1rem;
  ${({ $helpTextColor }) =>
    !!$helpTextColor &&
    css`
      color: ${$helpTextColor};
    `}
`

const StyledInputContainer = styled(Container)<{
  $hasError: boolean
}>`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 0.375rem;
  transition: all;
  transition-duration: 300ms;

  ${({ theme, $hasError }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      :hover {
        border: 2px solid ${theme.colors.Neutral5};
      }

      :focus-within {
        border: 2px solid ${theme.colors.Primary5};
      }
      ${$hasError &&
      css`
        background: ${theme.colors.Danger1};
        border: 2px solid ${theme.colors.Danger5};

        .leading__icon,
        .trailing__icon {
          color: ${theme.colors.Danger5};
        }

        :hover,
        :focus-within {
          border: 2px solid ${theme.colors.Danger5};
        }
      `}
    `}
`

const StyledButton = styled.button`
  ${({ theme }) => css`
    background-color: #fff;
    appearance: none;
    display: block;
    width: 100%;
    padding: 0.25 rem 0.75 rem;
    height: 2.25rem;
    align-items: center;
    border-top-left-radius: 0.375rem;
    :focus {
      outline: none;
      border: 2px solid ${theme.colors.Primary5};
    }
  `}
`

const StyledContainerIcon = styled(Container)`
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
`
const ContainerIconSpan = styled(Container)`
  top: 0px;
  bottom: 0px;
  right: 0.25rem;
`

const StyledIcon = styled.svg`
  height: 1rem;
  width: 1rem;
`
