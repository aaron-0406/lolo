/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Select from '@/ui/Select'
import { PaginationProps } from '@/ui/Pagination/interfaces'
import Container from '@/ui/Container'

const Pagination: FC<PaginationProps> = (props) => {
  const { count, opts, setOpts } = props
  const [paginas, setPaginas] = useState<number[]>([])
  const pages = Math.ceil(count / opts.limit)
  const greaterThanTabletL = useMediaQuery(device.tabletL)

  const setPaginasConfig = () => {
    const paginasLista: number[] = []
    for (let index = 0; index < pages; index += 1) paginasLista.push(index + 1)
    setPaginas(paginasLista)
    return 0
  }

  const handleChangeLimit = (valor: string) => {
    setOpts({ ...opts, limit: parseInt(valor, 10), page: 1 })
  }

  useEffect(() => {
    setPaginasConfig()
    return () => setPaginas([])
  }, [opts, pages])

  const isVisible = (page: number, item: number) => {
    let display = 'flex'
    display = page + 3 <= item ? (item <= 5 ? 'flex' : 'none') : 'flex'
    if (display === 'none') return display
    display = page - 3 >= item ? (item > pages - 5 ? 'flex' : 'none') : 'flex'
    return display
  }

  return (
    <>
      {count > 0 && (
        <StyledContainerPagination
          flexDirection="row"
          gap={greaterThanTabletL ? '0rem' : '1.25rem'}
        >
          <SelectContainer>
            <Container className="visual">
              <span>Página </span>
              {opts.page}
              <span> de </span>
              {pages}
              <span>, Mostrando </span>
            </Container>
            <Select
              value={String(opts.limit)}
              options={[
                { key: '25', label: '25' },
                { key: '50', label: '50' },
                { key: '100', label: '100' },
                { key: '150', label: '150' },
                { key: '200', label: '200' },
              ]}
              onChange={handleChangeLimit}
            />
            <Container className="visual">
              <span>de </span>
              {count}
              <span> registros</span>
            </Container>
          </SelectContainer>
          <PagesContainer>
            <StyledIcon
              className="ri-arrow-left-s-fill"
              onClick={() => {
                if (opts.page > 1) setOpts({ ...opts, page: 1 })
              }}
            />
            <StyledIcon
              className="ri-arrow-left-s-line"
              onClick={() => {
                if (opts.page > 1) setOpts({ ...opts, page: opts.page - 1 })
              }}
            />

            {paginas.map((item) => {
              return (
                // eslint-disable-next-line
                <StyledPageButton
                  selected={opts.page === item}
                  key={item}
                  display={isVisible(opts.page, item)}
                  onClick={() => {
                    if (opts.page === item) return
                    setOpts({ ...opts, page: item })
                  }}
                >
                  {item}
                </StyledPageButton>
              )
            })}

            <StyledIcon
              className="ri-arrow-right-s-line"
              onClick={() => {
                if (opts.page < pages) setOpts({ ...opts, page: opts.page + 1 })
              }}
            />
            <StyledIcon
              className="ri-arrow-right-s-fill"
              onClick={() => {
                if (opts.page < pages) setOpts({ ...opts, page: pages })
              }}
            />
          </PagesContainer>
        </StyledContainerPagination>
      )}
    </>
  )
}

export default Pagination

const StyledContainerPagination = styled.div<{
  flexDirection: string
  gap: string
}>`
  ${({ flexDirection, gap }) => css`
    display: flex;
    flex-direction: ${flexDirection};
    gap: ${gap};
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  `}
`

const SelectContainer = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  @media (max-width: 450px) {
    max-width: 320px;
    flex-wrap: wrap;
    .visual{
      display: none;
    }
  }
`

const PagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledIcon = styled.i`
  ${({ theme }) => css`
    color: ${theme.colors.Neutral6};
    cursor: pointer;
  `}
`

const StyledPageButton = styled.div<{ selected: boolean; display: string }>`
  ${({ theme, selected, display }) => css`
    margin: 0 0.25rem;
    padding: 0 0.25rem;
    font-size: 16px;
    width: 2rem;
    height: 2rem;
    display: ${display};
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    transition: all 0.5s;
    color: ${selected ? `#fff` : `${theme.colors.Neutral7}`};
    border-color: ${selected ? '' : `${theme.colors.Neutral7}`};
    border-width: 1px;

    background-color: ${selected ? `${theme.colors.Secondary6}` : ''};
    :hover {
      background-color: ${theme.colors.Primary4};
      color: #fff;
    }
  `}
`
