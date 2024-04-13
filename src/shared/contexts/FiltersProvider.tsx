import { createContext, useContext } from 'react'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { usePersistedState } from '@/hooks/usePersistedState'

const appLoloFiltersStateKey = 'lolo:filters'

type SelectedFilters = {
  url: string
  filters: Array<FilterOptionsProps>
}

export const FiltersContext = createContext<{
  filterOptions: {
    getSelectedFilters: (url: string) => SelectedFilters | undefined
    setSelectedFilters: (selectedFilters: SelectedFilters) => void
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

  const clearAllFilters = () => {
    setFilters([])
  }

  return (
    <FiltersContext.Provider
      value={{
        filterOptions: {
          getSelectedFilters,
          setSelectedFilters,
        },
        clearAllFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
