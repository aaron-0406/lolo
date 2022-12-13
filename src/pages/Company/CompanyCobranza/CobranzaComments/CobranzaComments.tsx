import { useState } from "react";
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import Select from "../../../../ui/Select";
import { SelectItem } from "../../../../ui/Select/interfaces";

const CobranzaComments = () => {
  const optionsDays: SelectItem<string, Record<string, unknown>>[] = Array.from(
    Array(31).keys()
  ).map((xd) => {
    const key = `${xd + 1}`;
    return { key, label: key };
  });

  const optionsMonths: SelectItem<string, Record<string, unknown>>[] =
    Array.from(Array(12).keys()).map((xd) => {
      const key = `${xd + 1}`;
      return { key, label: key };
    });

  const currentYear = new Date().getFullYear();

  const optionsYears: SelectItem<string, Record<string, unknown>>[] = [
    { key: `${currentYear}`, label: `${currentYear}` },
  ];

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onChangeDay = (key: string) => {
    setDay(key);
  };

  const onChangeMonth = (key: string) => {
    setMonth(key);
  };

  const onChangeYear = (key: string) => {
    setYear(key);
  };

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="20px">
      <Container width="100%" display="flex" gap="5px">
        <Select
          label="Día"
          width="100%"
          value={day}
          options={optionsDays}
          onChange={onChangeDay}
        />

        <Select
          label="Mes"
          width="100%"
          value={month}
          options={optionsMonths}
          onChange={onChangeMonth}
        />

        <Select
          label="Año"
          width="100%"
          value={year}
          options={optionsYears}
          onChange={onChangeYear}
        />
      </Container>

      <Container
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overFlowX="auto"
        gap="20px"
      >
        <Button width="100px" shape="round" trailingIcon="ri-add-fill" />
        <Button width="100px" shape="round" trailingIcon="ri-edit-2-line" />
        <Button
          width="100px"
          shape="round"
          display="danger"
          trailingIcon="ri-close-line"
        />
        <Button
          width="100px"
          shape="round"
          display="warning"
          trailingIcon="ri-delete-bin-line"
        />
      </Container>

      <Container width="100%">
        <TextAreaField width="100%" rows={4} />
      </Container>

      <Container>
        
      </Container>
    </Container>
  );
};

export default CobranzaComments;
