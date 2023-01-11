/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import DatePicker from "../../../../ui/DatePicker/DatePicker";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import moment from "moment";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { CommentType } from "../../../../shared/types/comment.type";
import { CompanyCobranzaCommentResolver } from "../CompanyCobranza.yup";
import { ClientType } from "../../../../shared/types/client.type";
import Select from "../../../../ui/Select";
import { SelectItemType } from "../../../../ui/Select/interfaces";
import notification from "../../../../ui/notification";
import { useQuery } from "react-query";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../../../../shared/services/comment.service";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import styled, { css } from "styled-components";

const CobranzaComments = () => {
  const { getValues: getValuesClient } = useFormContext<ClientType>();
  const [comments, setComments] = useState<CommentType[]>([]);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentType>({
    resolver: CompanyCobranzaCommentResolver,
    defaultValues: {
      comment: "",
      date: moment(new Date()).format("DD-MM-YYYY"),
      clientId: getValuesClient().id,
      customerUserId: getValuesClient().customerUserId,
      negotiation: "",
    },
  });

  // CREATE COMMENT
  const { refetch } = useQuery(
    "query-post-comment",
    async () => {
      return await createComment(getValues());
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: "success", message: "Comentario creado" });
        reset();
        delete data.hour;
        setComments([data, ...comments]);
      },
      onError: (error: any) => {
        notification({
          type: "info",
          message: error.response.data.message,
        });
        reset();
      },
    }
  );

  const { refetch: refetchPut } = useQuery(
    "query-patch-comment",
    async () => {
      return await editComment(getValues());
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: "success", message: "Comentario editado" });
        reset();
        delete data.hour;
        setComments(
          comments.map((item) => {
            if (item.id === data.id) return data;
            return item;
          })
        );
      },
      onError: (error: any) => {
        notification({
          type: "info",
          message: error.response.data.message,
        });

        reset();
      },
    }
  );

  const { refetch: refetchDelete } = useQuery(
    "query-delete-comment",
    async () => {
      return await deleteComment(getValues().id);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: "success", message: "Comentario Eliminado" });
        reset();
        delete data.hour;
        setComments(comments.filter((item) => item.id !== Number(data.id)));
      },
      onError: (error: any) => {
        notification({
          type: "info",
          message: error.response.data.message,
        });

        reset();
      },
    }
  );

  // GET COMMENT
  const { refetch: refetchGet } = useQuery(
    "query-get-comments",
    async () => {
      return await getComments(getValuesClient().id);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setComments(data);
      },
      onError: (error: any) => {
        setComments([]);
      },
    }
  );

  // GETTING COMMENT FROM CHILD TO FATHER COMPONENT
  const getComment = (comment: CommentType) => {
    const dia = comment.date.split("-");
    const fecha = `${dia[2]}-${dia[1]}-${dia[0]}`;
    setValue("id", comment.id);
    setValue("clientId", comment.clientId);
    setValue("date", fecha);
    setValue("comment", comment.comment);
    setValue("customerUserId", comment.customerUserId);
    setValue("negotiation", comment.negotiation);
  };

  const onAddComment = () => {
    handleSubmit((data) => {
      refetch();
    })();
  };

  const onEditComment = () => {
    handleSubmit((data) => {
      refetchPut();
    })();
  };
  const onDeleteComment = () => {
    handleSubmit((data) => {
      refetchDelete();
    })();
  };

  const optionsStates: Array<SelectItemType> = [
    { key: "CORREO", label: "CORREO" },
  ];

  const onClean = () => {
    reset();
  };

  useEffect(() => {
    if (!!getValuesClient().id) {
      refetchGet();
    }
    return () => {
      setComments([]);
    };
  }, [getValuesClient().id]);

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="20px">
      <Container width="100%" display="flex" gap="5px">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              required
              label="Fecha"
              selectedDate={field.value}
              placeholder="Ingrese la fecha"
              dateFormat="DD-MM-YYYY"
              value={field.value}
              getDate={(e) => {
                setValue("date", e);
              }}
            />
          )}
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
        <Button
          disabled={!getValuesClient("id")}
          onClick={onAddComment}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
        />
        <Button
          disabled={!getValuesClient("id")}
          onClick={onEditComment}
          width="100px"
          shape="round"
          trailingIcon="ri-edit-2-line"
        />
        <Button
          disabled={!getValuesClient("id")}
          onClick={onDeleteComment}
          width="100px"
          shape="round"
          display="danger"
          trailingIcon="ri-close-line"
        />
        <Button
          width="100px"
          shape="round"
          display="warning"
          trailingIcon="ri-brush-2-line"
          onClick={onClean}
        />
      </Container>

      <Container width="100%">
        <Controller
          name="negotiation"
          control={control}
          render={({ field }) => (
            <Select
              disabled={!getValuesClient("id")}
              width="100%"
              value={field.value}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key);
              }}
              hasError={!!errors.negotiation}
            />
          )}
        />
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextAreaField
              disabled={!getValuesClient("id")}
              width="100%"
              rows={4}
              value={field.value}
              hasError={!!errors.comment}
              onChange={(e) => {
                setValue("comment", e.target.value);
                setValue("clientId", getValuesClient().id);
                setValue("customerUserId", getValuesClient().customerUserId);
              }}
            />
          )}
        />
      </Container>

      <StyledContainerCommentsList
        backgroundColor="#fff"
        overFlowY="auto"
        display="flex"
        flexDirection="column"
        height="20rem"
      >
        {comments.map((item) => {
          return (
            <CommentItem
              selected={watch().id === item.id}
              getComment={getComment}
              comment={item}
              key={`${item.id}comment`}
            />
          );
        })}
      </StyledContainerCommentsList>
    </Container>
  );
};

export default CobranzaComments;

const StyledContainerCommentsList = styled(Container)`
  border-radius: 10px;
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.Neutral5};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.Neutral4};
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
    `}
`;
