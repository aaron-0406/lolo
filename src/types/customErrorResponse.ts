export type CustomErrorResponse = {
  statusCode: number
  message: string
  errors: Array<{ field: string; message: string }>
}
