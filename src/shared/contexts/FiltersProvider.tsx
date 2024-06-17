import { createContext, useContext } from 'react'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { usePersistedState } from '@/hooks/usePersistedState'
import { Opts } from '@/ui/Pagination/interfaces'

const appLoloFiltersStateKey = 'lolo:filters'
const appLoloSearchFiltersStateKey = 'lolo:search:filters'
const appLoloSortingStateKey = 'lolo:sorting'

type SelectedFilters = {
  url: string
  filters: Array<FilterOptionsProps>
}

type SearchFilters = {
  url: string
  opts: Opts
}

type SortingOptions = {
  url: string
  opts: {
    sortBy: string
    order: 'ASC' | 'DESC'
  }
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
  sorting: {
    getSortingOptions: (url: string) => SortingOptions | undefined
    setSortingOptions: (sortingOptions: SortingOptions) => void
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
  const [sorting, setSorting] = usePersistedState<Array<SortingOptions>>(appLoloSortingStateKey, [])

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
    return search.find((searchItem) => searchItem.url === url)
  }

  const setSearchFilters = (searchFilters: SearchFilters) => {
    setSearch((prev) => {
      const filter = prev.find((prevFilter) => prevFilter.url === searchFilters.url)

      if (!filter) {
        return [...prev, searchFilters]
      } else {
        return prev.map((prevFilter) => {
          if (prevFilter.url === searchFilters.url) {
            return searchFilters
          }
          return prevFilter
        })
      }
    })
  }

  const getSortingOptions = (url: string) => {
    return sorting.find((sort) => sort.url === url)
  }

  const setSortingOptions = (sortingOptions: SortingOptions) => {
    setSorting((prev) => {
      const sort = prev.find((prevSort) => prevSort.url === sortingOptions.url)

      if (!sort) {
        return [...prev, sortingOptions]
      } else {
        return prev.map((prevSort) => {
          if (prevSort.url === sortingOptions.url) {
            return sortingOptions
          }
          return prevSort
        })
      }
    })
  }

  const clearAllFilters = () => {
    setFilters((prev) => {
      return prev.map((prevBefore) => {
        return { ...prevBefore, filters: [] }
      })
    })
    setSearch((prev) => {
      return prev.map((prevBefore) => {
        return { ...prevBefore, opts: { ...prevBefore.opts, filter: '', limit: 50, page: 1 } }
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
        sorting: {
          getSortingOptions,
          setSortingOptions,
        },
        clearAllFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
