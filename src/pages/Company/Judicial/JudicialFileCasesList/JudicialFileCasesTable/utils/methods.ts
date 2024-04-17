import { FilterOptionsProps } from '@/ui/Table/Table'

const getIDsByIdentifier = (identifier: string, selectedFilterOptions: FilterOptionsProps[]) => {
  return selectedFilterOptions
    .find((filterOption) => filterOption.identifier === identifier)
    ?.options.map((option) => {
      return option.key
    })
}

export { getIDsByIdentifier }
