import styled, { css } from 'styled-components'
import { Dispatch, FC } from 'react'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import Text from '../../../../ui/Text'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import { Opts } from '../../../../ui/Pagination/interfaces'
import CustomersModal from '../CustomersModal'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  setLoadingGlobal: (state: boolean) => void
}

const CustomersSearch: FC<CustomersTableProps> = ({ opts, setOpts, setLoadingGlobal }) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') return setOpts({ ...opts, filter: '', page: 1 })
    if (value.length < 3) return
    return setOpts({ ...opts, filter: value.trim(), page: 1 })
  }

  return (
    <StyledContainer>
      <StyledContainerSearch className="search__textfield">
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
      </StyledContainerSearch>
      <CustomersModal setLoad={setLoadingGlobal} />
    </StyledContainer>
  )
}

export default CustomersSearch

const StyledContainer = styled(Container)`
  ${css`
    display: flex;
    width: 100%;
    padding: 0 20px;
    justify-content: space-around;
  `}
`

const StyledContainerSearch = styled(Container)`
  ${({ theme }) => css`
    width: 75%;
    display: flex;
    justify-content: space-around;
    @media ${theme.device.tabletS} {
      .search__textfield {
        width: 80%;
      }
    }
  `}
`
