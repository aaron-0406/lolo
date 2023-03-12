import React from "react";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import Container from "../../../../ui/Container";
import Text from "../../../../ui/Text";

const ProfileInfo = () => {
  const {
    customerUser: { user },
  } = useLoloContext();

  return (
    <Container width="100%" display="flex" flexDirection="column" height="100%">
      <Text.Body size="m" weight="regular">
        Nombre: {`${user.name} ${user.lastName}`}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        DNI: {user.dni}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        Correo Electrónico: {user.email}
      </Text.Body>
      <Text.Body size="m" weight="regular">
        Teléfono: {user.phone}
      </Text.Body>
    </Container>
  );
};

export default ProfileInfo;
