import styled, { css } from 'styled-components'
import { Dispatch, FC} from 'react'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import Text from '../../../../ui/Text'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { Opts } from '../../../../ui/Pagination/interfaces'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CustomersSearch: FC<CustomersTableProps> = ({ opts, setOpts}) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') return setOpts({ ...opts, filter: '', page: 1 })
    if (value.length < 3) return
    return setOpts({ ...opts, filter: value.trim(), page: 1 })
  }

  return (
    <StyledContainer className="search__textfield" width="75%" display="flex" justifyContent="space-around">
      <Container display={greaterThanMobile ? 'block' : 'none'} padding="0 5px 0 0">
        <Text.Body className="actions__texfield-label" size="l" weight="bold">
          Buscar:
        </Text.Body>
      </Container>
      <TextField
        onChange={onChangeSearch}
        width={greaterThanMobile ? '85%' : '100%'}
        placeholder="Buscar cliente por nombre"
      />
    </StyledContainer>
  )
}

export default CustomersSearch

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    /* margin-top: 20px; */
    @media ${theme.device.tabletS} {
      .search__textfield {
        width: 80%;
      }
    }
  `}
`
