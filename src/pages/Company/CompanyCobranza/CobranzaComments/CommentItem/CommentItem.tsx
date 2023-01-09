import React from "react";
import styled from "styled-components";
import { CommentType } from "../../../../../shared/types/comment.type";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Text";
import moment from "moment";

type CommentItemProps = {
  comment: CommentType;
  getComment: (comment: CommentType) => void;
};

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const {
    comment: { comment: commentText, date, negotiation },
    getComment,
    comment,
  } = props;

  const handleClickComment = () => {
    getComment(comment);
  };

  return (
    <StyledComment
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
          Asunto: {negotiation}
        </Text.Body>
        <Container>
          <Text.Body size="m" weight="regular">
            Fecha: {moment(date).format("DD-MM-YYYY")}
          </Text.Body>
        </Container>
      </Container>
      <Container>
        <Text.Body size="m" weight="regular">
          {commentText}
        </Text.Body>
      </Container>
    </StyledComment>
  );
};

export default CommentItem;

const StyledComment = styled(Container)`
  :hover {
    background-color: #eff0f6ff;
  }
  cursor: pointer;
`;
