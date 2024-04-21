export type ProductType = {
  id: number
  code: string
  name: string
  state: string
  clientId: number
  customerId: number
  negotiationId: number
}

export type ProductTypeName = ProductType & { clientName: string; funcionarioId: string; cityId: string }
