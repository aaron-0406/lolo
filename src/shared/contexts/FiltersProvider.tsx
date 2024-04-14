import { createContext, useContext } from 'react'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { usePersistedState } from '@/hooks/usePersistedState'
import { Opts } from '@/ui/Pagination/interfaces'

const appLoloFiltersStateKey = 'lolo:filters'
const appLoloSearchFiltersStateKey = 'lolo:search:filters'

type SelectedFilters = {
  url: string
  filters: Array<FilterOptionsProps>
}

type SearchFilters = {
  url: string
  opts: Opts
}
export const FiltersContext = createContext<{
  filterOptions: {
    getSelectedFilters: (url: string) => SelectedFilters | undefined
    setSelectedFilters: (selectedFilters: SelectedFilters) => void
  }
  filterSearch: {
    getSearchFilters: (url: string) => SearchFilters | undefined
    setSearchFilters: (searchFilters: SearchFilters) => void
  }
  clearAllFilters: () => void
} | null>(null)

export const useFiltersContext = () => {
  const context = useContext(FiltersContext)

  if (context === null) {
    throw new Error('useFiltersContext must be used within a FiltersProvider')
  }

  return context
}

type FiltersProviderProps = {
  children: React.ReactNode
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] = usePersistedState<Array<SelectedFilters>>(appLoloFiltersStateKey, [])
  const [search, setSearch] = usePersistedState<Array<SearchFilters>>(appLoloSearchFiltersStateKey, [])

  const getSelectedFilters = (url: string) => {
    return filters.find((filter) => filter.url === url)
  }

  const setSelectedFilters = (selectedFilters: SelectedFilters) => {
    setFilters((prev) => {
      const filter = prev.find((prevFilter) => prevFilter.url === selectedFilters.url)

      if (!filter) {
        return [...prev, selectedFilters]
      } else {
        return prev.map((prevFilter) => {
          if (prevFilter.url === selectedFilters.url) {
            return selectedFilters
          }

          return prevFilter
        })
      }
    })
  }

  const getSearchFilters = (url: string) => {
    const yo = search.find((searchItem) => searchItem.url === url)
    console.log(yo)
    return yo
  }

  const setSearchFilters = (searchFilters: SearchFilters) => {
    console.log(searchFilters.opts.filter, 'provi')
    setSearch((prev) => {
      const updatedSearch = prev.map((prevFilter) => {
        if (prevFilter.url === searchFilters.url) {
          return {
            ...prevFilter,
            opts: { ...searchFilters.opts },
          }
        }
        return prevFilter
      })
      return updatedSearch
    })
  }

  const clearAllFilters = () => {
    setFilters((prev) => {
      return prev.map((prevBefore) => {
        return { ...prevBefore, filters: [] }
      })
    })
  }

  return (
    <FiltersContext.Provider
      value={{
        filterOptions: {
          getSelectedFilters,
          setSelectedFilters,
        },
        filterSearch: {
          getSearchFilters,
          setSearchFilters,
        },
        clearAllFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
