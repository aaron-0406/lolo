import Button from "../../../../../../../ui/Button";
import Container from "../../../../../../../ui/Container";

const ModalFiadoresActions = () => {
  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
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
  );
};

export default ModalFiadoresActions;
