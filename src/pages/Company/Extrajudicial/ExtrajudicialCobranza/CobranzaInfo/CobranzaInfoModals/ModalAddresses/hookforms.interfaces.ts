import { DirectionType } from '@/types/extrajudicial/direction.type'

export type DirectionFormType = DirectionType & {
  directions: Array<DirectionType>
}
