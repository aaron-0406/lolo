export type ProductType = {
  id: number
  code: string
  state: string
  customerId: number
  clientId: number
  negotiationId: number
  customerHasBankId: number
  extProductNameId: number
  judicialCaseFileId?: number
}

export type ProductTypeName = ProductType & { clientName: string; funcionarioId: string; cityId: string }
