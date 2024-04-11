import { createContext } from 'react'

export const FiltersContext = createContext<{} | null>(null)

type FiltersProviderProps = {}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({}) => {
  return <div>holi</div>
}
