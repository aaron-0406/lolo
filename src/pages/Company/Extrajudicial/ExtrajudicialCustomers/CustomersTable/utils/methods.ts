import { SelectItem } from '@/ui/Select/interfaces'
import { FilterOptionsProps } from '@/ui/Table/Table'

const getIDsByIdentifier = (identifier: string, selectedFilterOptions: FilterOptionsProps[]) => {
  return selectedFilterOptions
    .find((filterOption) => filterOption.identifier === identifier)
    ?.options.map((option) => {
      return option.key
    })
}

const getProcessedFilterOptions = (
  identifier: string,
  selectedFilterOptions: FilterOptionsProps[],
  options: Array<SelectItem<any, any>>
) => {
  const filterOption = selectedFilterOptions.find((filter) => filter.identifier === identifier)

  if (filterOption) {
    return selectedFilterOptions.map((filter) => {
      if (filter.identifier === identifier) {
        return {
          identifier: filter.identifier,
          options: options,
        }
      }
      return filter
    })
  } else {
    return [
      ...selectedFilterOptions,
      {
        identifier: identifier,
        options: options,
      },
    ]
  }
}

export { getIDsByIdentifier, getProcessedFilterOptions }
