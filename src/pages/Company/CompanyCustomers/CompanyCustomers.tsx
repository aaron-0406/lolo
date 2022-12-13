import styled, { css } from "styled-components";
import Container from "../../../ui/Container";

const CompanyCustomers = () => {
  const actualYear = new Date().getFullYear();
  const locale = "es";

  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });
  const months = [...Array.from(Array(12).keys())];

  const intlForWeeks = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const weekDays = [...Array.from(Array(7).keys())].map((dayIndex) =>
    intlForWeeks.format(new Date(2021, 2, dayIndex + 1))
  );

  const calendar = months.map((monthIndex) => {
    const monthName = intlForMonths.format(new Date(actualYear, monthIndex));
    const nextMonthIndex = (monthIndex + 1) % 12;
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();
    const startsOn = new Date(actualYear, monthIndex, 1).getDay();

    return {
      daysOfMonth,
      monthName,
      startsOn,
    };
  });

  return (
    <StyledContainer width="300px">
      {calendar.map(({ daysOfMonth, monthName, startsOn }) => {
        const days = [...Array.from(Array(daysOfMonth).keys())];
        const htmlDaysName = weekDays.map((dayName) => {
          return <li className="day-name">{dayName}</li>;
        });

        const htmlDays = days.map((day, index) => {
          return (
            <StyledLi
              className={`${index === 0 && "first-day"}`}
              startsOn={startsOn}
            >
              {day + 1}
            </StyledLi>
          );
        });

        return (
          <>
            <h2>
              {monthName} {actualYear}
            </h2>
            <ol>
              {htmlDaysName}
              {htmlDays}
            </ol>
          </>
        );
      })}
    </StyledContainer>
  );
};

export default CompanyCustomers;

const StyledLi = styled.li<{ startsOn: number }>`
  /* "--first-day-start":startson ; */
  ${({ startsOn }) => css`
    --first-day-start: ${startsOn};
  `}
`;

const StyledContainer = styled(Container)`
  div {
    text-align: center;
    width: 300px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ol {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 1.5ch;
  }

  h2 {
    margin-bottom: 4px;
    padding: 0;
  }

  .first-day {
    grid-column-start: var(--first-day-start, 0);
  }

  .day-name {
    background: #eee;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 2px;
    padding: 4px;
    text-align: center;
  }
`;
