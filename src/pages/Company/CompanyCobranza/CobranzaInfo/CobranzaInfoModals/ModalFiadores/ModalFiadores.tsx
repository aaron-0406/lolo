import { FormProvider, useForm } from "react-hook-form";
import { GuarantorType } from "../../../../../../shared/types/guarantor.type";
import Container from "../../../../../../ui/Container";
import ModalFiadoresActions from "./ModalFiadoresActions";
import ModalFiadoresInfo from "./ModalFiadoresInfo";
import ModalFiadoresTable from "./ModalFiadoresTable";

type ModalFiadoresProps = {
  clientId: number;
};

const ModalFiadores = ({ clientId }: ModalFiadoresProps) => {
  const formMethods = useForm<GuarantorType>({
    mode: "all",
    defaultValues: {
      id: 0,
      name: "",
      clientId: clientId,
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Container
        display="flex"
        flexDirection="column"
        position="relative"
        overFlowY="auto"
        height="100%"
        width="100%"
        padding="20px"
        gap="20px"
      >
        <ModalFiadoresActions />

        <ModalFiadoresInfo />

        <ModalFiadoresTable />
      </Container>
    </FormProvider>
  );
};

export default ModalFiadores;
