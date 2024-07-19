import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Text from '@/ui/Text'
import { useFiltersContext } from '../../../../../shared/contexts/FiltersProvider';
import { useLocation } from 'react-router-dom';
import { FilterOptionsProps } from '@/ui/Table/Table';
import { useEffect, useState } from 'react';
import Button from '@/ui/Button';

const UserLogsActions = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const {
    filterOptions: { getSelectedFilters, setSelectedFilters },
  } = useFiltersContext()
  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []
  const initialDateFilter = selectedFilterOptions.find((filter) => filter.identifier === 'user.logs.filter.initialDate')
  const finalDateFilter = selectedFilterOptions.find((filter) => filter.identifier === 'user.logs.filter.finalDate')
  const [date, setDates] = useState<{
    initialDate: string
    finalDate: string
  }>({
    initialDate: String(initialDateFilter?.options[0] ?? ""),
    finalDate: String(finalDateFilter?.options[0] ?? ""),
  })

  const initialDate: FilterOptionsProps = {
    identifier: 'user.logs.filter.initialDate',
    options: [],
  }
  const finalDate: FilterOptionsProps = {
    identifier: 'user.logs.filter.finalDate',
    options: [],
  }

  const clearFiltersDateFilter = () => {
    let newSelectedFilterOptions = selectedFilterOptions.map((filter) => {
      if (filter.identifier === 'user.logs.filter.initialDate' || filter.identifier === 'user.logs.filter.finalDate') {
        return { ...filter, options: [] };
      }
      return filter;
    });
  
    setSelectedFilters({
      url: currentPath,
      filters: newSelectedFilterOptions,
    });
  
    setDates({
      initialDate: '',
      finalDate: '',
    });
  };

  const onChangeFilterOption = (identifier: string, options: any[], dateState: string) => {
    let newSelectedFilterOptions = [...selectedFilterOptions];
    let newDate = { ...date };
  
    const filterIndex = newSelectedFilterOptions.findIndex((filter) => filter.identifier === identifier);
  
    if (filterIndex !== -1) {
      newSelectedFilterOptions[filterIndex] = { ...newSelectedFilterOptions[filterIndex], options: [options[0]] };
  
      if (identifier === 'user.logs.filter.initialDate') {
        newDate.initialDate = dateState;
      } else if (identifier === 'user.logs.filter.finalDate') {
        newDate.finalDate = dateState;
      }
    } else {
      const newFilter = identifier === 'user.logs.filter.initialDate' ? initialDate : finalDate;
      newSelectedFilterOptions.push(newFilter);
    }
  
    setSelectedFilters({ url: currentPath, filters: newSelectedFilterOptions });
    setDates(newDate);
  };

  useEffect(() => {
    if (!initialDateFilter || !finalDateFilter) {
      setSelectedFilters({
        url: currentPath,
        filters: [...selectedFilterOptions, initialDate, finalDate],
      })
    }
    setDates({
      initialDate: String(initialDateFilter?.options[0] ?? ""),
      finalDate: String(finalDateFilter?.options[0] ?? ""),
    })
  },[])

  return (
    <Container
      width="100%"
      display="flex"
      padding="10px 20px 0px 20px"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
    >
      <Text.Body size="m" weight="bold">
        AUDITORÍA
      </Text.Body>
      <Container display="flex" flexDirection="row" alignItems="center" gap="10px" width="50%" height="fit-content">
        <DatePicker
          value={date.initialDate ?? ""}
          label="Fecha de inicio"
          dateFormat="YYYY-MM-DD"
          getDate={(date) => onChangeFilterOption('user.logs.filter.initialDate', [date], date)}
        />
        <DatePicker
          value={date.finalDate ?? ""}
          label="Fecha de fin"
          dateFormat="YYYY-MM-DD"
          getDate={(date) => onChangeFilterOption('user.logs.filter.finalDate', [date], date)}
        />
        {
          date.initialDate || date.finalDate ? (
            <Button 
            onClick={clearFiltersDateFilter}
            shape='round'
            trailingIcon='ri-filter-off-line'
          />
          ) : null
        }
      </Container>
    </Container>
  )
}

export default UserLogsActions
