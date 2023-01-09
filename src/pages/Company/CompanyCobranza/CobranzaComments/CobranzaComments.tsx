import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import DatePicker from "../../../../ui/DatePicker/DatePicker";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { CommentType } from "../../../../shared/types/comment.type";

const CobranzaComments = () => {
  const { control, setValue, getValues } = useForm<CommentType>({
    defaultValues: {
      id: 0,
      comment: "",
      date: moment(new Date()).format("DD/MM/YYYY"),
      clientId: 0,
      customerUserId: 0,
      negotiation: "",
    },
  });

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="20px">
      <Container width="100%" display="flex" gap="5px">
        <DatePicker
          required
          placeholder="Ingrese la fecha"
          dateFormat="DD-MM-YYYY"
          value={getValues().date}
          getDate={(e) => {
            console.log(getValues());
            setValue("date", e);
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
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={4}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Container>

      <Container></Container>
    </Container>
  );
};

export default CobranzaComments;
