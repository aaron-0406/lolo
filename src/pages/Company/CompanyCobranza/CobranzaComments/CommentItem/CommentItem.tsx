import React from "react";
import styled, { css } from "styled-components";
import { CommentType } from "../../../../../shared/types/comment.type";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Text";
import moment from "moment";
import { useLoloContext } from "../../../../../shared/contexts/LoloProvider";

type CommentItemProps = {
  comment: CommentType;
  selected: boolean;
  getComment: (comment: CommentType) => void;
};

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const {
    comment: { comment: commentText, date, negotiation, customerUserId },
    getComment,
    comment,
    selected,
  } = props;

  const {
    user: { getUser },
  } = useLoloContext();

  const user = getUser(customerUserId);

  const handleClickComment = () => {
    getComment(comment);
  };

  return (
    <StyledComment
      $selected={selected}
      padding="10px 15px"
      display="flex"
      gap="10px"
      flexDirection="column"
      onClick={handleClickComment}
    >
      <Container
        justifyContent="space-between"
        display="flex"
        flexDirection="row"
      >
        <Text.Body size="s" weight="bold">
          {"Asunto: "}
          <Text.Body ellipsis size="m" weight="regular" color="Primary5">
            {negotiation}
          </Text.Body>
        </Text.Body>
        <Container>
          <Text.Body size="m" weight="regular">
            Fecha: {moment(date).format("DD-MM-YYYY")}
          </Text.Body>
        </Container>
      </Container>
      <Container>
        <Text.Body ellipsis size="s" weight="bold">
          {"Gestor: "}
          <Text.Body ellipsis size="m" weight="bold" color="Primary5">
            {user ? user.name : "-"}
          </Text.Body>
        </Text.Body>
      </Container>
      <Container display="flex" alignItems="center">
        <Text.Body ellipsis size="m" weight="regular">
          {commentText}
        </Text.Body>
      </Container>
    </StyledComment>
  );
};

export default CommentItem;

const StyledComment = styled(Container)<{ $selected: boolean }>`
  :hover {
    background-color: #eff0f6ff;
  }

  cursor: pointer;
  ${({ theme, $selected }) =>
    css`
      border-bottom: 2px solid ${theme.colors.Neutral4};
      background-color: ${$selected ? "#eff0f6ff" : ""};
    `}
`;
