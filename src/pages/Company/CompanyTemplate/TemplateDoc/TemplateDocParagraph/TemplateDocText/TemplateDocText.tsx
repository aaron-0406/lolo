/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { TemplateFormType } from "../../../hookforms.interfaces";

const TemplateDocText: React.FC<{ $text: string }> = (props) => {
  const { $text = "" } = props;
  const { watch } = useFormContext<TemplateFormType>();
  const parrafo = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (parrafo.current) parrafo.current.innerHTML = $text;
    return () => {
      if (parrafo.current) parrafo.current.innerHTML = "";
    };
  }, [$text, watch("values")]);

  return <StyledText ref={parrafo}>{$text ? $text : ""}</StyledText>;
};

export default TemplateDocText;

const StyledText = styled.p`
  text-align: justify;
  text-justify: inter-word;
`;
