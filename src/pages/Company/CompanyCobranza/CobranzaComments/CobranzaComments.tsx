import { useState } from "react";
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import DatePicker from "../../../../ui/DatePicker/DatePicker";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import moment from "moment";

const CobranzaComments = () => {
  const [valueDate, setValueDate] = useState<string>(
    moment(new Date()).format("DD/MM/YYYY")
  );

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="20px">
      <Container width="100%" display="flex" gap="5px">
        <DatePicker
          required
          placeholder="Ingrese la fecha"
          dateFormat="DD-MM-YYYY"
          value={valueDate}
          getDate={(e) => {
            setValueDate(e);
          }}
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

      <Container></Container>
    </Container>
  );
};

export default CobranzaComments;
