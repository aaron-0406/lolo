import { DirectionType } from '../../../../../../shared/types/extrajudicial/direction.type'

export type DirectionFormType = DirectionType & {
  directions: Array<DirectionType>
}
