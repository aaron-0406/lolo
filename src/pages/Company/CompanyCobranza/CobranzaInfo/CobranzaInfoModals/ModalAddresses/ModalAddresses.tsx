import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Container from "../../../../../../ui/Container";
import { DirectionFormType } from "./hookforms.interfaces";
import { ModalAddressesResolver } from "./ModalAddresses.yup";
import ModalAddressesActions from "./ModalAddressesActions";
import ModalAddressesInfo from "./ModalAddressesInfo";
import ModalAddressesTable from "./ModalAdressesTable";

type ModalAddressesProps = {
  clientId: number;
};
const ModalAddresses: React.FC<ModalAddressesProps> = ({ clientId }) => {
  const formMethods = useForm<DirectionFormType>({
    resolver: ModalAddressesResolver,
    mode: "all",
    defaultValues: {
      id: 0,
      direction: "",
      clientId: clientId,
      type:"",
      directions: [],
    },
  });
  return (
    <FormProvider {...formMethods}>
      <Container width="100%">
        <Container
          width="100%"
          padding="20px"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <ModalAddressesActions />

          <ModalAddressesInfo />

          <ModalAddressesTable />
        </Container>
      </Container>
    </FormProvider>
  );
};

export default ModalAddresses;
