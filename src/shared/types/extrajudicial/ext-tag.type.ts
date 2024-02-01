import { ExtTagGroupType } from './ext-tag-group.type'

export type ExtTagType = {
  id: number
  name: string
  color: string
  tagGroupId: number
  customerHasBankId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  extTagGroup?: ExtTagGroupType
}
