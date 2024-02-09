export type FileType = {
  id: number
  name: string
  originalName: string
  createdAt: Date
  clientId: number
  tagId: number
  classificationTag?: { name: string; color: string }
}
