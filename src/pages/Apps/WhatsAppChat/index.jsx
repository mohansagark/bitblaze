import React from "react";
import Container from "../../../components/common/Container";
import Input from "../../../components/common/Input";

const WhatsAppChat = () => {
  return (
    <Container center>
      <Input label="Number" type="number" maxLength={10} />
    </Container>
  );
};

export default WhatsAppChat;
