/* eslint-disable react-hooks/exhaustive-deps */
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import DatePicker from '../../../../../ui/DatePicker/DatePicker'
import TextAreaField from '../../../../../ui/fields/TextAreaField'
import moment from 'moment'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { CommentType } from '../../../../../shared/types/extrajudicial/comment.type'
import { ExtrajudicialCobranzaCommentResolver } from '../ExtrajudicialCobranza.yup'
import { ClientType } from '../../../../../shared/types/extrajudicial/client.type'
import Select from '../../../../../ui/Select'
import { SelectItemType } from '../../../../../ui/Select/interfaces'
import notification from '../../../../../ui/notification'
import { useQuery } from 'react-query'
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from '../../../../../shared/services/extrajudicial/comment.service'
import { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import styled, { css } from 'styled-components'
import { CustomerUserType } from '../../../../../shared/types/dash/customer-user.type'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'

type Comment = CommentType & { customerUser: CustomerUserType }

const CobranzaComments = () => {
  const { getValues: getValuesClient } = useFormContext<ClientType>()
  const [comments, setComments] = useState<Comment[]>([])

  const {
    customerUser: { user },//gestor
    managementAction: { managementActions },
  } = useLoloContext()

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentType>({
    resolver: ExtrajudicialCobranzaCommentResolver,
    defaultValues: {
      comment: '',
      date: moment(new Date()).format('DD-MM-YYYY'),
      clientId: getValuesClient().id,
      customerUserId: user.id,
      negotiation: '',
    },
  })

  // CREATE COMMENT
  const { refetch } = useQuery(
    'query-post-comment',
    async () => {
      return await createComment(watch())
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: 'success', message: 'Comentario creado' })
        reset()
        delete data.hour
        setComments([data, ...comments])
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
        reset()
      },
    }
  )

  const { refetch: refetchPut } = useQuery(
    'query-patch-comment',
    async () => {
      return await editComment(getValues())
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: 'success', message: 'Comentario editado' })
        reset()
        delete data.hour
        setComments(
          comments.map((item) => {
            if (item.id === data.id) return data
            return item
          })
        )
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
      },
    }
  )

  const { refetch: refetchDelete } = useQuery(
    'query-delete-comment',
    async () => {
      return await deleteComment(getValues().id)
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notification({ type: 'success', message: 'Comentario Eliminado' })
        reset()
        delete data.hour
        setComments(comments.filter((item) => item.id !== Number(data.id)))
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
      },
    }
  )

  // GET COMMENT
  const { refetch: refetchGet } = useQuery(
    'query-get-comments',
    async () => {
      return await getComments(getValuesClient().id)
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setComments(data)
      },
      onError: (error: any) => {
        setComments([])
      },
    }
  )

  // GETTING COMMENT FROM CHILD TO FATHER COMPONENT
  const getComment = (comment: CommentType) => {
    const dia = comment.date.split('-')
    const fecha = `${dia[2]}-${dia[1]}-${dia[0]}`
    setValue('id', comment.id)
    setValue('clientId', comment.clientId)
    setValue('date', fecha)
    setValue('comment', comment.comment)
    setValue('customerUserId', comment.customerUserId)
    setValue('negotiation', comment.negotiation)
    setValue('managementActionId', comment.managementActionId)
  }

  const onAddComment = () => {
    setValue('customerUserId', user.id)
    handleSubmit((data) => {
      refetch()
    })()
  }

  const onEditComment = () => {
    setValue('customerUserId', user.id)
    handleSubmit((data) => {
      refetchPut()
    })()
  }
  const onDeleteComment = () => {
    setValue('customerUserId', user.id)
    handleSubmit((data) => {
      refetchDelete()
    })()
  }

  const optionsStates: Array<SelectItemType> = [
    { key: 'CORREO', label: 'CORREO' },
    { key: 'VISITA', label: 'VISITA' },
    { key: 'LLAMADA', label: 'LLAMADA' },
    { key: 'REUNIÓN OFICINA', label: 'REUNIÓN OFICINA' },
    { key: 'MENSAJE WHATSAPP', label: 'MENSAJE WHATSAPP' },
  ]

  const optionsActions: Array<SelectItemType> = managementActions.map((managementAction) => {
    return {
      key: String(managementAction.id),
      label: managementAction.nameAction,
    }
  })

  const onClean = () => {
    reset()
  }

  useEffect(() => {
    if (!!getValuesClient().id) {
      refetchGet()
    }
    return () => {
      onClean()
      setComments([])
    }
  }, [getValuesClient().id])

  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="20px"
      padding="20px"
      overFlowY="auto"
    >
      <Container width="100%" height="80px" display="flex" gap="5px">
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
                setValue('date', e)
              }}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
        <Button
          disabled={!getValuesClient('id') || !!watch('id')}
          onClick={onAddComment}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
        />
        <Button
          disabled={!getValuesClient('id') || watch('customerUserId') !== user.id || !watch('id')}
          onClick={onEditComment}
          width="100px"
          shape="round"
          trailingIcon="ri-edit-2-line"
        />
        <Button
          disabled={!getValuesClient('id') || !watch('id')}
          onClick={onDeleteComment}
          width="100px"
          shape="round"
          display="danger"
          trailingIcon="ri-close-line"
        />
        <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onClean} />
      </Container>

      <Container width="100%" display="flex" flexDirection="column" gap="5px">
        <Controller
          name="negotiation"
          control={control}
          render={({ field }) => (
            <Select
              disabled={!getValuesClient('id')}
              width="100%"
              value={field.value}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.negotiation}
            />
          )}
        />

        <Controller
          name="managementActionId"
          control={control}
          render={({ field }) => (
            <Select
              disabled={!getValuesClient('id')}
              width="100%"
              value={!!field.value ? String(field.value) : ''}
              options={optionsActions}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.managementActionId}
            />
          )}
        />

        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextAreaField
              disabled={!getValuesClient('id')}
              width="100%"
              rows={2}
              value={field.value}
              hasError={!!errors.comment}
              onChange={(e) => {
                setValue('comment', e.target.value)
                setValue('clientId', getValuesClient().id)
              }}
            />
          )}
        />
      </Container>

      <StyledContainerCommentsList
        width="100%"
        height="380px"
        backgroundColor="#fff"
        display="flex"
        flexDirection="column"
      >
        <Container width="100%" height="100%" overFlowY="auto">
          {comments.map((item) => {
            return (
              <CommentItem
                selected={watch().id === item.id}
                getComment={getComment}
                comment={item}
                key={`${item.id}comment`}
              />
            )
          })}
        </Container>
      </StyledContainerCommentsList>
    </Container>
  )
}

export default CobranzaComments

const StyledContainerCommentsList = styled(Container)`
  border-radius: 10px;
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
    `}
`
