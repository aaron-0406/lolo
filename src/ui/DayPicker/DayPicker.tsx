import styled from 'styled-components';
import { css } from 'styled-components';
import Container from '@/ui/Container';
import InputLabel from '@/ui/Label';
import Text from '@/ui/Text';
import { useEffect, useState } from 'react';

type Props = {
  onChange: (value: string[]) => void; 
  isLoading?: boolean; 
  label?: string; 
  value?: string[];
}

const DayPicker = ({ isLoading, onChange, label = '', value = []}: Props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(value as string[] ?? []);

  useEffect(() => {
    setSelectedDays(value as string[]);
  }, [value]);


  const handleDayClick = (day: string) => {
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      newSelectedDays = selectedDays.filter(d => d !== day);
    } else {
      newSelectedDays = [...selectedDays, day];
    }
    setSelectedDays(newSelectedDays);
    onChange(newSelectedDays); 
  };

  return (
    <StyledContainer>
      {label.length ? <InputLabel label={label} /> : null}
      <Container className="day__picker-container">
        <Container
          className={`day__picker${selectedDays.includes('Monday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Monday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>L</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Tuesday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Tuesday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>M</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Wednesday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Wednesday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>M</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Thursday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Thursday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>J</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Friday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Friday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>V</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Saturday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Saturday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>S</Text.Body>
        </Container>
        <Container
          className={`day__picker${selectedDays.includes('Sunday') ? '--selected' : ''}`}
          onClick={() => handleDayClick('Sunday')}
        >
          <Text.Body size="s" weight="regular" className='day__picker-text'>D</Text.Body>
        </Container>
      </Container>
    </StyledContainer>
  );
};

export default DayPicker;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .day__picker-container {
      display: flex;
      flex-direction: row;
      gap: 10px;
      .day__picker {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: ${theme.colors.Neutral4};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        :hover {
          cursor: pointer;
          background-color: ${theme.colors.Neutral5};
        }
      }
      .day__picker--selected {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: ${theme.colors.Primary4};
        color: ${theme.colors.Neutral0};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        :hover {
          cursor: pointer;
          background-color: ${theme.colors.Neutral5};
        }
        & .day__picker-text {
          color: ${theme.colors.Neutral0};
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      }
    }
  `}
`;
